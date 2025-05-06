const express = require('express');
const dal = require('../DB/dal');
const router = express.Router();

router.get('/:userID', async (req, res) => {
    const details = {
        userID: req.params.userID
    }
    dal.getAll('getAllTodos', details)
        .then((results) => {
            console.log("All TODOS retrieved:", results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error("Error retrieving all TODOS:", err);
            res.status(404).json({ error: "An error occurred while retrieving TODOS" });
        });
});

router.get('/:userId/:todoId', async (req, res) => {
    const details = {
        id: req.params.todoId,
        userID: req.params.userId
    }
    dal.get('getTodo', details)
        .then((results) => {
            console.log(`TODO with id ${req.params.todoId} retrieved:`, results);
            res.status(200).json(results[0]);
        })
        .catch((err) => {
            console.error(`Error retrieving todo with id ${req.params.todoId}:`, err);
            res.status(404).json({ error: `An error occurred while retrieving todo with id ${id}` });
        });
});

router.put('/:userId/:todoId', (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const details = {
        detailsToUpdate: req.body,
        id: todoId,
        user_id: userId
    }
    dal.update('updateTodo', details)
        .then((results) => {
            console.log(`Todo with ID ${todoId} updated successfully`);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error('Error updating todo:', err);
            res.status(500).json({ error: 'An error occurred while updating the todo' });
        });
});

router.post('/', (req, res) => {
    const details = {
        newTodoDetails: req.body
    }
    dal.create('addTodo', details)
        .then((result) => {
            console.log("new todo created successfully");
        })
        .catch((err) => {
            console.error('Error creating new Todo:', err);
            res.status(500).json({ error: 'An error occurred while creating a new Todo' });
        });
    dal.get('getTodoId', details).then((result) => {
        console.log("new todo created successfully");
        res.status(200).send(result[0])
        .catch((err) => {
            console.error('Error creating new Todo:', err);
            res.status(500).json({ error: 'An error occurred while creating a new Todo' });
        });

    })
});

router.delete('/:userId/:todoId', (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const details = {
        id: todoId,
        userID: userId
    }
    dal.delete_('deleteTodo', details)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });

});

module.exports = router;