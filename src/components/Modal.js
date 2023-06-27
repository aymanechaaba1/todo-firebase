'use strict';

const Modal = ({ children }) => {
  return `
    <div
      class="modal modal-overlay absolute top-0 left-0 w-full h-full bg-gray-200/30 blur"
    ></div>
    <div
      class="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-lg bg-white p-5 w-2/3"
    >
      ${children}
    </div>
  `;
};

export default Modal;
