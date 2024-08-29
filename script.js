// script.js

// Function to render tasks from localStorage
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Mark the task as completed if it is
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add event listener for task completion
        li.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
}

// Set up event listeners
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Render tasks on page load
window.addEventListener('load', renderTasks);
