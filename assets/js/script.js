var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
var formEl = document.querySelector("#task-form");
var taskNameInput = document.querySelector("input[name='task-name']");
var taskTypeInput = document.querySelector("select[name='task-type']");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;


function createTaskEl(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter)
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    listItemEl.appendChild(createTaskActions(taskIdCounter))

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter
}
function createTaskActions(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
}

function taskFormHandler(event) {
    event.preventDefault();

    if (!taskNameInput.value || !taskTypeInput.value) {
        alert("You need to fill out the task form!");
        return false;
    }

    // formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput.value,
        type: taskTypeInput.value
    }
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

function taskButtonHandler(event) {
    // console.log(event.target);
    if (event.target.matches(".delete-btn")) {
        var taskID = event.target.getAttribute("data-task-id");
        console.log(taskID)
        deleteTask(taskID)
    }
}

function deleteTask(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    console.log(taskSelected)
    taskSelected.remove();
}

// The submit event listens for two possible actions to occur within a form. This makes it more accessible and intuitive for users, as they don’t always have to find the button for submitting and click it.
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
// buttonEl.addEventListener("click", createTaskHandler)