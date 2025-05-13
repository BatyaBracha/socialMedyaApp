const commentService = require('../service/commentService');


    // Get all comments
    async function getAllComments(req, res) {
        try {
            const { postId } = req.query;
            let comments;
            if (postId) {
                console.log('Getting comments for postId:', postId); // ⬅️ הוספה חשובה
                comments = await commentService.getCommentsByPostId(postId);
            } else {
                console.log('No postId provided'); // ⬅️ הוספה חשובה
                comments = await commentService.getAllComments();
            }
            res.json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error.stack || error.message || error);
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    }

 
    // Get a single comment by ID
    async function getCommentById(req, res) {
        try {
            const comment = await commentService.getCommentById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(comment);
        } catch (error) {
            console.error('Error fetching comments:', error.stack || error.message || error);
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    }

    // Create a new comment
    async function createComment (req, res){
        try {
           const { postId, name = '', email, body } = req.body;
            if (!postId || !email || !body) {
                return res.status(400).json({ message: 'Missing fields in request body' });
            }
            const newCommentId = await commentService.createComment(postId, name, email, body);
            res.status(201).json({ id: newCommentId, postId, name, email, body });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(400).json({ message: 'Error creating comment', error: error.message });
        }
    }

    // Update a comment by ID
    async function updateComment(req, res) {
        try {
            const { name, email, body } = req.body;
            const id = req.params.id;
            await commentService.updateComment(id, name, email, body);
            const updatedComment = await commentService.getCommentById(id); // ⬅️ הוספה
            res.status(200).json(updatedComment); // ⬅️ מחזיר את האובייקט המעודכן
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(400).json({ message: 'Error updating comment', error: error.message });
        }
    }

    // Delete a comment by ID
    async function deleteComment(req, res) {
        try {
            await commentService.deleteComment(req.params.id);
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Error deleting comment', error: error.message });
        }
    }


    module.exports = {
        getAllComments,
        getCommentById,
        createComment,
        updateComment,
        deleteComment
    };
    