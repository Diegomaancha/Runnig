import { getProductById } from "../data/products.js";

const STORAGE_KEY = "cart";

/**
 * Normaliza el carrito viejo/roto:
 * - Acepta items con {productId, qty} o {id, qty}
 * - Elimina items sin id válido
 * - Asegura qty >= 1
 */
function normalizeCart(raw) {
  if (!Array.isArray(raw)) return [];

  const normalized = raw
    .map((it) => {
      const productId = it?.productId ?? it?.id ?? null;
      const qty = Math.max(1, Math.min(99, Number(it?.qty) || 1));
      if (!productId || typeof productId !== "string") return null;
      return { productId, qty };
    })
    .filter(Boolean);

  // elimina duplicados sumando qty
  const map = new Map();
  for (const it of normalized) {
    const prev = map.get(it.productId);
    map.set(it.productId, prev ? { productId: it.productId, qty: Math.min(99, prev.qty + it.qty) } : it);
  }

  return Array.from(map.values());
}

/* leer carrito (y autocorregir si venía roto) */
export function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const fixed = normalizeCart(parsed);

    // si hubo cambios, lo reescribimos limpio
    if (JSON.stringify(parsed) !== JSON.stringify(fixed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fixed));
    }

    return fixed;
  } catch {
    return [];
  }
}

/* guardar carrito */
function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/* contar items (sumando cantidades) */
export function cartCount() {
  return readCart().reduce((acc, it) => acc + it.qty, 0);
}

/* total € usando el catálogo */
export function cartTotal() {
  const cart = readCart();
  return cart.reduce((acc, it) => {
    const p = getProductById(it.productId);
    if (!p) return acc;
    return acc + p.price * it.qty;
  }, 0);
}

/* actualizar badge del carrito (solo el del carrito, no el de favs) */
export function hydrateCartUI() {
  const count = cartCount();

  // badge del botón carrito (nav)
  document.querySelectorAll(".cart-btn .badge").forEach((b) => {
    b.textContent = String(count);
  });

  // si en alguna página usas data-cart-badge, también lo soporta
  document.querySelectorAll("[data-cart-badge]").forEach((b) => {
    b.textContent = String(count);
  });
}

/* añadir producto (recibe ID string) */
export function addToCart(productId) {
  if (!productId || typeof productId !== "string") return;

  const cart = readCart();
  const idx = cart.findIndex((i) => i.productId === productId);

  if (idx >= 0) cart[idx].qty = Math.min(99, cart[idx].qty + 1);
  else cart.push({ productId, qty: 1 });

  saveCart(cart);
  hydrateCartUI();
}

/* eliminar producto */
export function removeFromCart(productId) {
  const cart = readCart().filter((i) => i.productId !== productId);
  saveCart(cart);
  hydrateCartUI();
}

/* cambiar cantidad */
export function setQty(productId, qty) {
  const safeQty = Math.max(1, Math.min(99, Number(qty) || 1));
  const cart = readCart().map((i) =>
    i.productId === productId ? { ...i, qty: safeQty } : i
  );
  saveCart(cart);
  hydrateCartUI();
}

/* vaciar carrito */
export function clearCart() {
  saveCart([]);
  hydrateCartUI();
}