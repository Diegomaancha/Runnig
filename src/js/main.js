import "../scss/main.scss";

import { initTheme } from "./modules/theme.js";
import { initToast } from "./modules/toast.js";
import { hydrateCartUI } from "./modules/cart.js";
import { hydrateFavUI } from "./modules/favorites.js";

import { initCarousel } from "./modules/carousel.js";
import { initProductsPage } from "./modules/products-page.js";
import { initProductPage } from "./modules/product-page.js";
import { initCartPage } from "./modules/cart-page.js";
import { initContactPage } from "./modules/contact-page.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initToast();

  hydrateCartUI();
  hydrateFavUI();

  initCarousel();
  initProductsPage();
  initProductPage();
  initCartPage();
  initContactPage();
});