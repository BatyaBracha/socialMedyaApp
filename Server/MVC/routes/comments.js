const express = require('express');

const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);

// Route to update a comment by ID
router.put('/:id', commentsController.updateComment);

// Route to delete a comment by ID
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
