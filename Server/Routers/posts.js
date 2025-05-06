const express = require('express');
const commentsRouter = require('./comments');
const dal = require('../DB/dal');
const router = express.Router();

router.use('/:postId/comments', commentsRouter);

router.get('/', async (req, res) => {
    dal.getAll('getAllPosts')
        .then((results) => {
            console.log("All POSTS retrieved:", results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error("Error retrieving all POSTS:", err);
            res.status(404).json({ error: "An error occurred while retrieving POSTS" });
        });
});

router.get('/:userID', async (req, res) => {
    const details = {
        userID: req.params.userID
    }
    dal.getAll('getAllMyPosts', details)
        .then((results) => {
            console.log("All MY POSTS retrieved:", results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error("Error retrieving all MY POSTS:", err);
            res.status(404).json({ error: "An error occurred while retrieving POSTS" });
        });
});

router.get('/:userId/:postId', async (req, res) => {
    const details = {
        id: req.params.postId,
        userID: req.params.userId
    }
    dal.get('getPost', details)
        .then((results) => {
            console.log(`TODO with id ${req.params.postId} retrieved:`, results);
            res.status(200).json(results[0]);
        })
        .catch((err) => {
            console.error(`Error retrieving todo with id ${req.params.postId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving todo with id ${id}` });
        });
});

router.put('/:userId/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const details = {
        detailsToUpdate: req.body,
        id: postId,
        user_id: userId
    }
    dal.update('updatePost', details)
        .then((results) => {
            console.log(`Post with ID ${postId} updated successfully`);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error('Error updating post:', err);
            res.status(500).json({ error: 'An error occurred while updating the post' });
        });
});

router.post('/', (req, res) => {
    const details = {
        newPostDetails: req.body
    }
    dal.create('addPost', details)
        .then((result) => {
            console.log("new post created successfully");
        })
        .catch((err) => {
            console.error('Error creating new Post:', err);
            res.status(500).json({ error: 'An error occurred while creating a new Post' });
        });
    dal.get('getTodoId', details).then((result) => {
        console.log("new post created successfully");
        res.status(200).send(result[0])
            .catch((err) => {
                console.error('Error creating new Todo:', err);
                res.status(500).json({ error: 'An error occurred while creating a new Todo' });
            });
        })
    });

    router.delete('/:userId/:postId', (req, res) => {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const details = {
            id: postId,
            userID: userId
        }
        dal.delete_('deletePost', details)
            .then((result) => {
                dal.delete_('deleteCommentsOfPost', details)
                    .then((result) => {
                        res.status(200).send(result);
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });

    });

    module.exports = router;