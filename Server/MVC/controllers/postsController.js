const Post = require('../service/postService'); // Assuming you have a Post model defined in services/postService.js

// Controller for handling posts
const postsController = {
    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    },

    // Get a single post by ID
    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error });
        }
    },

    // Create a new post
    createPost: async (req, res) => {
        try {
            const newPost = new Post(req.body);
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    },

    // Update a post by ID
    updatePost: async (req, res) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error });
        }
    },

    // Delete a post by ID
    deletePost: async (req, res) => {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error });
        }
    },
};

module.exports = postsController;