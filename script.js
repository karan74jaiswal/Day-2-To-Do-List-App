"use strict";

// We have used Local Storage API to maintain persistance
const tasks = [];
const inputField = document.querySelector("#input-box");
const addBtn = document.querySelector("button");
const listContainer = document.querySelector("#list-container");

// Helper Functions
const importingTasksFromLocalStorage = function () {
  inputField.focus();
  if (
    !localStorage.getItem("todoTasks") ||
    !localStorage.getItem("taskHistory")
  )
    return;
  tasks.push(...JSON.parse(localStorage.getItem("todoTasks")));
  listContainer.innerHTML = localStorage.getItem("taskHistory");
  listContainer.classList.remove("hidden");
};

const renderTaskList = function () {
  if (tasks.length === 0) listContainer.classList.add("hidden");
  listContainer.classList.remove("hidden");
};

const addTask = function () {
  const enteredTask = inputField.value;
  if (!enteredTask) return;
  tasks.push(enteredTask);
  inputField.value = "";
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
  listContainer.insertAdjacentHTML(
    "beforeend",
    `<li>${enteredTask}<span>x</span></li>`
  );
  localStorage.setItem("taskHistory", listContainer.innerHTML);
  renderTaskList();
};

const finishTask = function (e) {
  if (!e.target.closest("span")) {
    const clicked = e.target.closest("li");
    if (!clicked) return;
    clicked.classList.toggle("checked");
    localStorage.setItem("taskHistory", listContainer.innerHTML);
  }
  return;
};

const removeTask = function (e) {
  const clicked = e.target.closest("span");
  if (!clicked) return;
  const task = clicked.parentElement.textContent.slice(0, -1);
  tasks.splice(tasks.indexOf(task), 1);
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
  clicked.closest("li").remove();
  localStorage.setItem("taskHistory", listContainer.innerHTML);
  renderTaskList();
};

// Event Handlers

// Adding a new Task
addBtn.addEventListener("click", addTask);

// Finishing a Task
listContainer.addEventListener("click", finishTask);

// Removing a Task
listContainer.addEventListener("click", removeTask);

importingTasksFromLocalStorage();
