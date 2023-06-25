'use strict';

export const render = (markup, parent, pos = 'afterbegin') => {
  parent.insertAdjacentHTML(pos, markup);
};

export const clear = (parent) => {
  parent.innerHTML = '';
};

export const formatDate = (timestamp) =>
  new Intl.DateTimeFormat(navigator.location, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

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
