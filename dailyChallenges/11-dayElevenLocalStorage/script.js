const userContainer = document.getElementById("userContainer");
const btnRefresh = document.getElementById("btnRefresh");
const addUserForm = document.getElementById("addUserForm");
const feedback = document.getElementById("feedback");
const LOCAL_STORAGE_KEY = "users";

async function initializeUser() {
  let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!users || users.length === 0) {
    users = await fetch("https://jsonplaceholder.typicode.com/users").then(
      (res) => res.json(),
    );
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  console.log(users);

  return users;
}

function renderUser() {
  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  userContainer.innerHTML = "";
  users.forEach((user) => {
    userContainer.innerHTML += `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Username: ${user.username}</p>
    </div>
    `;
  });
}

btnRefresh.addEventListener("click", renderUser);

addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = {
    id: Date.now(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
  };

  if (!newUser.name || !newUser.email || !newUser.username) {
    feedback.textContent = "Please fill all the fields!";
    feedback.style.color = "red";
    setTimeout(() => {
      feedback.textContent = "";
    }, 2000);
    return;
  }
  console.log(newUser);

  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  console.log(users);

  users.push(newUser);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

  renderUser();
  addUserForm.reset();

  feedback.textContent = "User added successfully!";
  setTimeout(() => {
    feedback.textContent = "";
  }, 2000);
});
initializeUser().then(renderUser);
