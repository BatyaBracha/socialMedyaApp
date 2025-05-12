const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

// נתיבים
router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.get('/username/:userName', userController.getUserByName);
router.post('/login', userController.login);
router.get('/login/:userName/:userPassword', userController.getUserByNameAndPassword);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;