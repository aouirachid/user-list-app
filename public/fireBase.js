// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "user-list-app-c6bbd.firebaseapp.com",
  projectId: "user-list-app-c6bbd",
  storageBucket: "user-list-app-c6bbd.firebasestorage.app",
  messagingSenderId: "158601328577",
  appId: "1:158601328577:web:c297a012303c239b842140",
  measurementId: "G-6JDVLM9KWV", // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firestore functions
export {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
