// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAsvMxorm0HrwQlbgeI3A1dOzGJY3Z3TZ8",
  authDomain: "forum-a9414.firebaseapp.com",
  projectId: "forum-a9414",
  storageBucket: "forum-a9414.appspot.com",
  messagingSenderId: "1098053206306",
  appId: "1:1098053206306:web:bee994672fdf08e845657b"
};

// Initialize Firebase
export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}