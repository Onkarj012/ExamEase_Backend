const express = require('express');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

// Handle POST requests to /api/users/signup
router.post('/signup', signup);

// Handle POST requests to /api/users/login
router.post('/login', login);

module.exports = router;
