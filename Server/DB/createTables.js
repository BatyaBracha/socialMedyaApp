// אחראי על יצירת הטבלאות בדאטהבייס בלבד, פעם אחת בלבד בפרויקט
const mysql = require('mysql2');
const tables = require('../MVC/models/tables_definition');

const connection = mysql.createConnection({
    user: 'root',
    password: 'BatyaOren20',
    database: 'project',
    port: '3306'
});

Object.entries(tables).forEach(([name, query]) => {
    connection.query(query, (err) => {
        if (err) {
            console.log(`Error creating ${name}:`, err);
        } else {
            console.log(`${name} table created successfully`);
        }
    });
});

connection.end();
