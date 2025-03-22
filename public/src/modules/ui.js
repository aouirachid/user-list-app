// src/modules/ui.js
export const showAuthUI = () => {
  document.getElementById("authContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("userContainer").innerHTML = "";
};

export const hideAuthUI = () => {
  document.getElementById("authContainer").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
};

export const renderUsers = (users) => {
  const container = document.getElementById("userContainer");
  container.innerHTML = users
    .map(
      (user) => `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <button class="editBtn" data-id="${user.id}">Edit</button>
      <button class="deleteBtn" data-id="${user.id}">Delete</button>
    </div>
  `,
    )
    .join("");
};

export const showAuthError = (message) => {
  const authFeedback = document.getElementById("authFeedback");
  authFeedback.textContent = message;
  setTimeout(() => (authFeedback.textContent = ""), 3000);
};

export const showFormError = (message) => {
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = message.replace(/\n/g, "<br>");
  feedback.style.color = "red";
  setTimeout(() => (feedback.innerHTML = ""), 3000);
};

export const showFormSuccess = (message) => {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  setTimeout(() => (feedback.textContent = ""), 3000);
};

export const submitButton = (text) => {
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.textContent = text;
};

export const toggleLoading = (isLoading) => {
  const loading = document.getElementById("loading");
  const buttons = document.querySelectorAll("button");
  loading.classList.toggle("hidden", !isLoading);
  buttons.forEach((btn) => (btn.disabled = isLoading));
};