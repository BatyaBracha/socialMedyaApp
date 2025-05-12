const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

// // קבלת כל ה-todos
// router.get('/', todosController.getAllTodos);

// קבלת todo לפי ID
router.get('/users/:userId', todosController.getTodosByUserId);
router.get('/:Id', todosController.getTodoById);


// יצירת todo חדש
router.post('/', todosController.createTodo);

// עדכון todo
router.put('/:id', todosController.updateTodo);

// מחיקת todo
router.delete('/:id', todosController.deleteTodo);

module.exports = router;

