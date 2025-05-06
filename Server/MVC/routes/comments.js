const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// Route to get all comments
router.get('/', commentsController.getAllComments);

// Route to get a specific comment by ID
router.get('/:id', commentsController.getCommentById);

// Route to create a new comment
router.post('/', commentsController.createComment);

// Route to update a comment by ID
router.put('/:id', commentsController.updateComment);

// Route to delete a comment by ID
router.delete('/:id', commentsController.deleteComment);

module.exports = router;

const express = require('express');
// const router = express.Router();

// router.get('/:postId', );

// router.get('/:postId/:commentId', );

// router.put('/:postId/:commentId',);

// router.post('/', );

// router.delete('/:postId/:commentId',);

// module.exports = router;