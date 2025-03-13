// app.js (final)
import {
  db,
  doc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from "./fireBase.js";

const userContainer = document.getElementById("userContainer");
const addUserForm = document.getElementById("addUserForm");
const feedback = document.getElementById("feedback");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const searchInput = document.getElementById("searchInput");
const btnSubmit = document.getElementById("btnSubmit");
const usersCollection = collection(db, "users");

let currentUsers = [];
let isEditingId = null;

// Render users to DOM
function renderUser(users) {
  userContainer.innerHTML = "";
  btnSubmit.textContent = "Add";
  if (users.length === 0) {
    userContainer.innerHTML = `<p class="error">No users found.</p>`;
    return;
  }
  users.forEach((user) => {
    userContainer.innerHTML += `
      <div class="user-card">
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Username: ${user.username}</p>
        <button class="editBtn" data-id="${user.id}">Edit</button>
        <button class="deleteBtn" data-id="${user.id}">Delete</button>
      </div>
    `;
  });
}

// Real-time Firestore listener
function realTimeUpdate() {
  onSnapshot(usersCollection, (snapshot) => {
    currentUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderUser(currentUsers);
  });
}

// Add user to Firestore
async function addUser(newUser) {
  try {
    await addDoc(usersCollection, newUser);
    feedback.textContent = "User added! ✅";
    feedback.style.color = "green";
  } catch (error) {
    feedback.textContent = "Error adding user: " + error.message;
    feedback.style.color = "red";
  } finally {
    setTimeout(() => (feedback.textContent = ""), 2000);
  }
}

// Update user in Firestore
async function updateUser(userId, updatedUser) {
  try {
    await updateDoc(doc(db, "users", userId), updatedUser);
    feedback.textContent = "User updated! ✅";
    feedback.style.color = "green";
  } catch (error) {
    feedback.textContent = "Error updating user: " + error.message;
    feedback.style.color = "red";
  } finally {
    setTimeout(() => (feedback.textContent = ""), 2000);
  }
}

// Delete user from Firestore
async function deleteUser(userId) {
  try {
    await deleteDoc(doc(db, "users", userId));
    feedback.textContent = "User deleted! ✅";
    feedback.style.color = "green";
  } catch (error) {
    feedback.textContent = "Error deleting user: " + error.message;
    feedback.style.color = "red";
  } finally {
    setTimeout(() => (feedback.textContent = ""), 2000);
  }
}

// Event Listeners
addUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();

  if (!name || !email || !username) {
    feedback.textContent = "Please fill all fields!";
    feedback.style.color = "red";
    return;
  }

  try {
    const userData = { name, email, username };
    if (isEditingId) {
      await updateUser(isEditingId, userData);
    } else {
      await addUser(userData);
    }
    addUserForm.reset();
  } finally {
    isEditingId = null;
  }
});

userContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("deleteBtn") &&
    confirm("Delete this user?")
  ) {
    deleteUser(e.target.dataset.id);
  }
  if (e.target.classList.contains("editBtn")) {
    const user = currentUsers.find((u) => u.id === e.target.dataset.id);
    btnSubmit.textContent = "Update";
    nameInput.value = user.name;
    emailInput.value = user.email;
    usernameInput.value = user.username;
    isEditingId = user.id;
  }
});

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const filteredUsers = currentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm),
  );
  renderUser(filteredUsers);
});

// Initialize
realTimeUpdate();
