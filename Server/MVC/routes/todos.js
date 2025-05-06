const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

// קבלת כל ה-todos
router.get('/', todosController.getAllTodos);

// קבלת todo לפי ID
router.get('/:id', todosController.getTodoById);

// יצירת todo חדש
router.post('/', todosController.createTodo);

// עדכון todo
router.put('/:id', todosController.updateTodo);

// מחיקת todo
router.delete('/:id', todosController.deleteTodo);

module.exports = router;

// const express = require('express');
// const dal = require('../models/dal');
// const router = express.Router();

// router.get('/:userID', );

// router.get('/:userId/:todoId',);

// router.put('/:userId/:todoId',);

// router.post('/',);

// router.delete('/:userId/:todoId',);

// module.exports = router;