const KEY = "atletismoshop_theme_v1"; // "dark" | "light" | "system"

const applyTheme = (value) => {
  // value: "dark" | "light" | "system"
  const html = document.documentElement;

  if (value === "system") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", value);
  }

  // Ajusta el icono/label
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  const current = getTheme();
  const label = current === "dark" ? "Oscuro" : current === "light" ? "Claro" : "Sistema";
  btn.setAttribute("aria-label", `Tema: ${label}. Cambiar tema`);
  btn.setAttribute("data-theme-state", current);
};

const getTheme = () => {
  const stored = localStorage.getItem(KEY);
  if (stored === "dark" || stored === "light" || stored === "system") return stored;
  return "system";
};

const cycleTheme = () => {
  const current = getTheme();
  const next = current === "system" ? "dark" : current === "dark" ? "light" : "system";
  localStorage.setItem(KEY, next);
  applyTheme(next);
};

export const initTheme = () => {
  // Aplica tema al cargar
  applyTheme(getTheme());

  // Botón toggle
  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    btn.addEventListener("click", () => cycleTheme());
  }

  // Si estás en "system", y cambia el sistema, se refleja
  const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mql) {
    mql.addEventListener?.("change", () => {
      if (getTheme() === "system") applyTheme("system");
    });
  }
};