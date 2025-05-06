const mysql = require('mysql2');
console.log("1");
const connection = mysql.createConnection({
    user: 'root',
    password: 'BatyaOren20',
    port: '3306',
    database: 'project'

});

//create db
connection.query('CREATE DATABASE IF NOT EXISTS  project', (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database created successfully');
        
    }
});
// connection.query(`CREATE TABLE IF NOT EXISTS passwordss (
//     id  INT         NOT NULL AUTO_INCREMENT,
//     user_name VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     PRIMARY KEY (id)

//   );`, (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('Database created successfully');
//     }
// })

connection.end();


