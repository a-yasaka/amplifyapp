import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
