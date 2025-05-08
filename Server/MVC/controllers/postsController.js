const postService = require('../service/postService'); // Assuming you have a Post model defined in services/postService.js

// Controller for handling posts

    // Get all posts
   async function getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(posts);            
        } catch (error) {
            console.error('Error fetching posts:', error.stack || error.message || error);
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    }

    // Get a single post by ID
    async function getPostById(req, res)  {
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

    // Create a new post
    async function createPost(req, res) {
        try {
            const { title, body, userId } = req.body;
            const insertId = await postService.createPost(title, body, userId);
            res.status(201).json({ message: 'Post created', id: insertId });
        } catch (error) {
            console.error('Error creating post:', error.message);
            res.status(500).json({ message: 'Error creating post', error });
        }
    }
    
    // Update a post by ID
    async function updatePost(req, res) {
        try {
            const postId = req.params.id;
            const { title, body } = req.body;
    
            await postService.updatePost(postId, title, body);
    
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error });
        }
    }

    // Delete a post by ID
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
    getPostById,
    createPost,
    updatePost,
    deletePost,
};