let toastEl = null;
let timer = null;

export const initToast = () => {
  toastEl = document.querySelector("[data-toast]");
};

export const toast = (msg) => {
  if (!toastEl) return;

  toastEl.textContent = msg;
  toastEl.classList.add("toast--show");

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    toastEl.classList.remove("toast--show");
  }, 2200);
};