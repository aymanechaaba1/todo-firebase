import { formatDate } from '../helpers.js';

const Todo = function ({ id, text, timestamp }) {
  const date = formatDate(timestamp);

  return `
    <div class="todo border w-full py-2 px-4 rounded-md" data-id="${id}">
      <div class="timestamp text-sm text-gray-400">${date}</div>
      <div>
        <p class="text-2xl">${text}</p>
      </div>
    </div>
  `;
};

export default Todo;
