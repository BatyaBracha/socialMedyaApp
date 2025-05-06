const mysql = require('mysql2');
const tables = require('./tables_definition');

const connection = mysql.createConnection({
    user: 'root',
    password: 'aA1795aA',
    database: 'project',
    port: '3306'
});


connection.query(tables.passwords, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('passwords table created successfully');
    }
});

connection.query(tables.user_info, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('user_info table created successfully');
    }
});

connection.query(tables.user_todos, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('user_todos table created successfully');
    }
});

connection.query(tables.user_posts, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('user_posts table created successfully');
    }
});

connection.query(tables.comments, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('comments table created successfully');
    }
});


connection.end();