const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const fs = require('fs');
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Database setup
const db = new sqlite3.Database('./data/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database.');
        db.run(
            `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0
      )`,
            (err) => {
                if (err) {
                    console.error('Error creating table', err);
                }
            }
        );
    }
});

// API Routes

// Get all todos
app.get('/api/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Convert completed (0/1) to boolean for frontend convenience
        const todos = rows.map(row => ({
            ...row,
            completed: !!row.completed
        }));
        res.json(todos);
    });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }

    db.run('INSERT INTO todos (text, completed) VALUES (?, ?)', [text, 0], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, text, completed: false });
    });
});

// Toggle todo completion status
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json({ message: 'Todo updated successfully' });
    });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM todos WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json({ message: 'Todo deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
