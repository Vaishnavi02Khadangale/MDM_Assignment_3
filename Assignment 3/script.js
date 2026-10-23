
let tasks = [];
let nextId = 1;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// CREATE
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: nextId++,
        text: text
    };

    tasks.push(task);
    taskInput.value = "";

    renderTasks();
}

// READ: Display all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task";

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {
            updateTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actions.append(editBtn, deleteBtn);
        li.append(span, actions);
        taskList.appendChild(li);
    });
}

// UPDATE
function updateTask(id) {
    const task = tasks.find(function (item) {
        return item.id === id;
    });

    if (!task) return;

    const updatedText = prompt("Update your task:", task.text);

    if (updatedText === null) return;

    if (updatedText.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    task.text = updatedText.trim();
    renderTasks();
}

// DELETE
function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    renderTasks();
}

// Button click adds a task
addBtn.addEventListener("click", addTask);

// Press Enter to add a task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
