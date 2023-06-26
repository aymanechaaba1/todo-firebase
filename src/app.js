'use strict';

import { onSnapshot } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getColRef, getQuery } from './firebase.js';
import Todo from './components/Todo.js';
import { formEl, todosContainerEl } from './dom.js';
import { clear, render } from './helpers.js';
import { addTodo, removeTodoHandler, editTodoHandler } from './handlers.js';

const todosRef = getColRef('todos');
const query = getQuery(todosRef, 'timestamp');

onSnapshot(query, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
    timestamp: doc.data().timestamp?.toDate(),
  }));

  const Todos = data.map((todo) => Todo(todo)).join('');

  clear(todosContainerEl);
  render(Todos, todosContainerEl);
});

formEl.addEventListener('submit', addTodo);
todosContainerEl.addEventListener('click', removeTodoHandler);
todosContainerEl.addEventListener('click', editTodoHandler);
