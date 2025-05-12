const pool = require('../models/connection');

// פונקציה לקבל את כל ה-todos
const getAllTodos = async () => {
    console.log("todo service");
    const [rows] = await pool.query('SELECT * FROM user_todos');
    return rows;
};
const getTodosByUserId = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM user_todos WHERE user_id = ?', [userId]);
    return rows;
};
// פונקציה לקבל todo לפי ID
const getTodoById = async (todoId) => {
    const [rows] = await pool.query('SELECT * FROM user_todos WHERE id = ?', [todoId]);
    return rows[0];
};

// פונקציה להוסיף todo חדש
const createTodo = async (userId, title, completed) => {
    const [result] = await pool.query(
        'INSERT INTO user_todos (user_id, title, complete) VALUES (?, ?, ?)',
        [userId, title, completed]
    );
    return result.insertId;
};

// פונקציה לעדכן todo
const updateTodo = async (todoId, title, complete) => {
    await pool.query('UPDATE user_todos SET title = ?, complete = ? WHERE id = ?', [title, complete, todoId]);
};

// פונקציה למחוק todo
const deleteTodo = async (todoId) => {
    const [result] = await pool.query('DELETE FROM user_todos WHERE id = ?', [todoId]);
    return result.affectedRows > 0; // true אם נמחק משהו, false אם לא
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId
};
