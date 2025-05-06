const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// קבלת כל הפוסטים
router.get('/', postsController.getAllPosts);

// קבלת פוסט לפי ID
router.get('/:id', postsController.getPostById);

// יצירת פוסט חדש
router.post('/', postsController.createPost);

// עדכון פוסט
router.put('/:id', postsController.updatePost);

// מחיקת פוסט
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



