// Function to get tasks from local storage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save a task to local storage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to toggle the completion status of a task
function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const tasks = getTasks();
    const newText = prompt('Edit Task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to clear all tasks
function clearAll() {
    localStorage.removeItem('tasks');
    displayTasks();
}

// Function to filter tasks based on completion status
function filterTasks() {
    const filter = document.getElementById('filter').value;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach((task, index) => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        }
    });
}

// Function to display tasks
function displayTasks() {
    const tasksAmount = document.getElementById("tasksAmount");
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <input type="checkbox" class="check" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    //     if(tasks.length ==0){
    //     tasksAmount.innerHTML = `You have 0 tasks left`;
    //     }
    //     tasksAmount.innerHTML = `You have ${tasks.length} tasks left`;
    // console.log(tasks.length);

    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = { text: taskText, completed: false };
        saveTask(task);
        taskInput.value = '';
        displayTasks(); // Directly call displayTasks to update the UI
    }
}

// This line sets up an event listener that calls displayTasks when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});

