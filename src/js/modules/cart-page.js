import { getProductById } from "../data/products.js";
import {
  readCart,
  removeFromCart,
  setQty,
  clearCart,
  cartTotal,
  hydrateCartUI
} from "./cart.js";
import { toast } from "./toast.js";

const formatEUR = (n) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export const initCartPage = () => {
  const list = document.querySelector("[data-cart-list]");
  if (!list) return;

  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  const totalEl = document.querySelector("[data-cart-total]");
  const shippingEl = document.querySelector("[data-cart-shipping]");
  const clearBtn = document.querySelector("[data-cart-clear]");
  const checkoutBtn = document.querySelector("[data-cart-checkout]");

  const renderEmpty = () => {
    list.innerHTML = `
      <div class="panel">
        <h2 class="panel__title">Tu carrito está vacío</h2>
        <p class="panel__text">Añade productos desde el catálogo.</p>
        <div class="panel__actions">
          <a class="btn btn--primary" href="./products.html">Ir a productos</a>
        </div>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatEUR(0);
    if (totalEl) totalEl.textContent = formatEUR(0);
    if (shippingEl) shippingEl.textContent = "—";
    hydrateCartUI();
  };

  const render = () => {
    const cart = readCart();

    // Filtramos items que no existan en el catálogo (por si quedaba basura vieja)
    const valid = cart.filter((i) => !!getProductById(i.productId));

    // Si había basura, la limpiamos
    if (valid.length !== cart.length) {
      // reescribimos dejando solo válidos
      localStorage.setItem("cart", JSON.stringify(valid));
    }

    if (!valid.length) {
      renderEmpty();
      return;
    }

    list.innerHTML = valid
      .map((i) => {
        const p = getProductById(i.productId);

        return `
          <article class="cart-item">
            <div class="cart-item__thumb">
              <img src="${p.img}" alt="${p.name}">
            </div>

            <div class="cart-item__body">
              <h3 class="cart-item__name">${p.name}</h3>
              <p class="cart-item__meta">${formatEUR(p.price)} · ${p.category} · ${p.badge}</p>

              <div class="cart-item__controls">
                <label class="visually-hidden" for="qty-${p.id}">Cantidad</label>
                <input class="input cart-item__qty"
                  id="qty-${p.id}"
                  type="number"
                  min="1"
                  max="99"
                  value="${i.qty}"
                  data-qty="${p.id}">

                <button class="btn btn--danger"
                  type="button"
                  data-remove="${p.id}">
                  Eliminar
                </button>
              </div>
            </div>

            <div class="cart-item__price">${formatEUR(p.price * i.qty)}</div>
          </article>
        `;
      })
      .join("");

    const subtotal = cartTotal();
    const shipping = subtotal >= 60 ? 0 : 4.99;
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = formatEUR(subtotal);
    if (totalEl) totalEl.textContent = formatEUR(total);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "Gratis" : formatEUR(shipping);

    hydrateCartUI();

    list.querySelectorAll("[data-remove]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-remove");
        removeFromCart(id);
        toast("Producto eliminado");
        render();
      });
    });

    list.querySelectorAll("[data-qty]").forEach((inp) => {
      inp.addEventListener("change", () => {
        const id = inp.getAttribute("data-qty");
        setQty(id, inp.value);
        toast("Cantidad actualizada");
        render();
      });
    });
  };

  clearBtn?.addEventListener("click", () => {
    clearCart();
    toast("Carrito vaciado");
    render();
  });

  checkoutBtn?.addEventListener("click", () => {
    toast("Compra simulada ✓");
  });

  render();
};