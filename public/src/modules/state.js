// src/modules/state.js
let currentUsers = [];
let listeners = [];

export const store = {
  setUsers(users) {
    currentUsers = users;
    listeners.forEach((listener) => listener());
  },
  getUsers() {
    return currentUsers;
  },
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
