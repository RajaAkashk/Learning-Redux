import { createStore } from "https://cdn.skypack.dev/redux";
import todosReducer from "./todosReducer.js"; // Ensure .js is specified

const store = createStore(todosReducer);

store.subscribe(() => {
  updateTodoList();
  console.log(store.getState());
});

const todoInput = document.querySelector("#todoInput");
const addTodo = document.querySelector("#addTodo");
const todoList = document.querySelector("#todoList");

const addTodoHandler = () => {
  const todoValue = todoInput.value.trim();
  if (todoValue) {
    console.log("TODO Value:", todoValue);
    store.dispatch({ type: "ADD_TODO", payload: todoValue });
    todoInput.value = ""; // Clear input field after adding
  }
};

addTodo.addEventListener("click", addTodoHandler);

const updateTodoList = () => {
  const state = store.getState();
  todoList.innerHTML = state.todos.map((todo) => `<li>${todo}</li>`).join("");
};

updateTodoList();
