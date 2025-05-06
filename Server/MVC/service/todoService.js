const db = require('../Models/db');

// פונקציה לקבל את כל ה-todos
const getAllTodos = async () => {
    const [rows] = await db.execute('SELECT * FROM user_todos');
    return rows;
};

// פונקציה לקבל todo לפי ID
const getTodoById = async (todoId) => {
    const [rows] = await db.execute('SELECT * FROM user_todos WHERE id = ?', [todoId]);
    return rows[0];
};

// פונקציה להוסיף todo חדש
const createTodo = async (userId, title, complete) => {
    const [result] = await db.execute('INSERT INTO user_todos (user_id, title, complete) VALUES (?, ?, ?)', [userId, title, complete]);
    return result.insertId;
};

// פונקציה לעדכן todo
const updateTodo = async (todoId, title, complete) => {
    await db.execute('UPDATE user_todos SET title = ?, complete = ? WHERE id = ?', [title, complete, todoId]);
};

// פונקציה למחוק todo
const deleteTodo = async (todoId) => {
    await db.execute('DELETE FROM user_todos WHERE id = ?', [todoId]);
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
