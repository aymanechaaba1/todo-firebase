'use strict';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

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
const db = getFirestore(app);

export const getColRef = (colName) => collection(db, colName);

export const getQuery = (colRef, by, order = 'desc') =>
  query(colRef, orderBy(by, order));

export const addData = async function (ref, doc) {
  try {
    const docRef = await addDoc(ref, doc);
    return docRef;
  } catch (err) {
    throw err;
  }
};

export const deleteData = async (id, colName) => {
  try {
    await deleteDoc(doc(db, colName, id));
  } catch (err) {
    throw err;
  }
};
