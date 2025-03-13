const userContainer = document.getElementById("userContainer");
const btnRefresh = document.getElementById("btnRefresh");

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
