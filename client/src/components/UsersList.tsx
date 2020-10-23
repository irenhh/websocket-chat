import React, { FC } from 'react';
import { User } from '../types/types';

type Props = {
  usersList: User[];
}

export const UsersList: FC<Props> = ({
  usersList,
}) => (
  <ul className="users-container">
    <b>Users in the chat:</b>
    {usersList.map(({ id, name }) => (
      <li key={id}>
        {name}
      </li>
    ))}
  </ul>
);
