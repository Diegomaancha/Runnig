import { getProductById } from "../data/products.js";
import { addToCart, hydrateCartUI } from "./cart.js";
import { toggleFav, isFav, hydrateFavUI } from "./favorites.js";
import { toast } from "./toast.js";

const formatEUR = (n) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export const initProductPage = () => {
  const mount = document.querySelector("[data-product]");
  if (!mount) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "";
  const p = getProductById(id);

  if (!p) {
    mount.innerHTML = `
      <section class="section">
        <div class="panel">
          <h1 class="panel__title">Producto no encontrado</h1>
          <p class="panel__text">Vuelve al catálogo y entra desde un producto válido.</p>
          <div class="panel__actions">
            <a class="btn btn--primary" href="./products.html">Ir a productos</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const fav = isFav(p.id);

  const specsRows = Object.entries(p.specs)
    .map(
      ([k, v]) => `
      <div class="specs__row">
        <div class="specs__key">${k}</div>
        <div class="specs__val">${v}</div>
      </div>
    `
    )
    .join("");

  mount.innerHTML = `
    <div class="breadcrumbs">
      <a class="breadcrumbs__link" href="./index.html">Inicio</a>
      <span class="breadcrumbs__sep">›</span>
      <a class="breadcrumbs__link" href="./products.html">Productos</a>
      <span class="breadcrumbs__sep">›</span>
      <span class="breadcrumbs__current">${p.name}</span>
    </div>

    <section class="product" aria-label="Detalle de producto">
      <div class="product__media">
        <img src="${p.img}" alt="${p.name}">
      </div>

      <div class="product__panel">
        <div class="product__top">
          <h1 class="product__name">${p.name}</h1>
          <span class="pill pill--muted">${p.category}</span>
        </div>

        <p class="product__desc">${p.desc}</p>

        <div class="product__top">
          <span class="price price--xl">${formatEUR(p.price)}</span>
          <span class="pill">${p.badge}</span>
        </div>

        <div class="specs" aria-label="Especificaciones">
          ${specsRows}
        </div>

        <div class="product__actions">
          <a class="btn btn--ghost" href="./products.html">Volver</a>
          <button class="btn btn--primary" type="button" data-add>Añadir al carrito</button>
          <button class="icon-btn icon-btn--heart ${fav ? "icon-btn--heart-active" : ""}" type="button" data-fav aria-label="Favorito">❤</button>
        </div>

        <p class="product__note">
          Envío gratis a partir de 60€. Devoluciones 30 días.
        </p>
      </div>
    </section>
  `;

  mount.querySelector("[data-add]")?.addEventListener("click", () => {
    addToCart(p.id);
    hydrateCartUI();
    toast("Añadido al carrito ✓");
  });

  mount.querySelector("[data-fav]")?.addEventListener("click", (e) => {
    const nowFav = toggleFav(p.id);
    hydrateFavUI();
    e.currentTarget.classList.toggle("icon-btn--heart-active", nowFav);
    toast(nowFav ? "Guardado en favoritos ✓" : "Quitado de favoritos");
  });
};