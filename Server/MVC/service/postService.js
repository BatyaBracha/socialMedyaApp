const db = require('../models/connection'); // כאן אנחנו מייבאים את מודול החיבור לדאטה

// פונקציה לקבל את כל הפוסטים
const getAllPosts = async () => {
    const [rows] = await db.execute('SELECT * FROM user_posts');
    return rows;
};

// פונקציה לקבל פוסט לפי ID
const getPostById = async (postId) => {
    const [rows] = await db.execute('SELECT * FROM user_posts WHERE id = ?', [postId]);
    return rows[0];
};

// פונקציה להוסיף פוסט חדש
const createPost = async (title, body, userId) => {
    const [result] = await db.execute('INSERT INTO user_posts (title, body, user_id) VALUES (?, ?, ?)', [title, body, userId]);
    return result.insertId; // מחזירים את ה-ID של הפוסט החדש
};

// פונקציה לעדכן פוסט
const updatePost = async (postId, title, body) => {
    await db.execute('UPDATE user_posts SET title = ?, body = ? WHERE id = ?', [title, body, postId]);
};

// פונקציה למחוק פוסט
const deletePost = async (postId) => {
    await db.execute('DELETE FROM user_posts WHERE id = ?', [postId]);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
