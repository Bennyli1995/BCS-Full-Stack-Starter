document.addEventListener("DOMContentLoaded", () => loadTodos());

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value;

  if (todoText) {
    createTodo(todoText);
  }
});

const createTodo = (todoText) => {
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: todoText, completed: false }),
  })
    .then((res) => res.json())
    .then(addTodoToList)
    .catch((err) => console.error("Error adding todo", err));

  todoInput.value = ""; // Clear input after submission
};

const addTodoToList = (todo) => {
  const todoItem = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    todoItem.classList.add("completed");
  }

  const completeButton = document.createElement("button");
  completeButton.textContent = "Mark as Complete";
  completeButton.onclick = () => toggleComplete(todo._id, todoItem);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTodo(todo._id, todoItem);

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("actions");

  actionsDiv.appendChild(completeButton);
  actionsDiv.appendChild(deleteButton);

  todoItem.appendChild(actionsDiv);

  todoList.appendChild(todoItem);
};
