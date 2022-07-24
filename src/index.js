import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

