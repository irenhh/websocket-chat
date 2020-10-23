import React from 'react';
import { useHistory } from 'react-router-dom';
import { API_ENDPOINT } from '../constants/constants';

export const Login = () => {
  const history = useHistory();

  const getUserName = () => {
    fetch(`${API_ENDPOINT}/public/login`)
      .then((data) => data.json())
      .then((data) => {
        history.push(`/chat?name=${data.characterName}`);
      });
  };

  return (
    <div className="login-container">
      <button
        type="button"
        className="login-button"
        onClick={getUserName}
      >
        Get a username
      </button>
    </div>
  );
};
