'use strict';

import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import {
  onSnapshot,
  collection,
  query,
  setDoc,
  orderBy,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import { auth, db } from './firebase.js';
import Todo from './components/Todo.js';
import {
  app,
  btnShowFormEl,
  headerEl,
  loginPage,
  modalEl,
  searchInputEl,
  signInBtnEl,
  todosContainerEl,
} from './dom.js';
import { clear, load, render, update } from './helpers.js';
import {
  addTodoHandler,
  hideFormHandler,
  removeTodoHandler,
  showFormHandler,
  signInHandler,
  logoutHandler,
  editTodoHandler,
  searchTodoHandler,
} from './handlers.js';
import User from './components/User.js';
import LoadingTodo from './loading/LoadingTodo.js';

onAuthStateChanged(auth, (user) => {
  const showApp = () => {
    app.classList.remove('hidden');
    loginPage.classList.add('hidden');

    // render header & user info
    clear(headerEl);
    render(User(user), headerEl);
  };

  const hideApp = () => {
    app.classList.add('hidden');
    loginPage.classList.remove('hidden');
  };

  if (user) {
    showApp();

    // Add new user
    const addUser = async () => {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    addUser();

    // loading todos
    load(LoadingTodo, todosContainerEl);

    // render todos for the logged in user
    onSnapshot(
      query(
        collection(db, 'users', user.uid, 'todos'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        const todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        update(todos, todosContainerEl, Todo);
      }
    );
  }

  if (!user) {
    hideApp();
  }
});

signInBtnEl.addEventListener('click', signInHandler);
headerEl.addEventListener('click', logoutHandler);
btnShowFormEl.addEventListener('click', showFormHandler);
modalEl.addEventListener('click', hideFormHandler);
modalEl.addEventListener('submit', addTodoHandler);
todosContainerEl.addEventListener('click', removeTodoHandler);
todosContainerEl.addEventListener('click', editTodoHandler);
searchInputEl.addEventListener('input', searchTodoHandler);
// todosContainerEl.addEventListener('click', showTodoInfoHandler);
// sidebarEl.addEventListener('click', closeSidebarHandler);
