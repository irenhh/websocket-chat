export {};
const express = require('express');
const http = require('http');
const sio = require('socket.io');
const { v4 } = require('uuid');
const cors = require('cors');
const routes = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const app = express();
const server = http.createServer(app);

const io = sio(server);

const port = process.env.PORT || 4000;

app.use(cors());
app.use(routes);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.broadcast.to(user.room).emit('new_message', {
      id: v4(),
      user: 'admin',
      text: `${user.name} has joined!`,
    });

    io.to(user.room).emit('new_join', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('message', (message, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      return callback('Username is required');
    }

    io.to(user.room).emit('new_message', {
      id: v4(),
      user: user.name,
      text: message,
    });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('new_message', {
        id: v4(),
        user: 'admin',
        text: `${user.name} has left.`,
      });

      io.to(user.room).emit('new_leave', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
