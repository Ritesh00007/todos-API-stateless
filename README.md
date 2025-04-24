# Todo API with SQLite Database

This is a simple Node.js + Express.js project that creates a RESTful API for managing a Todo list. The backend uses a SQLite database for persistent storage of todo items, and the frontend is a static HTML page that interacts with the backend using the Fetch API.

## Features

* View all todos (GET /todos)
* View a specific todo by ID (GET /todos/:id)
* Add new todos (POST /todos)
* Delete todos (DELETE /todos/:id)

Each todo item is an object with the following shape:

```json
{
  "id": 1,
  "name": "Sample todo",
  "priority": "high",
  "isComplete": false,
  "isFun": true
}
```

## Project Structure

```
Todo-API-SQLite 
  ├─ package.json
  ├─ server.js
  ├─ database.js  
  ├─ public/  
  │  ├─ index.html 
  │  ├─ script.js 
  │  └─ style.css
  ├─ README.md 
  └─ .gitignore 
```

## Technologies Used

* Node.js with Express.js for the backend API
* SQLite for data persistence
* HTML, CSS, and JavaScript for the frontend
* Styled using Flexbox
* Buttons with distinct colors

## How to Run Locally

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Open `http://localhost:3000` in your browser

## Deployment

This project is deployed on Glitch at - https://sly-future-flyaway.glitch.me/.

## Database Schema

The SQLite database consists of one table:

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  priority TEXT DEFAULT 'low',
  isComplete INTEGER DEFAULT 0,
  isFun INTEGER DEFAULT 1
)
```

Note that in SQLite, boolean values are stored as integers (0 for false, 1 for true).
