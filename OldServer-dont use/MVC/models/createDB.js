const mysql = require('mysql2');
console.log("1");

const connection = mysql.createConnection({
    user: 'root',
    password: 'BatyaOren20',
    port: '3306'
});

// Create database
connection.query('CREATE DATABASE IF NOT EXISTS project', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database created successfully');
    }
});

connection.end();