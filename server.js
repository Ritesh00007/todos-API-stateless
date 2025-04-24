// server.js
// A simple Express.js backend for a Todo list API with SQLite database
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Import database operations
const db = require('./database');

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to include static content
app.use(express.static('public'));

// Server index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all todo items
app.get('/todos', (req, res) => {
  const todos = db.getAllTodos();
  res.json(todos);
});

// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = db.getTodoById(id);
  
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// POST a new todo item
app.post('/todos', (req, res) => {
  const { name, priority = 'low', isFun } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  
  const newTodo = db.createTodo({
    name,
    priority,
    isComplete: false,
    isFun
  });
  
  res.status(201).json(newTodo);
});

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = db.deleteTodo(id);
  
  if (deleted) {
    res.json({ message: `Todo item ${id} deleted.` });
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Todo API server running at http://localhost:${port}`);
});