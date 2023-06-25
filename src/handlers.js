'use strict';

import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { addData, getColRef } from './firebase.js';
import { inputEl, sendIconTodoEl } from './dom.js';

const todosRef = getColRef('todos');

export const addTodo = async (e) => {
  e.preventDefault();

  try {
    if (!inputEl.value) return;

    await addData(todosRef, {
      text: inputEl.value,
      timestamp: serverTimestamp(),
    });

    inputEl.value = '';
  } catch (err) {
    console.error(err.message);
  }
};
