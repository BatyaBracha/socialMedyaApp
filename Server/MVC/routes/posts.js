const express = require('express');

const router = express.Router();

const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts);

router.get('/userId/:userId',postsController.getUserPosts)

router.get('/:id', postsController.getPostById);

router.post('/', postsController.createPost);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;


// const express = require('express');
// const commentsRouter = require('./comments');
// const router = express.Router();

// router.use('/:postId/comments', commentsRouter);

// router.get('/', );

// router.get('/:userID',);

// router.get('/:userId/:postId',);

// router.put('/:userId/:postId',);

// router.post('/',);

// router.delete('/:userId/:postId',);

// module.exports = router;



