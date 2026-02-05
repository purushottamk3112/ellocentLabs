
const TodoManager = require('./TodoManager.js');

// Test utilities
let testsPassed = 0;
let testsFailed = 0;
function assert(condition, testName) {
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.log(`✗ FAIL: ${testName}`);
    testsFailed++;
  }
}
function assertEquals(actual, expected, testName) {
  const condition = JSON.stringify(actual) === JSON.stringify(expected);
  assert(condition, testName);
  if (!condition) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Actual: ${JSON.stringify(actual)}`);
  }
}
console.log('='.repeat(50));
console.log('Running TodoManager Tests');
console.log('='.repeat(50));
// Test 1: Constructor
console.log('\n📦 Testing Constructor...');
const manager = new TodoManager();
assert(Array.isArray(manager.tasks), 'Should initialize with empty tasks array');
assert(manager.tasks.length === 0, 'Tasks array should be empty initially');
assert(manager.nextId === 1, 'NextId should start at 1');

// Test 2: addTask()
console.log('\n➕ Testing addTask()...');
const task1 = manager.addTask('Buy groceries');
assert(task1.id === 1, 'First task should have id 1');
assertEquals(task1.title, 'Buy groceries', 'Task title should match');
assert(task1.completed === false, 'New task should not be completed');
const task2 = manager.addTask('  Write code  ');
assert(task2.title === 'Write code', 'Should trim whitespace from title');
try {
  manager.addTask('');
  assert(false, 'Should throw error for empty title');
} catch (e) {
  assert(true, 'Should throw error for empty title');
}
try {
  manager.addTask('   ');
  assert(false, 'Should throw error for whitespace-only title');
} catch (e) {
  assert(true, 'Should throw error for whitespace-only title');
}
// Test 3: Unique IDs
console.log('\n🔢 Testing Unique IDs...');
const task3 = manager.addTask('Task 3');
const task4 = manager.addTask('Task 4');
assert(task3.id !== task4.id, 'Each task should have unique ID');
assert(task4.id === 4, 'IDs should increment sequentially');
// Test 4: toggleComplete()
console.log('\n✅ Testing toggleComplete()...');
const toggledTask = manager.toggleComplete(1);
assert(toggledTask !== null, 'Should return task when toggling');
assert(toggledTask.completed === true, 'Should mark task as completed');
const toggledAgain = manager.toggleComplete(1);
assert(toggledAgain.completed === false, 'Should toggle back to incomplete');
const notFound = manager.toggleComplete(999);
assert(notFound === null, 'Should return null for non-existent task');
// Test 5: listCompleted()
console.log('\n📋 Testing listCompleted()...');
manager.toggleComplete(2);
manager.toggleComplete(3);
const completedTasks = manager.listCompleted();
assert(completedTasks.length === 2, 'Should return 2 completed tasks');
assert(completedTasks.every(t => t.completed), 'All returned tasks should be completed');
// Test 6: listPending()
console.log('\n⏳ Testing listPending()...');
const pendingTasks = manager.listPending();
assert(pendingTasks.length === 2, 'Should return 2 pending tasks');
assert(pendingTasks.every(t => !t.completed), 'All returned tasks should be pending');
// Test 7: removeTask()
console.log('\n🗑️  Testing removeTask()...');
const removed = manager.removeTask(2);
assert(removed === true, 'Should return true when task is removed');
assert(manager.tasks.length === 3, 'Should have 3 tasks after removal');
const notRemoved = manager.removeTask(999);
assert(notRemoved === false, 'Should return false when task not found');
// Test 8: getStats()
console.log('\n📊 Testing getStats()...');
const stats = manager.getStats();
assertEquals(stats.total, 3, 'Total should be 3');
assertEquals(stats.completed, 1, 'Completed should be 1');
assertEquals(stats.pending, 2, 'Pending should be 2');
// Test 9: getAllTasks()
console.log('\n📑 Testing getAllTasks()...');
const allTasks = manager.getAllTasks();
assert(allTasks.length === 3, 'Should return all tasks');
assert(allTasks !== manager.tasks, 'Should return a copy, not reference');
// Test 10: getTaskById()
console.log('\n🔍 Testing getTaskById()...');
const foundTask = manager.getTaskById(1);
assert(foundTask !== null, 'Should find existing task');
assertEquals(foundTask.id, 1, 'Should return correct task');
const notFoundTask = manager.getTaskById(999);
assert(notFoundTask === null, 'Should return null for non-existent task');
// Test 11: Complex scenario
console.log('\n🎯 Testing Complex Scenario...');
const complexManager = new TodoManager();
complexManager.addTask('Task A');
complexManager.addTask('Task B');
complexManager.addTask('Task C');
complexManager.toggleComplete(1);
complexManager.toggleComplete(3);
const pending = complexManager.listPending();
const completed = complexManager.listCompleted();
assert(pending.length === 1, 'Should have 1 pending task');
assert(completed.length === 2, 'Should have 2 completed tasks');
assertEquals(pending[0].title, 'Task B', 'Pending task should be Task B');
// Final Results
console.log('\n' + '='.repeat(50));
console.log('Test Results:');
console.log('='.repeat(50));
console.log(`✓ Passed: ${testsPassed}`);
console.log(`✗ Failed: ${testsFailed}`);
console.log(`Total: ${testsPassed + testsFailed}`);
console.log('='.repeat(50));
if (testsFailed === 0) {
  console.log('\n🎉 All tests passed! Great job!');
} else {
  console.log('\n⚠️  Some tests failed. Please review the code.');
}
