var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
var formEl = document.querySelector("#task-form");
var taskNameInput = document.querySelector("input[name='task-name']");
var taskTypeInput = document.querySelector("select[name='task-type']");


var createTaskHandler = function (event) {
    event.preventDefault();

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput.value + "</h3><span class='task-type'>" + taskTypeInput.value + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}
formEl.addEventListener("submit", createTaskHandler);
// buttonEl.addEventListener("click", createTaskHandler)