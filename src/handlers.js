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
  sidebarEl,
  todosContainerEl,
} from './dom.js';
import { clear, formatDate, hide, render, update } from './helpers.js';
import Todo from './components/Todo.js';
import AddTodoForm from './components/AddTodoForm.js';
import TodoInfo from './components/TodoInfo.js';

const todosRef = getColRef('todos');
const todosQuery = getQuery(todosRef, 'timestamp');

export const showFormHandler = (e) => {
  const Form = AddTodoForm();
  render(Form, modalEl);

  modalOveryalEl.classList.remove('hidden');
  modalEl.classList.remove('hidden');
};

export const hideFormHandler = (e) => {
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

      const { text, due_to: dueTo, status, tags: tagsStr } = data;

      if (!text || !dueTo || !status) return;

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

      // clear & close modal
      clear(modalEl);
      [modalEl, modalOveryalEl].forEach((el) => {
        hide(el);
      });
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

export const showTodoInfoHandler = async (e) => {
  try {
    const todoClicked = e.target.closest('.todo');
    if (!todoClicked) return;

    const { id } = todoClicked.dataset;

    const TodoInfoMarkup = await TodoInfo({ id });

    clear(sidebarEl);
    sidebarEl.classList.remove('hidden');
    render(TodoInfoMarkup, sidebarEl, 'beforeend');
  } catch (err) {
    console.error(err.message);
  }
};

export const closeSidebarHandler = (e) => {
  const btnCloseSidebar = e.target.closest('.btn-close-sidebar');

  if (!btnCloseSidebar) return;

  if (btnCloseSidebar) {
    clear(sidebarEl);
    sidebarEl.classList.add('hidden');
  }
};
