import React, { FC } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import cn from 'classnames';
import { Message } from '../types/types';

type Props = {
  messageList: Message[];
}

export const MessageBox: FC<Props> = ({
  messageList,
}) => {
  const location = useLocation();
  const { name } = queryString.parse(location.search);

  return (
    <ul className="message-box">
      {messageList.map((msg, i) => (
        <li
          key={msg.id}
          className={cn('message-item', {
            'local-message': name === msg.user,
          })}
        >
          {`${msg.user}: ${msg.text}`}
        </li>
      ))}
    </ul>
  );
};
