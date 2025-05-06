const Comment = require('../models/commentModel');

// Controller for handling comments
const commentsController = {
    // Get all comments
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    },

    // Get a single comment by ID
    getCommentById: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching comment', error });
        }
    },

    // Create a new comment
    createComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body);
            const savedComment = await newComment.save();
            res.status(201).json(savedComment);
        } catch (error) {
            res.status(400).json({ message: 'Error creating comment', error });
        }
    },

    // Update a comment by ID
    updateComment: async (req, res) => {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(updatedComment);
        } catch (error) {
            res.status(400).json({ message: 'Error updating comment', error });
        }
    },

    // Delete a comment by ID
    deleteComment: async (req, res) => {
        try {
            const deletedComment = await Comment.findByIdAndDelete(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error });
        }
    }
};

module.exports = commentsController;