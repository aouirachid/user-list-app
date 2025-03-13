const todoList = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Build a project", completed: false },
  { id: 3, title: "Review code", completed: true },
];
console.log("Todo list:", todoList);

// Add new todo
todoList.push({ id: 4, title: "Go to the gym", completed: false });
console.log("Todo list after update:", todoList);

todoList.forEach((todo) => {
  if (todo.id === 1) {
    todo.completed = true;
  }
});
console.log("Todo list after update task 1:", todoList);

const updatedTodioList = todoList.filter((task) => task.id !== 2);
console.log("Todo list after update removing task 2:", updatedTodioList);

// Iterate over array using foreach
console.log("Current To-Do List:");
updatedTodioList.forEach((task) => {
  console.log(
    `Task ${task.id} : ${task.title} is ${
      task.completed ? "completed" : "not completed"
    }`,
  );
});
