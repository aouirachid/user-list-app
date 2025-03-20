// src/app.js
import { initAuth } from "./modules/auth.js";
import { setupSearch, setupUserForm } from "./modules/formHandlers.js";
import { initUserListener } from "./modules/users.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  setupUserForm();
  initUserListener();
  setupSearch();
});
