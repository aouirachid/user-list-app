// src/modules/users.js
import {
  collection,
  auth,
  db,
  updateDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "../../fireBase.js";
import { store } from "./state.js";
import { renderUsers } from "./ui.js";

export const initUserListener = (user) => {
  if (!user?.uid) return () => {};

  const usersQuery = query(
    collection(db, "users"),
    where("ownerId", "==", user.uid),
  );

  return onSnapshot(usersQuery, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    store.setUsers(users); // Update global state
    renderUsers(users);
  });
};

export const addUser = async (userData) => {
  try {
    const user = auth.currentUser; // Get logged-in user
    if (!user) throw new Error("Not logged in!");
    await addDoc(collection(db, "users"), { ...userData, ownerId: user.uid }); //pass the uid with the array of users
  } catch (error) {
    throw new Error("Failed to add user: " + error.message);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await updateDoc(doc(db, "users", userId), userData);
  } catch (error) {
    throw new Error("Failed to update user: " + error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
  } catch (error) {
    throw new Error("Failed to delete user: " + error.message);
  }
};
