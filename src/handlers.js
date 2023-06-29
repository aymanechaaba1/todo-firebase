'use strict';

import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import {
  addData,
  deleteData,
  getColRef,
  getData,
  getQuery,
  updateData,
} from './firebase.js';
import {
  btnShowFormEl,
  modalEl,
  modalOveryalEl,
  todosContainerEl,
} from './dom.js';
import { clear, formatDate, render, update } from './helpers.js';
import Todo from './components/Todo.js';
import AddTodoForm from './components/AddTodoForm.js';

const todosRef = getColRef('todos');
const todosQuery = getQuery(todosRef, 'timestamp');

export const showFormHandler = (e) => {
  const Form = AddTodoForm();
  render(Form, modalEl);

  modalOveryalEl.classList.remove('hidden');
  modalEl.classList.remove('hidden');
};

export const hideFormHandler = (e) => {
  console.log(e);
  const btnClose = e.target.closest('.btn-close-form');
  if (!btnClose) return;

  if (btnClose) {
    modalOveryalEl.classList.add('hidden');
    modalEl.classList.add('hidden');
    btnShowFormEl.blur();
    clear(modalEl);
  }
};

export const addTodoHandler = async (e) => {
  e.preventDefault();

  const form = e.target.closest('.add-todo-form');
  if (!form) return;

  if (form) {
    try {
      // Get form data
      const shallowData = [...new FormData(e.target)];
      const data = Object.fromEntries(shallowData);

      const { text, due_to, status, tags: tagsStr } = data;

      const dueTo = formatDate(new Date(due_to), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const tags = tagsStr.split(' ');

      // Add it to firebase
      await addData(todosRef, {
        text,
        dueTo,
        status,
        tags,
        timestamp: serverTimestamp(),
      });

      // Reset form
      e.target.reset();

      // Close form
      hideFormHandler();
    } catch (err) {
      console.error(err.message);
    }
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

export const searchTodoHandler = async (e) => {
  try {
    // Get todos from firebase
    const todos = await getData(todosQuery);

    if (!e.target.value) {
      update(todos, todosContainerEl, Todo);
      return;
    }

    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );

    update(filteredTodos, todosContainerEl, Todo);
  } catch (err) {
    console.error(err.message);
  }
};
