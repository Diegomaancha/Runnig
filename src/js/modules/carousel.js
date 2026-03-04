export const initCarousel = () => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const slides = Array.from(root.querySelectorAll("[data-carousel-slide]"));
  const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");

  let index = 0;
  let timer = null;

  const apply = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("carousel__dot--active", i === index));
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    apply();
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const start = () => {
    stop();
    timer = setInterval(next, 5200);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  nextBtn?.addEventListener("click", () => { next(); start(); });
  prevBtn?.addEventListener("click", () => { prev(); start(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { goTo(i); start(); }));

  root.addEventListener("pointerenter", stop);
  root.addEventListener("pointerleave", start);

  apply();
  start();
};