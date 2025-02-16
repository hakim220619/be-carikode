const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', userController.registerUser);
router.get('/profile', authenticate, userController.getProfile);
module.exports = router;