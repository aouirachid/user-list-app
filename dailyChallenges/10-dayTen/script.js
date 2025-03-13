const userContainer = document.getElementById("userContainer");
const btnRefresh = document.getElementById("btnRefresh");
const addUserForm = document.getElementById("addUserForm");
const feedback = document.getElementById("feedback");

async function fetchUsers() {
  userContainer.innerHTML = `<p>Loading Users...</p>`;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`Failed to fetch data`);

    const users = await response.json();
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
  } catch (error) {
    userContainer.innerHTML = `<p>${error.message}</p>`;
  }
}
fetchUsers();
btnRefresh.addEventListener("click", fetchUsers);

addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;

  if (!name || !email || !username) {
    feedback.textContent = "Please fill all the fields!";
    feedback.style.color = "red";
    setTimeout(() => {
      feedback.textContent = "";
    }, 2000);
    return;
  }

  const newUser = { name, email, username };
  userContainer.innerHTML += `
  <div class="user-card">
     <h3>${newUser.name}</h3>
     <p>Email: ${newUser.email}</p>
     <p>Username: ${newUser.username}</p>
     </div>
  `;

  addUserForm.reset();
  feedback.textContent = "User added successfully!";
  setTimeout(() => {
    feedback.textContent = "";
  }, 2000);
});
