const Post = require('../service/postService'); // Assuming you have a Post model defined in services/postService.js

// Controller for handling posts

    // Get all posts
   async function getAllPosts(req, res) {
        try {
            console.log("post controller")
            const posts = await Post.getAllPosts();
            res.status(200).json(posts);
            console.log("success post controller");
            
        } catch (error) {
            console.error('Error fetching posts:', error.stack || error.message || error);
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    }

    // Get a single post by ID
    async function getPostById(req, res)  {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error });
        }
    }

    // Create a new post
    async function createPost(req, res)  {
        try {
            const newPost = new Post(req.body);
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    }

    // Update a post by ID
    async function updatePost(req, res)  {
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
    }

    // Delete a post by ID
    async function deletePost(req, res) {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
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