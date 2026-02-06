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
    li.textContent = taskText;

    // Add the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
}

// Add click event listener to the Add button
addBtn.addEventListener('click', addTask);

// Add keypress event listener to input field for Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
