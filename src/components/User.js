export default function User({ uid, displayName, email, photoURL }) {
  return `
    <div class="user flex items-center gap-4" data-uid=${uid}>
      <div class="flex-1">
        <h1 class="text-2xl">Welcome, ${displayName}!</h1>
        <p class="text-xs">${email}</p>
      </div>
      <div class="flex items-center gap-4">
        <button class="btn-logout bg-red-500 py-2 px-5 rounded-lg text-white text-center">Logout</button>
        <img src="${photoURL}" class="rounded-full w-20 h-20 object-cover" alt="">
      </div>
    </div>
  `;
}
