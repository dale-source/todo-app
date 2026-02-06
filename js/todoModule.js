// Core todo functions that can be imported for testing

// Function to create a task list item element
function createTaskElement(taskText, isCompleted, onComplete, onDelete) {
    // Create a new list item element
    const li = document.createElement('li');

    // Add completed class if the task was completed
    if (isCompleted) {
        li.classList.add('completed');
    }

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
    completeBtn.addEventListener('click', onComplete);

    // Create the Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', onDelete);

    // Add buttons to the button container
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    // Add the span and buttons to the list item
    li.appendChild(taskSpan);
    li.appendChild(buttonContainer);

    return li;
}

// Function to add a new task to the list
function addTask(taskInput, taskList, onComplete, onDelete, onSave) {
    // Get the text from the input field and remove whitespace
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText === '') {
        return false;
    }

    // Create the task element
    const li = createTaskElement(taskText, false, onComplete, onDelete);

    // Add the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Save tasks
    if (onSave) {
        onSave();
    }

    return true;
}

// Function to toggle the completed state of a task
function completeTask(event, onSave) {
    // Get the parent list item of the clicked button
    const li = event.target.closest('li');
    // Toggle the 'completed' class
    li.classList.toggle('completed');

    // Save tasks
    if (onSave) {
        onSave();
    }
}

// Function to delete a task from the list
function deleteTask(event, onSave) {
    // Get the parent list item of the clicked button
    const li = event.target.closest('li');
    // Remove the list item from the task list
    li.remove();

    // Save tasks
    if (onSave) {
        onSave();
    }
}

// Function to save all tasks to localStorage
function saveTasks(taskList, storage) {
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

    // Convert to JSON and save to storage
    storage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks(taskList, storage, onComplete, onDelete) {
    // Get tasks from storage
    const storedTasks = storage.getItem('tasks');

    // If no tasks exist, return early
    if (!storedTasks) {
        return [];
    }

    // Parse the JSON data
    const tasks = JSON.parse(storedTasks);

    // Recreate each task in the list
    tasks.forEach(function(task) {
        const li = createTaskElement(task.text, task.completed, onComplete, onDelete);
        taskList.appendChild(li);
    });

    return tasks;
}

// Export functions for testing (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTaskElement,
        addTask,
        completeTask,
        deleteTask,
        saveTasks,
        loadTasks
    };
}
