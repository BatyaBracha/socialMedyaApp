const express = require('express');
const dal = require('../DB/dal');
const router = express.Router();

router.get('/:postId', (req, res) => {
    const id = req.params.postId;
    const details = {
        id: id
    }
    dal.getAll('getComments', details)
        .then((results) => {
            console.log(`COMMENT with id ${id} retrieved:`, results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error(`Error retrieving comment with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving comment with id ${id}` });
        });
});

router.get('/:postId/:commentId', (req, res) => {
    const id = req.params.commentId;
    const details = {
        postId: req.params.postId,
        commentId: id
    }
    dal.get('getComment', details)
        .then((results) => {
            console.log(`COMMENT with id ${id} retrieved:`, results);
            res.status(200).json(results[0]);
        })
        .catch((err) => {
            console.error(`Error retrieving comment with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving comment with id ${id}` });
        });
});

router.put('/:postId/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const details = {
        detailsToUpdate: req.body,
        commentId: commentId,
        postId: postId
    }
    dal.update('updateComment', details)
        .then((result) => {
            console.log(`Comment with ID ${commentId} updated successfully`);
            res.status(200).send(result);
        })
        .catch((err) => {
            console.error('Error updating comment:', err);
            res.status(500).json({ error: 'An error occurred while updating the comment' });
        });
});

router.post('/', (req, res) => {
    const details = {
        commentDetails: req.body,
    }
    dal.create('addComment', details)
        .then((result) => {
            console.log("new comment created successfully");
        })
        .catch((err) => {
            console.error('Error creating new comment:', err);
            res.status(500).json({ error: 'An error occurred while creating a new comment' });
        });

    dal.get('getTodoId', details).then((result) => {
        console.log("new comment created successfully");
        res.status(200).send(result[0])
            .catch((err) => {
                console.error('Error creating new Todo:', err);
                res.status(500).json({ error: 'An error occurred while creating a new Todo' });
            });
    })
});

router.delete('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const details = {
        postId: postId,
        commentId: commentId
    }
    dal.delete_('deleteComment', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;