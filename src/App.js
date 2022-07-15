import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from '@aws-amplify/core';
import { withAuthenticator } from '@aws-amplify/ui-react';

const awsmobile = {
  "aws_project_region": "ap-northeast-1",
  "aws_cognito_identity_pool_id": "ap-northeast-1:222b7092-d42a-4883-a1f8-f126cb2d7bdd",
  "aws_cognito_region": "ap-northeast-1",
  "aws_user_pools_id": "ap-northeast-1_hWtRDE8G7",
  "aws_user_pools_web_client_id": "2m5ni4i9geb088uqqrkjjhpom4",
  "oauth": {},
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};

Amplify.configure(awsmobile);

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
