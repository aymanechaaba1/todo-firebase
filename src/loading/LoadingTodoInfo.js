export default function LoadingTodoInfo() {
  return `
    <div class="animate-pulse">
      <span data-id="" class="opacity-5 z-0"></span>
      <h1 class="h-5 bg-gray-200 rounded-full w-48"></h1>
      <div
        class="grid grid-cols-[150px_250px] gap-y-3 gap-x-10 items-center mt-6"
      >
        <div
          class="h-3 bg-gray-200 rounded-full w-14"
        ></div>
        <div class="h-3 bg-gray-200 rounded-full  w-14"></div>
        <div
          class="h-3 bg-gray-200 rounded-full w-14"
        ></div>
        <div
          class="h-3 bg-gray-200 rounded-full w-14"
        ></div>
        <div
          class="h-3 bg-gray-200 rounded-full w-14"
        ></div>
        <div class="space-x-2">
            <small class="h-3 bg-gray-200 rounded-full w-5"></small>
            <small class="h-3 bg-gray-200 rounded-full w-5"></small>
            <small class="h-3 bg-gray-200 rounded-full w-5"></small>
        </div>
        <div
          class="h-3 bg-gray-200 rounded-full w-14"
        ></div>
        <div class="h-3 bg-gray-200 rounded-full w-14"></div>
      </div>
    </div>
  `;
}
