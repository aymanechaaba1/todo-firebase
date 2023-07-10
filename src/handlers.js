'use strict';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import {
  serverTimestamp,
  onSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

import { auth, db } from './firebase.js';
import {
  btnShowFormEl,
  modalEl,
  modalOveryalEl,
  sidebarEl,
  todosContainerEl,
} from './dom.js';
import {
  clear,
  createToastNotification,
  hide,
  render,
  update,
} from './helpers.js';
import Todo from './components/Todo.js';
import AddTodoForm from './components/AddTodoForm.js';

export const signInHandler = async (e) => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (err) {
    console.error(err.message);
  }
};

export const logoutHandler = async (e) => {
  const btnLogout = e.target.closest('.btn-logout');
  if (!btnLogout) return;

  try {
    if (btnLogout) await signOut(auth);
  } catch (err) {
    console.error(err.message);
  }
};

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

      // current user
      const { currentUser } = auth;

      // Add it to firebase
      await addDoc(collection(db, 'users', currentUser.uid, 'todos'), {
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

export const removeTodoHandler = (e) => {
  const removeTodo = async () => {
    try {
      const { currentUser } = auth;

      // Remove it from db
      await deleteDoc(doc(db, 'users', currentUser.uid, 'todos', id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const todoClickedEl = e.target.closest('.todo');
  const btnTrash = e.target.closest('.btn-trash');

  if (!todoClickedEl) return;

  const { id } = todoClickedEl.dataset;

  btnTrash && removeTodo();
};

export const editTodoHandler = async (e) => {
  const editTodo = () => {
    // Make the input editable
    const editTodoFormEl = e.target // Crazy DOM Traversing 😇
      .closest('.btns')
      .previousElementSibling.querySelector('.edit-todo-form');

    const todoInputEl = e.target // Crazy DOM Traversing 😇
      .closest('.btns')
      .previousElementSibling.querySelector('.todo-input');

    todoInputEl.removeAttribute('readonly');
    todoInputEl.focus();

    todoInputEl.addEventListener('blur', (e) => {
      todoInputEl.setAttribute('readonly', 'true');
    });

    const update = async (e) => {
      e.preventDefault();

      try {
        const { currentUser } = auth;

        await updateDoc(doc(db, 'users', currentUser.uid, 'todos', id), {
          text: todoInputEl.value,
        });
        // show success notif
        createToastNotification({
          text: 'Todo updated successfully 😀',
        });
      } catch (err) {
        throw err;
      }
    };

    editTodoFormEl.addEventListener('submit', update);
  };

  const todoClickedEl = e.target.closest('.todo');
  const btnEdit = e.target.closest('.btn-edit');

  if (!todoClickedEl) return;

  const { id } = todoClickedEl.dataset;

  btnEdit && editTodo();
};

export const searchTodoHandler = async (e) => {
  try {
    // Get todos from firebase
    const { currentUser } = auth;
    const snapshot = await getDocs(
      collection(db, 'users', currentUser.uid, 'todos')
    );
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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

    const showMoreBtn = e.target.closest('.btn-show-more');

    const { id } = todoClicked.dataset;

    if (showMoreBtn) {
      onSnapshot(getDocRef('todos', id), (doc) => {
        const TodoInfoMarkup = TodoInfo({
          id: doc.id,
          ...doc.data(),
        });
        clear(sidebarEl);
        sidebarEl.classList.remove('hidden');
        render(TodoInfoMarkup, sidebarEl);
      });
    }
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

export const disableInputHandler = (e) => {
  const todoClicked = e.target.closest('.todo');

  if (!todoClicked) return;

  const inputEl = todoClicked.querySelector('.todo-input');

  console.log(inputEl);
};
