
class TodoManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }

    const newTask = {
      id: this.nextId++,
      title: title.trim(),
      completed: false
    };

    this.tasks.push(newTask);
    return newTask;
  }

  removeTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength;
  }

  toggleComplete(id) {
    const task = this.tasks.find(task => task.id === id);
    
    if (task) {
      task.completed = !task.completed;
      return task;
    }
    
    return null;
  }

  listCompleted() {
    return this.tasks.filter(task => task.completed);
  }

  listPending() {
    return this.tasks.filter(task => !task.completed);
  }

  getAllTasks() {
    return [...this.tasks];
  }

  getTaskById(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  getStats() {
    return {
      total: this.tasks.length,
      completed: this.listCompleted().length,
      pending: this.listPending().length
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TodoManager;
}