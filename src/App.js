import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from '@aws-amplify/core';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App( { signOut } ) {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
      </header>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App);
