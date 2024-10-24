// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '2631', 
    database: 'studentDB'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + db.threadId);
});

// POST route to handle form submission
app.post('/api/studentsdata', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    const query = 'INSERT INTO studentsdata (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    
    db.query(query, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Student data successfully submitted', id: result.insertId });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// GET route to handle display all data 
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM studentsdata', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// PUT route to handle form update and edit
app.put('/api/studentsEdit/:id', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  db.query('UPDATE studentsdata SET firstName=?, lastName=?, email=?, password=? where id= ?',[firstName,lastName,email,password,req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});
app.get('/api/students/:id', (req, res) => {
  db.query('SELECT * FROM studentsdata where id= ?',[req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});



//DELETE route to handle form deletion
app.delete('/api/studentDelete/:id', (req, res) => {
  db.query('DELETE FROM studentsdata where id= ?',[req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

