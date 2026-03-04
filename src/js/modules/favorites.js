const KEY = "atletismoshop_favs_v1";

export const readFavs = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeFavs = (ids) => {
  localStorage.setItem(KEY, JSON.stringify(ids));
};

export const isFav = (id) => readFavs().includes(id);

export const toggleFav = (id) => {
  const favs = readFavs();
  const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
  writeFavs(next);
  return next.includes(id);
};

export const favCount = () => readFavs().length;

export const hydrateFavUI = () => {
  const nodes = document.querySelectorAll("[data-fav-badge]");
  const count = favCount();
  nodes.forEach((n) => (n.textContent = String(count)));
};