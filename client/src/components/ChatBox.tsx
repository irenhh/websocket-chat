import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import queryString from 'query-string';
import { RouteProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { API_ENDPOINT, ROOM_NAME } from '../constants/constants';
import { User, Message } from '../types/types';
import { MessageBox } from './MessageBox';
import { UsersList } from './UsersList';

let socket: SocketIOClient.Socket;

export const ChatBox = ({ location }: RouteProps) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const history = useHistory();

  useEffect(() => {
    const searchParams = location && queryString.parse(location.search);

    socket = socketIOClient(API_ENDPOINT);

    socket.emit('join', {
      name: searchParams?.name,
      room: ROOM_NAME,
    }, (error: string) => {
      if (error) {
        alert(error);
        history.replace('/');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [API_ENDPOINT]);

  useEffect(() => {
    socket.on('new_message', (msg: Message) => {
      setMessageList((messages: Message[]) => [...messages, msg]);
    });

    socket.on('new_join', ({ users }: { users: User[] }) => {
      setUsersList(users);
    });

    socket.on('new_leave', ({ users }: { users: User[] }) => {
      setUsersList(users);
    });
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      socket.emit('message', message, () => setMessage(''));
    }
  };

  return (
    <>
      <form className="form" onSubmit={sendMessage}>
        <input
          type="text"
          className="form-input"
          placeholder="Type a message..."
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button className="form-button" type="submit">Send</button>
      </form>

      <div className="body-container">
        <MessageBox messageList={messageList} />

        <UsersList usersList={usersList} />
      </div>
    </>
  );
};
