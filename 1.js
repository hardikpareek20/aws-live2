const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const bucket='addquestions';
const region='us-east-1'
// Setup MySQL connection (replace with your Amazon RDS credentials)
const connection = mysql.createConnection({
    host: 'doubtsonli1.cve6yks4o9bq.us-east-1.rds.amazonaws.com', // Correct endpoint
    user: 'admin',
    password: 'keshu2064',
    database: 'employee',
    port: 3306
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    // Insert form data into MySQL database
    const query = 'INSERT INTO EMPLOYEE (username, password) VALUES (?, ?)';
    connection.query(query, [username, email], (err, result) => {
        if (err) {
            return res.status(500).send('Error saving data to the database.');
        }
        res.send('Data saved successfully!');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
