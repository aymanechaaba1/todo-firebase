const AddTodoForm = () => {
  return `
    <form class="add-todo-form relative space-y-4 mx-auto max-w-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="btn-close-form w-7 h-7 float-right cursor-pointer hover:bg-gray-50 rounded-md"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <h1 class="text-3xl border-b border-gray-400/50 pb-4">Add a Todo</h1>
      <div
        class="flex flex-col md:items-center md:flex-row md:space-x-6 space-y-2"
      >
        <label for="text" class="font-bold md:w-20">Text</label>
        <input
          type="text"
          name="text"
          class="border rounded-md py-2 px-4 md:flex-1"
          placeholder="Workout"
        />
      </div>
      <div
        class="flex flex-col md:items-center md:flex-row md:space-x-6 space-y-2"
      >
        <label for="due_to" class="font-bold md:w-20">Due To</label>
        <input
          type="date"
          name="due_to"
          value="2023-06-27"
          min="2023-06-27"
          max=""
          class="due-to-input rounded-md border py-2 px-4"
        />
      </div>
      <div
        class="flex flex-col md:items-center md:flex-row md:space-x-6 space-y-2"
      >
        <label for="status" class="font-bold md:w-20">Status</label>
        <select
          name="status"
          id="status"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500 md:w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="tobedone">To Be Done</option>
          <option value="doing">Doing</option>
          <option value="done" hidden>Done</option>
        </select>
      </div>
      <div class="flex flex-col md:flex-row md:space-x-6 space-y-2">
        <label for="tags" class="font-bold md:w-20">Tags</label>
        <textarea
          name="tags"
          id="tags"
          cols="30"
          rows="10"
          class="tags-textarea flex-1 border py-2 px-4 border-gray-300 focus:border-gray-400 outline-none rounded-lg text-sm text-gray-900"
          placeholder="#workout #gym #glutes"
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn-add-todo uppercase bg-yellow-300 py-3 px-6 rounded-lg float-right mx-auto my-2 hover:bg-yellow-400"
      >
        Submit
      </button>
    </form>
  `;
};

export default AddTodoForm;
