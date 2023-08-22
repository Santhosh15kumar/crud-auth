const jwt = require('jsonwebtoken');

const userController = require('../controller/user');
const authController = require('../authController/user');
const {authenticateToken} = require('../middleware/auth')


const router = require('express').Router();


router.post('/user/register', authController.register);
router.post('/user/login', authController.login);
router.get('/user', authenticateToken, userController.findAll);
router.get('/user/:id', authenticateToken, userController.findOne);
router.post('/user/create', authenticateToken, userController.create);
router.patch('/user/update/:id', authenticateToken, userController.update);
router.delete('/user/delete/:id', authenticateToken, userController.destroy);

module.exports = router;