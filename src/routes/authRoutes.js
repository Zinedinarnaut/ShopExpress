// src/routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.get('/logout', logoutUser);

// JWT token generation route
router.post('/token', (req, res) => {
  // You can use this route to obtain a new JWT token after it has expired
  const token = jwt.sign({ userId: req.user.id }, '6410bc26488e9d552772c509df99346c', { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = router;