const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.get('/users/:userId', todosController.getTodosByUserId);
router.get('/:Id', todosController.getTodoById);
router.post('/', todosController.createTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;

