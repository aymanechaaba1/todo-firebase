import { getDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getDocRef } from '../firebase.js';
import { formatDate } from '../helpers.js';

async function TodoInfo({ id }) {
  try {
    const doc = await getDoc(getDocRef('todos', id));

    const { dueTo, text, timestamp, status, tags } = doc?.data();

    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="btn-close-sidebar w-7 h-7 cursor-pointer text-red-500 float-right m-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
  
      <h1 class="text-5xl my-3">${text}</h1>
      <div
        class="grid grid-cols-2 gap-y-3 gap-x-10 items-center justify-center mt-6"
      >
        <div
          class="uppercase text-xs font-bold bg-gray-50 border border-gray-100 py-2 px-4 rounded-md"
        >
          Due To
        </div>
        <div class="text-xs py-2 px-4 text-center align-middle rounded-md">
          ${dueTo}
        </div>
        <div
          class="uppercase text-xs font-bold bg-gray-50 border border-gray-100 py-2 px-4 rounded-md"
        >
          Status
        </div>
        <div
          class="text-xs py-2 px-4 text-center align-middle rounded-md bg-orange-500 border border-orange-600 text-white"
        >
          ${status}
        </div>
        <div
          class="uppercase text-xs font-bold bg-gray-50 border border-gray-100 py-2 px-4 rounded-md"
        >
          Tags
        </div>
        <div class="space-x-1">
        ${tags
          .map(
            (tag) => `
              <small class="text-blue-600 cursor-pointer">${tag}</small>
            `
          )
          .join('')}
        </div>
        <div
          class="uppercase text-xs font-bold bg-gray-50 border border-gray-100 py-2 px-4 rounded-md"
        >
          Created At
        </div>
        <div class="text-xs text-center">${formatDate(timestamp.toDate())}</div>
      </div>
  `;
  } catch (err) {
    throw err;
  }
}

export default TodoInfo;
