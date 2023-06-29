'use strict';

import { onSnapshot } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getColRef, getQuery } from './firebase.js';
import Todo from './components/Todo.js';
import {
  addTodoFormEl,
  btnCloseFormEl,
  btnShowFormEl,
  modalEl,
  modalOveryalEl,
  searchInputEl,
  todosContainerEl,
} from './dom.js';
import { update } from './helpers.js';
import {
  showFormHandler,
  hideFormHandler,
  addTodoHandler,
  removeTodoHandler,
  editTodoHandler,
  searchTodoHandler,
} from './handlers.js';

const todosRef = getColRef('todos');
const query = getQuery(todosRef, 'timestamp');

onSnapshot(query, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
    timestamp: doc.data().timestamp?.toDate(),
    tags: doc.data().tags,
  }));

  console.log(data);

  update(data, todosContainerEl, Todo);
});

btnShowFormEl.addEventListener('click', showFormHandler);
modalEl.addEventListener('click', hideFormHandler);
todosContainerEl.addEventListener('click', removeTodoHandler);
todosContainerEl.addEventListener('click', editTodoHandler);
modalEl.addEventListener('submit', addTodoHandler);
searchInputEl.addEventListener('input', searchTodoHandler);

// TODO: format dates (yesterday, today, 2w ago, etc)
