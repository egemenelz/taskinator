var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
var formEl = document.querySelector("#task-form");
var taskNameInput = document.querySelector("input[name='task-name']");
var taskTypeInput = document.querySelector("select[name='task-type']");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

// This is used for configuration of form
function taskFormHandler(event) {
    event.preventDefault();

    if (!taskNameInput.value || !taskTypeInput.value) {
        alert("You need to fill out the task form!");
        return false;
    }

    // formEl.reset();



    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput.value,
            type: taskTypeInput.value
        }

        createTaskEl(taskDataObj);
    }
}

// This is used for task Element
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
    taskIdCounter++;
}

// This is used for create a action buttons
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

function taskButtonHandler(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // delete button was clicked
    if (targetEl.matches(".delete-btn")) {
        var taskID = targetEl.getAttribute("data-task-id");
        console.log(taskID)
        deleteTask(taskID)
    }
}

function deleteTask(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    console.log(taskSelected)
    taskSelected.remove();
}

function editTask(taskID) {
    console.log("editing task #" + taskID);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName)

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType)

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskID);
}

function completeEditTask(taskName, taskType, taskID) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName.value;
    taskSelected.querySelector("span.task-type").textContent = taskType.value;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

function taskStatusChangeHandler(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}









// The submit event listens for two possible actions to occur within a form. This makes it more accessible and intuitive for users, as they don’t always have to find the button for submitting and click it.
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
// buttonEl.addEventListener("click", createTaskHandler)