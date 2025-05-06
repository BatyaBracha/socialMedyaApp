const pool = require('../models/connection');

async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM user_info');
    return rows;
}

async function createUser(userName, password) {
    const [result] = await pool.query('INSERT INTO passwords (user_name, password) VALUES (?, ?)', [userName, password]);
    return result.insertId;
}

async function getUserById(userId) {
    const [rows] = await pool.query('SELECT * FROM user_info WHERE user_id = ?', [userId]);
    return rows[0];
}

async function getUserByName(userName) {
    const [rows] = await pool.query('SELECT * FROM passwords WHERE user_name = ?', [userName]);
    return rows[0];
}

async function getUserByNameAndPassword(userName, userPassword) {
    const [rows] = await pool.query('SELECT * FROM passwords WHERE user_name = ? AND password = ?', [userName, userPassword]);
    return rows[0];
}

async function updateUser(userId, userName, password) {
    const [result] = await pool.query('UPDATE passwords SET user_name = ?, password = ? WHERE user_id = ?', [userName, password, userId]);
    return result.affectedRows > 0;
}

async function deleteUser(userId) {
    const [result] = await pool.query('DELETE FROM passwords WHERE user_id = ?', [userId]);
    return result.affectedRows > 0;
}
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByName,
    getUserByNameAndPassword,
    updateUser,
    deleteUser
};
