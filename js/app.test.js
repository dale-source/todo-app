const {
    createTaskElement,
    addTask,
    completeTask,
    deleteTask,
    saveTasks,
    loadTasks
} = require('./todoModule');

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem: function(key) {
        return this.store[key] || null;
    },
    setItem: function(key, value) {
        this.store[key] = value;
    },
    clear: function() {
        this.store = {};
    }
};

describe('Todo App', () => {
    let taskInput;
    let taskList;

    beforeEach(() => {
        // Set up DOM elements before each test
        document.body.innerHTML = `
            <input type="text" id="taskInput">
            <ul id="taskList"></ul>
        `;
        taskInput = document.getElementById('taskInput');
        taskList = document.getElementById('taskList');

        // Clear localStorage mock
        localStorageMock.clear();
    });

    describe('addTask', () => {
        test('adding a task creates a new list item', () => {
            // Set input value
            taskInput.value = 'Buy groceries';

            // Mock callback functions
            const onComplete = jest.fn();
            const onDelete = jest.fn();
            const onSave = jest.fn();

            // Add the task
            const result = addTask(taskInput, taskList, onComplete, onDelete, onSave);

            // Verify task was added
            expect(result).toBe(true);
            expect(taskList.children.length).toBe(1);
            expect(taskList.querySelector('span').textContent).toBe('Buy groceries');
            expect(taskInput.value).toBe('');
            expect(onSave).toHaveBeenCalled();
        });

        test('adding an empty task does nothing', () => {
            // Set empty input value
            taskInput.value = '';

            // Mock callback functions
            const onComplete = jest.fn();
            const onDelete = jest.fn();
            const onSave = jest.fn();

            // Try to add the task
            const result = addTask(taskInput, taskList, onComplete, onDelete, onSave);

            // Verify nothing was added
            expect(result).toBe(false);
            expect(taskList.children.length).toBe(0);
            expect(onSave).not.toHaveBeenCalled();
        });

        test('adding a whitespace-only task does nothing', () => {
            // Set whitespace input value
            taskInput.value = '   ';

            // Mock callback functions
            const onComplete = jest.fn();
            const onDelete = jest.fn();
            const onSave = jest.fn();

            // Try to add the task
            const result = addTask(taskInput, taskList, onComplete, onDelete, onSave);

            // Verify nothing was added
            expect(result).toBe(false);
            expect(taskList.children.length).toBe(0);
            expect(onSave).not.toHaveBeenCalled();
        });
    });

    describe('completeTask', () => {
        test('completing a task toggles the completed class', () => {
            // Create a task element
            const li = createTaskElement('Test task', false, jest.fn(), jest.fn());
            taskList.appendChild(li);

            // Mock the save callback
            const onSave = jest.fn();

            // Create a mock event targeting the complete button
            const completeBtn = li.querySelector('.complete-btn');
            const event = { target: completeBtn };

            // Complete the task
            completeTask(event, onSave);

            // Verify the completed class was added
            expect(li.classList.contains('completed')).toBe(true);
            expect(onSave).toHaveBeenCalled();

            // Toggle again to uncomplete
            completeTask(event, onSave);

            // Verify the completed class was removed
            expect(li.classList.contains('completed')).toBe(false);
        });
    });

    describe('deleteTask', () => {
        test('deleting a task removes it from the list', () => {
            // Create a task element and add it to the list
            const li = createTaskElement('Task to delete', false, jest.fn(), jest.fn());
            taskList.appendChild(li);

            // Verify task exists
            expect(taskList.children.length).toBe(1);

            // Mock the save callback
            const onSave = jest.fn();

            // Create a mock event targeting the delete button
            const deleteBtn = li.querySelector('.delete-btn');
            const event = { target: deleteBtn };

            // Delete the task
            deleteTask(event, onSave);

            // Verify the task was removed
            expect(taskList.children.length).toBe(0);
            expect(onSave).toHaveBeenCalled();
        });
    });

    describe('saveTasks', () => {
        test('saves tasks to localStorage', () => {
            // Add some tasks to the list
            const li1 = createTaskElement('Task 1', false, jest.fn(), jest.fn());
            const li2 = createTaskElement('Task 2', true, jest.fn(), jest.fn());
            taskList.appendChild(li1);
            taskList.appendChild(li2);

            // Save tasks
            saveTasks(taskList, localStorageMock);

            // Verify tasks were saved correctly
            const savedTasks = JSON.parse(localStorageMock.getItem('tasks'));
            expect(savedTasks.length).toBe(2);
            expect(savedTasks[0]).toEqual({ text: 'Task 1', completed: false });
            expect(savedTasks[1]).toEqual({ text: 'Task 2', completed: true });
        });
    });

    describe('loadTasks', () => {
        test('loads tasks from localStorage', () => {
            // Set up mock localStorage with tasks
            const tasks = [
                { text: 'Loaded Task 1', completed: false },
                { text: 'Loaded Task 2', completed: true }
            ];
            localStorageMock.setItem('tasks', JSON.stringify(tasks));

            // Mock callback functions
            const onComplete = jest.fn();
            const onDelete = jest.fn();

            // Load tasks
            const loadedTasks = loadTasks(taskList, localStorageMock, onComplete, onDelete);

            // Verify tasks were loaded
            expect(taskList.children.length).toBe(2);
            expect(loadedTasks.length).toBe(2);

            // Verify first task
            const firstTask = taskList.children[0];
            expect(firstTask.querySelector('span').textContent).toBe('Loaded Task 1');
            expect(firstTask.classList.contains('completed')).toBe(false);

            // Verify second task
            const secondTask = taskList.children[1];
            expect(secondTask.querySelector('span').textContent).toBe('Loaded Task 2');
            expect(secondTask.classList.contains('completed')).toBe(true);
        });

        test('returns empty array when no tasks in localStorage', () => {
            // Mock callback functions
            const onComplete = jest.fn();
            const onDelete = jest.fn();

            // Load tasks from empty storage
            const loadedTasks = loadTasks(taskList, localStorageMock, onComplete, onDelete);

            // Verify no tasks were loaded
            expect(taskList.children.length).toBe(0);
            expect(loadedTasks).toEqual([]);
        });
    });

    describe('createTaskElement', () => {
        test('creates a task element with correct structure', () => {
            const onComplete = jest.fn();
            const onDelete = jest.fn();

            const li = createTaskElement('Test task', false, onComplete, onDelete);

            // Verify structure
            expect(li.tagName).toBe('LI');
            expect(li.querySelector('span').textContent).toBe('Test task');
            expect(li.querySelector('.complete-btn')).toBeTruthy();
            expect(li.querySelector('.delete-btn')).toBeTruthy();
            expect(li.classList.contains('completed')).toBe(false);
        });

        test('creates a completed task element', () => {
            const li = createTaskElement('Completed task', true, jest.fn(), jest.fn());

            expect(li.classList.contains('completed')).toBe(true);
        });
    });
});
