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
      name: form.name.value,
      email: form.email.value,
      username: form.username.value,
    };

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
