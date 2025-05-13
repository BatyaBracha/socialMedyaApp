const postService = require('../service/postService'); 

async function getAllPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.stack || error.message || error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
}

async function getUserPosts(req, res) {
    try {
        const posts = await postService.getUserPosts(req.params.userId);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.stack || error.message || error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
}

async function getPostById(req, res) {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
}

async function createPost(req, res) {
    try {
        const { title, body, userId } = req.body;
        const insertId = await postService.createPost(title, body, userId);
        const newPost = { id: insertId, title, body, userId }; // צור אובייקט פוסט מלא
        res.status(201).json(newPost); // החזר אותו
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Error creating post', error });
    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const { title, body } = req.body;
        await postService.updatePost(postId, title, body);
        const updatedPost = await postService.getPostById(postId);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
}

async function deletePost(req, res) {
    try {
        const deletedPost = await postService.deletePost(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
}

module.exports = {
    getAllPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};