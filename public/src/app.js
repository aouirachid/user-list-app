// src/app.js
import { initAuth } from "./modules/auth.js";
import { setupSearch, setupUserForm } from "./modules/formHandlers.js";
import { store } from "./modules/state.js";
import { toggleLoading } from "./modules/ui.js";
import { initUserListener } from "./modules/users.js";

store.subscribe(() => {
  toggleLoading(store.getLoading());
});

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  setupUserForm();
  initUserListener();
  setupSearch();
});
