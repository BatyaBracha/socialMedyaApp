const mysql = require('mysql2');
const crudQuery = require('./crudQuerys');
const arrDetailsToQuery = require('./getDetailsArrToQuery');

const connection = mysql.createConnection({
    user: 'root',
    password: 'BatyaOren20',
    database: 'project',
    port: '3306'
});

// Create
function create(type, details) {
    const sql = crudQuery.createQuery(type);
    console.log(sql)

    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    console.log(arr);
    return new Promise((resolve, reject) => {
        connection.query(sql, arr
            , (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("sql",sql,"result".result)
                    resolve(result);
                }
            });
    });
}

// Read
const getAll = (type, details) => {
    const sql = crudQuery.getAllQuery(type, details);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    return new Promise((resolve, reject) => {
        connection.query(sql, arr, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const get = (type, details) => {
    const sql = crudQuery.getQuery(type);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    return new Promise((resolve, reject) => {
        connection.query(sql, arr, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(result,"aa");
                resolve(result);
            }
        });
    });
};

// Update
const update = (type, details) => {
    const sql = crudQuery.updateQuery(type);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    return new Promise((resolve, reject) => {
        connection.query(sql, arr
            , (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

// Delete
const delete_ = (type, details) => {
    const sql = crudQuery.deleteQuery(type);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    return new Promise((resolve, reject) => {
        connection.query(sql, arr, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const crudFunctions = {
    create,
    getAll,
    get,
    update,
    delete_,
};

module.exports = crudFunctions;
