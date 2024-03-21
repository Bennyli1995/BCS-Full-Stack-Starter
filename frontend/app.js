// Wait for the DOM to fully load before running the loadTodos function
document.addEventListener("DOMContentLoaded", () => loadTodos());

// Get references to the form, the input box, and the list where todos will be displayed
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Add an event listener to the form to handle the submit event

// Function to create a new todo item by making a POST request to the backend
const createTodo = (todoText) => {};

// Function to add a todo item to the DOM list
const addTodoToList = (todo) => {
  const todoItem = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.textContent = todo.text; // Set the text of the todo item

  if (todo.completed) {
    todoItem.classList.add("completed"); // Mark as completed if the todo is completed
  }

  todoItem.appendChild(textSpan); // Add the text span to the todo item

  // Create a button to mark the todo as complete
  const completeButton = document.createElement("button");
  completeButton.textContent = "Mark as Complete";
  completeButton.onclick = () => toggleComplete(todo._id, todoItem); // Add click event to toggle completion

  // Create a button to delete the todo
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTodo(todo._id, todoItem); // Add click event to delete the todo

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("actions");

  // Add the buttons to the actions div
  actionsDiv.appendChild(completeButton);
  actionsDiv.appendChild(deleteButton);

  todoItem.appendChild(actionsDiv); // Add the actions div to the todo item
  todoList.appendChild(todoItem); // Add the todo item to the list
};

// Function to load todos from the backend using Axios
const loadTodos = async () => {
  try {
    const response = await axios.get("http://localhost:3000/todos");
    const todos = response.data; // Access the response data

    todoList.innerHTML = ""; // Clear the current list
    todos.forEach(addTodoToList); // Add each todo to the list
  } catch (err) {
    console.error("Error loading todos", err);
  }
};

// Function to toggle the completion status of a todo
const toggleComplete = (id, todoItem) => {
  const completed = !todoItem.classList.contains("completed");
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "PUT", // Use the PUT method to update the todo
    headers: {
      "Content-Type": "application/json", // Indicate a JSON body
    },
    body: JSON.stringify({ completed: completed }), // Send the updated completion status
  })
    .then((res) => res.json()) // Parse the JSON response
    .then((todo) => {
      // Update the class based on the latest 'completed' status from the server
      if (todo.completed) {
        todoItem.classList.add("completed");
      } else {
        todoItem.classList.remove("completed");
      }
    })
    .catch((err) => console.error("Error updating todo", err));
};

// Function to delete a todo
const deleteTodo = (id, todoItem) => {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE", // Use the DELETE method to request the deletion of the todo
  })
    .then(() => {
      todoItem.remove(); // Remove the todo item from the DOM if the request is successful
    })
    .catch((err) => console.error("Error deleting todo", err)); // Log any errors to the console
};
