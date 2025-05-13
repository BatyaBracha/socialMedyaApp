const pool = require('../models/connection'); 

const getAllPosts = async () => {
    console.log("post service");

    const [rows] = await pool.query('SELECT * FROM user_posts');
    return rows;
};

const getUserPosts = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM user_posts WHERE user_id = ?', [userId]);
    return rows;
}

const getPostById = async (postId) => {
    const [rows] = await pool.query('SELECT * FROM user_posts WHERE id = ?', [Number(postId)]);
    return rows[0];
};

const createPost = async (title, body, userId) => {
    const [result] = await pool.query('INSERT INTO user_posts (title, body, user_id) VALUES (?, ?, ?)', [title, body, userId]);
    return result.insertId; // מחזירים את ה-ID של הפוסט החדש
};

const updatePost = async (postId, title, body) => {
    await pool.query('UPDATE user_posts SET title = ?, body = ? WHERE id = ?', [title, body, postId]);
};

const deletePost = async (postId) => {
    const [result] = await pool.query('DELETE FROM user_posts WHERE id = ?', [postId]);
    return result.affectedRows > 0;
};

module.exports = {
    getAllPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
