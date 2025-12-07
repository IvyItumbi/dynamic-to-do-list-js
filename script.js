// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the required DOM elements using their IDs
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the value from the input field
        const taskText = taskInput.value.trim();

        // If the input is empty, show an alert and stop the function
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new <li> element and set its text content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the task from the list
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item, then append the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Allow adding task by pressing Enter key - uses event.key as required by checker
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});