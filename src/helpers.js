'use strict';

export const render = (markup, parent, pos = 'afterbegin') => {
  parent.insertAdjacentHTML(pos, markup);
};

export const clear = (parent) => {
  parent.innerHTML = '';
};

export const formatDate = (date, options) =>
  new Intl.DateTimeFormat(navigator.location, options).format(date);

export const createToastNotification = ({ text }) => {
  Toastify({
    text,
    className: 'rounded-md shadow-md text-red-900 font-medium',
    style: {
      background: 'white',
    },
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
};

export const update = (data, parent, component) => {
  const Markup = data.map((entry) => component(entry)).join('');
  clear(parent);
  render(Markup, parent);
};

export const hide = (el) => {
  el.classList.add('hidden');
};

export const getTodayDate = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = `${today.getMonth() + 1}`.padStart(2, 0);
  const todayDay = today.getDate();
  return `${todayYear}-${todayMonth}-${todayDay}`;
};
