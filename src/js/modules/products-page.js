import { products } from "../data/products.js";
import { addToCart, hydrateCartUI } from "./cart.js";
import { toggleFav, isFav, hydrateFavUI, readFavs } from "./favorites.js";
import { toast } from "./toast.js";

const formatEUR = (n) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export const initProductsPage = () => {
  const grid = document.querySelector("[data-products-grid]");
  if (!grid) return;

  const q = document.querySelector("[data-filter-q]");
  const cat = document.querySelector("[data-filter-cat]");
  const sort = document.querySelector("[data-filter-sort]");
  const onlyFavs = document.querySelector("[data-filter-favs]");
  const limit = Number(grid.getAttribute("data-limit") || "0");

  const render = (list) => {
    const finalList = limit > 0 ? list.slice(0, limit) : list;

    grid.innerHTML = finalList
      .map((p) => {
        const fav = isFav(p.id);
        return `
          <article class="product-card">
            <a class="product-card__media" href="./product.html?id=${encodeURIComponent(
              p.id
            )}" aria-label="Ver ${p.name}">
              <img class="product-card__img" src="${p.img}" alt="${p.name}">
            </a>

            <div class="product-card__meta">
              <div class="product-card__row">
                <h3 class="product-card__name">${p.name}</h3>
                <span class="pill">${p.badge}</span>
              </div>
              <p class="product-card__desc">${p.desc}</p>
            </div>

            <div class="product-card__row">
              <span class="price">${formatEUR(p.price)}</span>
              <span class="pill pill--muted">${p.category}</span>
            </div>

            <div class="product-card__actions">
              <a class="btn btn--ghost" href="./product.html?id=${encodeURIComponent(p.id)}">Detalle</a>
              <button class="btn btn--primary" type="button" data-add="${p.id}">Añadir</button>
              <button class="icon-btn icon-btn--heart ${fav ? "icon-btn--heart-active" : ""}" type="button" data-fav="${p.id}" aria-label="Favorito">
                ❤
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-add");
        addToCart(id);
        hydrateCartUI();
        toast("Añadido al carrito ✓");
      });
    });

    grid.querySelectorAll("[data-fav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fav");
        const nowFav = toggleFav(id);
        hydrateFavUI();
        btn.classList.toggle("icon-btn--heart-active", nowFav);
        toast(nowFav ? "Guardado en favoritos ✓" : "Quitado de favoritos");
      });
    });
  };

  const apply = () => {
    const query = (q?.value || "").trim().toLowerCase();
    const category = cat?.value || "all";
    const order = sort?.value || "featured";
    const favOnly = !!onlyFavs?.checked;

    let list = [...products];

    if (category !== "all") list = list.filter((p) => p.category === category);

    if (query) {
      list = list.filter((p) => {
        const text = `${p.name} ${p.desc} ${p.badge} ${p.category}`.toLowerCase();
        return text.includes(query);
      });
    }

    if (favOnly) {
      const favs = new Set(readFavs());
      list = list.filter((p) => favs.has(p.id));
    }

    if (order === "price-asc") list.sort((a, b) => a.price - b.price);
    if (order === "price-desc") list.sort((a, b) => b.price - a.price);
    if (order === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name, "es"));

    render(list);
  };

  q?.addEventListener("input", apply);
  cat?.addEventListener("change", apply);
  sort?.addEventListener("change", apply);
  onlyFavs?.addEventListener("change", apply);

  apply();
};