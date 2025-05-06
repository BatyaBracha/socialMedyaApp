const db = require('../Models/db');

// פונקציה לקבל את כל התגובות
const getAllComments = async () => {
    const [rows] = await db.execute('SELECT * FROM comments');
    return rows;
};

// פונקציה לקבל תגובה לפי ID
const getCommentById = async (commentId) => {
    const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [commentId]);
    return rows[0];
};

// פונקציה להוסיף תגובה חדשה
const createComment = async (postId, name, email, body) => {
    const [result] = await db.execute('INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)', [postId, name, email, body]);
    return result.insertId;
};

// פונקציה לעדכן תגובה
const updateComment = async (commentId, name, email, body) => {
    await db.execute('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?', [name, email, body, commentId]);
};

// פונקציה למחוק תגובה
const deleteComment = async (commentId) => {
    await db.execute('DELETE FROM comments WHERE id = ?', [commentId]);
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
