'use strict';

export const render = (markup, parent, pos = 'afterbegin') => {
  parent.insertAdjacentHTML(pos, markup);
};

export const clear = (parent) => {
  parent.innerHTML = '';
};

// TODO: format dates (yesterday, today, 2w ago, etc)
export const formatDate = (timestamp, options) => {
  const date = new Date(timestamp);
  const today = new Date();

  const diff = Math.abs(today - date);

  const days = Math.trunc(diff / (24 * 60 * 60 * 1000));

  if (!days) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days >= 7 && days <= 35) {
    const weeks = Math.trunc(days / 7);
    return `${weeks} ago`;
  }

  return new Intl.DateTimeFormat(navigator.location, options).format(
    new Date(timestamp)
  );
};

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
  const todayDay = `${today.getDate()}`.padStart(2, 0);
  return `${todayYear}-${todayMonth}-${todayDay}`;
};
