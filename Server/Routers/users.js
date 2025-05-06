const express = require('express');
const todosRouter = require('./todos');
const postsRouter = require('./posts');
const dal = require('../DB/dal');

const router = express.Router();

router.use('/:userId/todos', todosRouter);
router.use('/:userId/posts', postsRouter);

router.get('/', async (req, res) => {
    try {
      const users = await dal.getAll('users', {});
      res.status(200).json(users);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
router.get('/:userName/:userPassword', (req, res) => {
    console.log("hi");

    const details = {
        userName: req.params.userName,
        userPassword: req.params.userPassword
    }
    dal.get('userPassword', details)
        .then((results) => {
            console.log("200",results);
            res.status(200).send(results)
        })
        .catch((err) => {
            console.error("error");
            res.status(404).json({ error: `An error occurred while retrieving user with id` });
        });
});

router.get('/:userID', (req, res) => {
    const details = {
        userID: req.params.userID
    }
    dal.get('users', details)
        .then((results) => {  
          console.log(results);
            res.status(200).send(results)
        })
        .catch((err) => {
            console.error(`Error retrieving user with id ${id}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving user with id ${id}` });
        });
});

module.exports = router;