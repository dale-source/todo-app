// Reference to the input field where users type new tasks
const taskInput = document.getElementById('taskInput');

// Reference to the "Add" button that submits new tasks
const addBtn = document.getElementById('addBtn');

// Reference to the unordered list where tasks will be displayed
const taskList = document.getElementById('taskList');

// Wrapper function for completing a task (binds save callback)
function handleComplete(event) {
    completeTask(event, saveAllTasks);
}

// Wrapper function for deleting a task (binds save callback)
function handleDelete(event) {
    deleteTask(event, saveAllTasks);
}

// Wrapper function for saving tasks
function saveAllTasks() {
    saveTasks(taskList, localStorage);
}

// Function to add a new task using the module
function handleAddTask() {
    addTask(taskInput, taskList, handleComplete, handleDelete, saveAllTasks);
}

// Function to load tasks on page load
function handleLoadTasks() {
    loadTasks(taskList, localStorage, handleComplete, handleDelete);
}

// Add click event listener to the Add button
addBtn.addEventListener('click', handleAddTask);

// Add keypress event listener to input field for Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleAddTask();
    }
});

// Load tasks from localStorage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', handleLoadTasks);
