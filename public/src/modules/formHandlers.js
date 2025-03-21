// src/modules/formHandlers.js
import { addUser, deleteUser, updateUser } from "./users.js";
import {
  renderUsers,
  showFormError,
  showFormSuccess,
  submitButton,
} from "./ui.js";
import { store } from "./state.js";

export const setupUserForm = () => {
  const form = document.getElementById("addUserForm");
  const userContainer = document.getElementById("userContainer");
  let editingId = null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      username: form.username.value.trim(),
    };
    const validation = validateUserInput(data);
    //console.log(!validation.isValid);
    if (!validation.isValid) {
      showFormError(validation.errors.join("\n"));
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, data);
        showFormSuccess("User updated successfully ✅");
        submitButton("Add user");
      } else {
        await addUser(data);
        showFormSuccess("User added successfully ✅");
      }
      form.reset();
    } catch (error) {
      showFormError(error.message);
    }
  });

  userContainer.addEventListener("click", (e) => {
    const currentUsers = store.getUsers(); // Get latest state

    if (e.target.classList.contains("deleteBtn")) {
      if (confirm("Delete this user?")) {
        deleteUser(e.target.dataset.id);
      }
    }

    if (e.target.classList.contains("editBtn")) {
      const user = currentUsers.find((u) => u.id === e.target.dataset.id);
      if (user) {
        editingId = user.id;
        form.name.value = user.name;
        form.email.value = user.email;
        form.username.value = user.username;
        submitButton("Update");
      }
    }
  });
};
export const setupSearch = () => {
  const searchInput = document.getElementById("searchInput");
  const debounce = (fun, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fun(...args), delay);
    };
  };
  const handelSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filterd = store.getUsers().filter((user) => {
      const matchedName = user.name?.toLowerCase().includes(term);
      const matchedEmail = user.email?.toLowerCase().includes(term);
      const matchedUsername = user.username?.toLowerCase().includes(term);
      return matchedName || matchedEmail || matchedUsername;
    });
    renderUsers(filterd);
  };
  searchInput.addEventListener("input", debounce(handelSearch, 300));
};

const validateUserInput = (data) => {
  const errors = [];
  if (!data.name || data.name.length < 2 || data.name.length > 30) {
    errors.push("invalid name, he must be between 2 and 30 character");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (
    !data.username ||
    data.username.length < 3 ||
    data.username.length > 20 ||
    /\s/.test(data.username)
  ) {
    errors.push("Username must be 3-20 characters without spaces");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};
