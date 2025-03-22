// src/modules/auth.js
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../../fireBase.js";
import { store } from "./state.js";
import { showAuthUI, hideAuthUI, showAuthError } from "./ui.js";
import { initUserListener } from "./users.js";
import { toggleLoading } from "./ui.js";

export const initAuth = () => {
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignup = document.getElementById("btnSignup");
  const btnLogout = document.getElementById("btnLogout");

  // Auth State Listener
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        store.setLoading(true);
        await initUserListener(user);
        hideAuthUI();
      } else {
        showAuthUI();
      }
    } finally {
      store.setLoading(false);
    }
  });
  // Signup Handler
  btnSignup.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        authEmail.value.trim(),
        authPassword.value.trim(),
      );
    } catch (error) {
      showAuthError(error.message);
    }
  });

  // Login Handler
  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        authEmail.value.trim(),
        authPassword.value.trim(),
      );
    } catch (error) {
      showAuthError(error.message);
    }
  });

  // Logout Handler
  btnLogout.addEventListener("click", () => auth.signOut());
};
