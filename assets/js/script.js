var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
var formEl = document.querySelector("#task-form");
var taskNameInput = document.querySelector("input[name='task-name']");
var taskTypeInput = document.querySelector("select[name='task-type']");

function createTaskEl(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

function taskFormHandler(event) {
    event.preventDefault();

    if(!taskNameInput.value || !taskTypeInput.value){
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput.value,
        type: taskTypeInput.value
    }
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

formEl.addEventListener("submit", taskFormHandler);
// buttonEl.addEventListener("click", createTaskHandler)