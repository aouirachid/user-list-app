const todoList = [
  { id: 1, title: "Learn JavaScript", completed: true },
  { id: 2, title: "Build a Project", completed: false },
  { id: 3, title: "Deploy to GitHub", completed: false },
];
const todoContainer = document.getElementById("todoContainer");
// function getTodo() {
//   todoList.forEach((todo) => {
//     todoContainer.innerHTML += `
//     <p>${todo.title}</p> <p>${todo.completed}</p>`;
//   });
// }
// getTodo();

function renderTodoList() {
  todoContainer.innerHTML = "";
  todoList.forEach((todo) => {
    todoContainer.innerHTML += `
    <div class="todo" data-completed="${todo.completed}">
        <h3>${todo.title}</h3>
        <button class="toggleBtn" data-id="${todo.id}">
          ${todo.completed ? "✅ Done" : "❌ Not Done"}
        </button>
        <button class="removeBtn" data-id="${todo.id}">Remove</button>
    </div>
    `;
  });
}
renderTodoList();
todoContainer.addEventListener("click", (e) => {
  // if (e.target.classList.contains("toggleBtn")) {
  //   const id = e.target.dataset.id;
  //   const index = todoList.findIndex((todo) => todo.id == id);
  //   index.completed = !index.completed;
  //   renderTodoList();
  // }

  // if (e.target.classList.contains("removeBtn")) {
  //   const id = e.target.dataset.id;
  //   const index = todoList.findIndex((todo) => todo.id == id);
  //   todoList.splice(index, 1);
  //   renderTodoList();
  // }

  if (e.target.classList.contains("toggleBtn")) {
    const id = parseInt(e.target.dataset.id); // Convert to number
    const todo = todoList.find((todo) => todo.id === id); // Get todo object
    todo.completed = !todo.completed; // Toggle status
    renderTodoList();
  }

  // Remove functionality
  if (e.target.classList.contains("removeBtn")) {
    const id = parseInt(e.target.dataset.id);
    const index = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(index, 1);
    renderTodoList();
  }
});
