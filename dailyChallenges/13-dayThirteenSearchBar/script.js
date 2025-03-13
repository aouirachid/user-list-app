const userContainer = document.getElementById("userContainer");
const btnRefresh = document.getElementById("btnRefresh");
const addUserForm = document.getElementById("addUserForm");
const feedback = document.getElementById("feedback");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const searchInput = document.getElementById("searchInput");
const LOCAL_STORAGE_KEY = "users";

async function initializeUser() {
  let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []; // Default to empty array

  if (users.length === 0) {
    // Fetch only if empty
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      users = await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      users = []; // Fallback to empty array
    }
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  return users;
}
btnRefresh.addEventListener("click", () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  initializeUser().then(renderUser);
});

function renderUser(userToRender) {
  const users =
    userToRender || JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  userContainer.innerHTML = "";
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
//delete function
userContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = parseInt(e.target.dataset.id);
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredUsers));
    renderUser();
    feedback.textContent = "User delete!";
    feedback.style.color = "red";
    setTimeout(() => {
      feedback.textContent = "";
    }, 2000);
  }
});

//edit function
let isEditingId = null;
userContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    const id = parseInt(e.target.dataset.id);
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const userToEdit = users.find((user) => user.id === id);
    nameInput.value = userToEdit.name;
    emailInput.value = userToEdit.email;
    usernameInput.value = userToEdit.username;
    isEditingId = id;
  }
});

// add user
addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = {
    id: Date.now(),
    name: nameInput.value,
    email: emailInput.value,
    username: usernameInput.value,
  };

  if (!newUser.name || !newUser.email || !newUser.username) {
    feedback.textContent = "Please fill all the fields!";
    feedback.style.color = "red";
    setTimeout(() => {
      feedback.textContent = "";
    }, 2000);
    return;
  }
  //console.log(newUser);

  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //console.log(users);
  if (isEditingId) {
    const userIndex = users.findIndex((user) => user.id === isEditingId);
    users[userIndex] = { ...newUser, id: isEditingId };
    feedback.textContent = "User edited successfully!";
  } else {
    users.push(newUser);
    feedback.textContent = "User added successfully!";
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

  renderUser();
  addUserForm.reset();
  feedback.style.color = "green";
  setTimeout(() => {
    feedback.textContent = "";
  }, 2000);
  isEditingId = null;
});

//search
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase().trim();
  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.username.toLowerCase().includes(searchValue),
  );
  renderUser(filteredUsers);
});
initializeUser().then(renderUser);
