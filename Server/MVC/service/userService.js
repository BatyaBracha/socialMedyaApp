const pool = require('../models/connection');
const { get } = require('../routes/users');

async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM user_info');
    return rows;
}
async function createUser(userId, userName, name, email, phone) {
    const [result] = await pool.query('INSERT INTO user_info (user_id, user_name, name, email, phone) VALUES (?, ?, ?, ?, ?)', [userId, userName, name, email, phone]);
    return result.insertId;
}
async function createUserInPasswordsTable(userName, password) {
    const [result] = await pool.query('INSERT INTO passwords (user_name, password) VALUES (?, ?)', [userName, password]);
    return result.insertId;
}

async function getUserById(userId) {
    const [rows] = await pool.query('SELECT * FROM user_info WHERE user_id = ?', [userId]);
    return rows[0];
}

async function getUserByName(userName) {
    const [rows] = await pool.query('SELECT * FROM user_info WHERE user_name = ?', [userName]);
    return rows[0];
}

async function getUserByNameAndPassword(userName, userPassword) {
    const [rows] = await pool.query('SELECT * FROM passwords WHERE user_name = ? AND password = ?', [userName, userPassword]);
    return rows[0];
}

async function updateUserDetails(userId, name, email, phone) {
    const [result] = await pool.query('UPDATE user_info SET name = ? , email = ?, phone = ? WHERE user_id = ?', [name, email, phone, userId]);

    return result.affectedRows > 0;
}

async function updateUserPassword(password, userId) {
    const [result] = await pool.query('UPDATE passwords SET password = ? WHERE user_id = ?', [password, userId]);
    return result.affectedRows > 0;
}

async function deleteUser(userId) {
    const [result] = await pool.query('DELETE FROM passwords WHERE user_id = ?', [userId]);
    const [result2] = await pool.query('DELETE FROM user_info WHERE user_id = ?', [userId]);
    return result.affectedRows > 0 && result2.affectedRows > 0;
}
module.exports = {
    getAllUsers,
    createUser,
    createUserInPasswordsTable,
    getUserById,
    getUserByName,
    getUserByNameAndPassword,
    updateUserDetails,
    updateUserPassword,
    deleteUser
};
