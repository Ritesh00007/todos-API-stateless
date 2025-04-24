// database.js
// SQLite database setup and operations
const sqlite3 = require('better-sqlite3');
const path = require('path');

// Create a new database connection
const db = sqlite3(path.join(__dirname, 'todos.db'));

// Initialize the database
function initializeDatabase() {
  // Create the todos table if it doesn't exist
  const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      priority TEXT DEFAULT 'low',
      isComplete INTEGER DEFAULT 0,
      isFun INTEGER DEFAULT 1
    )
  `);
  createTable.run();
  
  // Check if the table is empty, add a default todo if needed
  const count = db.prepare('SELECT COUNT(*) as count FROM todos').get();
  if (count.count === 0) {
    const insertDefault = db.prepare(`
      INSERT INTO todos (name, priority, isComplete, isFun)
      VALUES ('nina', 'high', 0, 0)
    `);
    insertDefault.run();
  }
}

// Get all todos
function getAllTodos() {
  const stmt = db.prepare('SELECT * FROM todos');
  const todos = stmt.all();
  
  // Convert SQLite integer values to JavaScript booleans
  return todos.map(todo => ({
    id: todo.id,
    name: todo.name,
    priority: todo.priority,
    isComplete: todo.isComplete === 1,
    isFun: todo.isFun === 1
  }));
}

// Get a specific todo by ID
function getTodoById(id) {
  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
  const todo = stmt.get(id);
  
  if (!todo) return null;
  
  // Convert SQLite integer values to JavaScript booleans
  return {
    id: todo.id,
    name: todo.name,
    priority: todo.priority,
    isComplete: todo.isComplete === 1,
    isFun: todo.isFun === 1
  };
}

// Create a new todo
function createTodo(todoData) {
  // Convert JavaScript boolean values to SQLite integers
  const isComplete = todoData.isComplete ? 1 : 0;
  const isFun = todoData.isFun === 'true' ? 1 : 0;
  
  const stmt = db.prepare(`
    INSERT INTO todos (name, priority, isComplete, isFun)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    todoData.name,
    todoData.priority || 'low',
    isComplete,
    isFun
  );
  
  // Get the newly created todo
  return getTodoById(result.lastInsertRowid);
}

// Delete a todo by ID
function deleteTodo(id) {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// Initialize the database when the module loads
initializeDatabase();

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  deleteTodo
};