// Reference to the input field where users type new tasks
const taskInput = document.getElementById('taskInput');

// Reference to the "Add" button that submits new tasks
const addBtn = document.getElementById('addBtn');

// Reference to the unordered list where tasks will be displayed
const taskList = document.getElementById('taskList');

// Function to add a new task to the list
function addTask() {
    // Get the text from the input field and remove whitespace
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText === '') {
        return;
    }

    // Create a new list item element
    const li = document.createElement('li');

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-buttons';

    // Create the Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', completeTask);

    // Create the Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', deleteTask);

    // Add buttons to the button container
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    // Add the span and buttons to the list item
    li.appendChild(taskSpan);
    li.appendChild(buttonContainer);

    // Add the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to localStorage
    saveTasks();
}

// Function to toggle the completed state of a task
function completeTask(event) {
    // Get the parent list item of the clicked button
    const li = event.target.closest('li');
    // Toggle the 'completed' class
    li.classList.toggle('completed');

    // Save tasks to localStorage
    saveTasks();
}

// Function to delete a task from the list
function deleteTask(event) {
    // Get the parent list item of the clicked button
    const li = event.target.closest('li');
    // Remove the list item from the task list
    li.remove();

    // Save tasks to localStorage
    saveTasks();
}

// Function to save all tasks to localStorage
function saveTasks() {
    // Get all list items from the task list
    const listItems = taskList.querySelectorAll('li');

    // Create an array to store task data
    const tasks = [];

    // Loop through each list item and extract task data
    listItems.forEach(function(li) {
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    // Convert to JSON and save to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage when the page loads
function loadTasks() {
    // Get tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');

    // If no tasks exist, return early
    if (!storedTasks) {
        return;
    }

    // Parse the JSON data
    const tasks = JSON.parse(storedTasks);

    // Recreate each task in the list
    tasks.forEach(function(task) {
        // Create a new list item element
        const li = document.createElement('li');

        // Add completed class if the task was completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create a span for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        // Create a container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        // Create the Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', completeTask);

        // Create the Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', deleteTask);

        // Add buttons to the button container
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        // Add the span and buttons to the list item
        li.appendChild(taskSpan);
        li.appendChild(buttonContainer);

        // Add the list item to the task list
        taskList.appendChild(li);
    });
}

// Add click event listener to the Add button
addBtn.addEventListener('click', addTask);

// Add keypress event listener to input field for Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks from localStorage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTasks);
