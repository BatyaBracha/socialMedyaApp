const pool = require('../models/connection');

async function getAllComments() {
    try {
        console.log('Executing query to fetch all comments...');
        const [rows] = await pool.query('SELECT * FROM comments');
        console.log('Query result:', rows);
        return rows;
    } catch (error) {
        console.error('Error in getAllComments in service:', error);
    }
};

async function getCommentsByPostId(postId) {
    const [rows] = await pool.query('SELECT * FROM comments WHERE post_id = ?', [Number(postId)]);
    return rows;
}

async function getCommentById(commentId) {
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [Number(commentId)]);
    return rows[0];
}

async function createComment(postId, name, email, body) {
    const [result] = await pool.query('INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)', [postId, name, email, body]);
    return result.insertId;
}

async function updateComment(commentId, name, email, body) {
    await pool.query('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?', [name, email, body, commentId]);
}

// פונקציה למחוק תגובה
async function deleteComment(commentId) {
    await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPostId
};
