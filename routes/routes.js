const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const aplikasiController = require('../controllers/aplikasiController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', userController.registerUser);
router.get('/getAplikasi', aplikasiController.getAplikasi);
router.get('/getDetailAplikasi', aplikasiController.getDetailAplikasi);
router.get('/profile', authenticate, userController.getProfile);
router.post('/logout', authenticate, authController.logout);
module.exports = router;