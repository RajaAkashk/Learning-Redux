import { createStore } from "https://cdn.skypack.dev/redux";
import todosReducer from "./todosReducer.js";
import { addTodo,removeTodo } from "./actions.js";

const store = createStore(todosReducer);

store.subscribe(() => {
  updateTodoList();
  console.log(store.getState());
});

const todoInput = document.querySelector("#todoInput");
const addTodos = document.querySelector("#addTodo");
const todoList = document.querySelector("#todoList");

const addTodoHandler = () => {
  const todoValue = todoInput.value;
  if (todoValue) {
    console.log("TODO Value:", todoValue);
    store.dispatch(addTodo(todoValue));
    todoInput.value = "";
  }
};

window.removeTodoHandler = (index) => {
  store.dispatch(removeTodo(index));
};

addTodos.addEventListener("click", addTodoHandler);

const updateTodoList = () => {
  const state = store.getState();
  todoList.innerHTML = state.todos
    .map(
      (todo, index) =>
        `<li>${todo} <button onClick="removeTodoHandler(${index})">Delete</button></li>`
    )
    .join("");
};

updateTodoList();
