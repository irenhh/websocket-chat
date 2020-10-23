const users: UserType[] = [];

type UserType = {
  id: string;
  name: string;
  room: string;
}

const addUser = (
  { id, name, room }: UserType
): { error?: string; user?: Partial<UserType> } => {
  const username = name.trim().toLowerCase();

  const existingUser = users.find((usr) => (
    usr.room === room && usr.name === username
  ));

  if (!username) {
    return { error: 'Username is required.' };
  }

  if (existingUser) {
    return { error: 'Username is taken.' };
  }

  const user = { id, name: username, room };

  users.push(user);

  return { user };
};

const removeUser = (id: string): UserType | null => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return null;
};

const getUser = (id: string): UserType | undefined => (
  users.find((user) => user.id === id
));

const getUsersInRoom = (): UserType[] => users;

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
