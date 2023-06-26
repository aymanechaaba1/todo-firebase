'use strict';

import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { addData, deleteData, getColRef, updateData } from './firebase.js';
import { inputEl } from './dom.js';

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

export const removeTodoHandler = async (e) => {
  try {
    const todoClickedEl = e.target.closest('.todo');
    const btnTrash = e.target.closest('.btn-trash');

    if (!todoClickedEl) return;

    const { id } = todoClickedEl.dataset;

    btnTrash && (await deleteData(id, 'todos'));
  } catch (err) {
    console.error(err.message);
  }
};

export const editTodoHandler = async (e) => {
  try {
    const todoClickedEl = e.target.closest('.todo');
    const btnEdit = e.target.closest('.btn-edit');

    if (!todoClickedEl) return;

    const { id } = todoClickedEl.dataset;

    if (btnEdit) {
      // Make the input editable
      const editTodoFormEl = e.target // Crazy DOM Traversing 😇
        .closest('.btns')
        .previousElementSibling.querySelector('.edit-todo-form');

      const todoInputEl = e.target // Crazy DOM Traversing 😇
        .closest('.btns')
        .previousElementSibling.querySelector('.todo-input');

      todoInputEl.removeAttribute('readonly');
      todoInputEl.focus();

      const update = async (e) => {
        e.preventDefault();

        try {
          await updateData({
            colName: 'todos',
            id,
            newData: { text: todoInputEl.value },
          });
        } catch (err) {
          throw err;
        }
      };

      editTodoFormEl.addEventListener('submit', update);
    }

    // Update todo
  } catch (err) {
    console.error(err.message);
  }
};
