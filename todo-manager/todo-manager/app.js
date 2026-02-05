// Initialize TodoManager
const todoManager = new TodoManager();
// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const consoleDiv = document.getElementById('console');
const clearConsoleBtn = document.getElementById('clearConsole');
const filterBtns = document.querySelectorAll('.filter-btn');
// Stats elements
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
// Current filter state
let currentFilter = 'all';
function logToConsole(message, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `console-entry ${type}`;
  const timestamp = new Date().toLocaleTimeString();
  entry.textContent = `[${timestamp}] ${message}`;
  consoleDiv.appendChild(entry);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
function updateStats() {
  const stats = todoManager.getStats();
  totalCount.textContent = stats.total;
  pendingCount.textContent = stats.pending;
  completedCount.textContent = stats.completed;
}
function renderTasks() {
  let tasks;
  switch(currentFilter) {
    case 'completed':
      tasks = todoManager.listCompleted();
      break;
    case 'pending':
      tasks = todoManager.listPending();
      break;
    default:
      tasks = todoManager.getAllTasks();
  }
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    emptyState.style.display = 'block';
    taskList.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    taskList.style.display = 'block';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.dataset.id = task.id;
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          data-id="${task.id}"
        >
        <span class="task-id">#${task.id}</span>
        <span class="task-title">${escapeHtml(task.title)}</span>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
      `;

      taskList.appendChild(li);
    });
  }
  updateStats();
}
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
function addTask() {
  const title = taskInput.value.trim();
  if (!title) {
    logToConsole('Error: Task title cannot be empty', 'error');
    return;
  }
  try {
    const newTask = todoManager.addTask(title);
    logToConsole(`✓ Task added: "${newTask.title}" (ID: ${newTask.id})`, 'success');
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
  } catch (error) {
    logToConsole(`Error: ${error.message}`, 'error');
  }
}
function toggleTask(id) {
  const task = todoManager.toggleComplete(id);
  if (task) {
    const status = task.completed ? 'completed' : 'pending';
    logToConsole(`✓ Task #${id} marked as ${status}`, 'success');
    renderTasks();
  } else {
    logToConsole(`Error: Task #${id} not found`, 'error');
  }
}
function removeTask(id) {
  const task = todoManager.getTaskById(id);
  
  if (task) {
    const removed = todoManager.removeTask(id);
    if (removed) {
      logToConsole(`✓ Task deleted: "${task.title}" (ID: ${id})`, 'success');
      renderTasks();
    }
  } else {
    logToConsole(`Error: Task #${id} not found`, 'error');
  }
}
function setFilter(filter) {
  currentFilter = filter;
  
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });
  logToConsole(`Filter changed to: ${filter}`, 'info');
  renderTasks();
}
// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const id = parseInt(e.target.dataset.id);
    toggleTask(id);
  } else if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.dataset.id);
    removeTask(id);
  }
});
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});

clearConsoleBtn.addEventListener('click', () => {
  consoleDiv.innerHTML = '';
  logToConsole('Console cleared', 'info');
});
// Initialize app
logToConsole('Todo Manager initialized successfully!', 'success');
logToConsole('Ready to manage your tasks 🚀', 'info');
renderTasks();
