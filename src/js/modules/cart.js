import { getProductById } from "../data/products.js";

const KEY = "atletismoshop_cart_v1";

export const readCart = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeCart = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};

export const addToCart = (productId) => {
  const cart = readCart();
  const idx = cart.findIndex((i) => i.productId === productId);

  if (idx >= 0) cart[idx].qty += 1;
  else cart.push({ productId, qty: 1 });

  writeCart(cart);
};

export const removeFromCart = (productId) => {
  const cart = readCart().filter((i) => i.productId !== productId);
  writeCart(cart);
};

export const setQty = (productId, qty) => {
  const safeQty = Math.max(1, Math.min(99, Number(qty) || 1));
  const cart = readCart().map((i) =>
    i.productId === productId ? { ...i, qty: safeQty } : i
  );
  writeCart(cart);
};

export const clearCart = () => writeCart([]);

export const cartCount = () => readCart().reduce((acc, i) => acc + i.qty, 0);

export const cartTotal = () => {
  const cart = readCart();
  return cart.reduce((acc, i) => {
    const p = getProductById(i.productId);
    if (!p) return acc;
    return acc + p.price * i.qty;
  }, 0);
};

export const hydrateCartUI = () => {
  const badgeNodes = document.querySelectorAll("[data-cart-badge]");
  const count = cartCount();
  badgeNodes.forEach((b) => (b.textContent = String(count)));
};