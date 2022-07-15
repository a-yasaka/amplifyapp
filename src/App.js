import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

import './App.css';
import '@aws-amplify/ui-react/styles.css';

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
  ],
  "aws_appsync_graphqlEndpoint": "https://jr5t6eey3vg2hl55uy3ta22jpa.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-wipdyogqcjh2zoiw3jxf7pfzlu"
};

Amplify.configure(awsmobile);


const initialFormState = { name: '', description: '' }

function App({signOut,user}) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
      <button onClick={signOut}>Sign Out</button>
      <h2>{user.username}</h2>
    </div>
  );
}

export default withAuthenticator(App);