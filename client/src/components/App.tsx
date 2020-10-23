import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from './Login';
import { ChatBox } from './ChatBox';

function App () {
  return (
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={ChatBox} />
    </div>
  );
}

export default App;
