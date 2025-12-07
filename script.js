// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the required DOM elements using their IDs
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks. Each task is an object: { id: string, text: string }
    let tasks = [];

    // Save the current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create the DOM <li> element for a task object and append it to the taskList
    function createTaskElement(taskObj) {
        const li = document.createElement('li');
        li.textContent = taskObj.text;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When clicked, remove the element from DOM and remove from tasks array & localStorage
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from tasks array by id
            tasks = tasks.filter(t => t.id !== taskObj.id);
            // Save updated tasks array
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Load tasks from Local Storage and populate the DOM
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Ensure tasks becomes the stored array (each item should be {id, text})
        tasks = Array.isArray(stored) ? stored : [];
        // Populate DOM
        tasks.forEach(taskObj => createTaskElement(taskObj));
    }

    /**
     * Add a new task.
     * If taskText is null, read from taskInput (so old calls addTask() still work).
     * If save === true, the task is added to tasks array and Local Storage is updated.
     *
     * @param {string|null} taskText - text for the task, or null to read from input
     * @param {boolean} save - whether to persist the task to localStorage (default true)
     */
    function addTask(taskText = null, save = true) {
        // If no taskText passed, read (and trim) from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            // If a string argument was passed, trim it as well
            taskText = String(taskText).trim();
        }

        // If the input is empty, show an alert and stop the function
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new task object with a unique id
        const taskObj = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            text: taskText
        };

        // Append to DOM
        createTaskElement(taskObj);

        // If we should save, push to tasks array and persist
        if (save) {
            tasks.push(taskObj);
            saveTasks();
        }

        // Clear the input field after adding the task (only when input was used)
        if (taskInput.value) {
            taskInput.value = "";
        }
    }

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', () => addTask());

    // Add task when the user presses the Enter key in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load any existing tasks from Local Storage on page load
    loadTasks();

});
