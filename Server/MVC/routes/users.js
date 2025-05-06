const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.get('/:userId', userController.getUserById);
router.get('/:userName', userController.getUserByName);
router.get('/:userName/:userPassword', userController.getUserByNameAndPassword);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.loginUser);
module.exports = router;

