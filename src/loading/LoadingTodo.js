export default function LoadingTodo() {
  return `
    <div
      class="todo border border-b--500 basis-full py-2 px-4 rounded-lg space-y-3 animate-pulse"
    >
      <div class="flex items-center gap-5">
        <div class="flex-1 space-y-3">
          <div class="h-1 bg-gray-200 rounded-full w-10"></div>
          <p class="h-2 bg-gray-200 rounded-full w-40"></p>
        </div>
      </div>
      <div class="tags flex items-center gap-4 overflow-x-auto py-2">
        <small class="h-2 bg-gray-200 rounded-full w-14"></small>
        <small class="h-2 bg-gray-200 rounded-full w-14"></small>
        <small class="h-2 bg-gray-200 rounded-full w-14"></small>
      </div>
    </div>
  `;
}
