import { toast } from "./toast.js";

export const initContactPage = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    toast("Mensaje enviado ✓");
    form.reset();
  });

  const newsletter = document.querySelector("[data-newsletter-form]");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Te has suscrito ✓");
      newsletter.reset();
    });
  }
};