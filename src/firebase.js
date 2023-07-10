'use strict';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDEQqIJqjChuRhgeIu5_VUL88QSc4cLSIk',
  authDomain: 'todo-app-2d5f4.firebaseapp.com',
  projectId: 'todo-app-2d5f4',
  storageBucket: 'todo-app-2d5f4.appspot.com',
  messagingSenderId: '930736960201',
  appId: '1:930736960201:web:7884be8b87a4deaee41318',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
