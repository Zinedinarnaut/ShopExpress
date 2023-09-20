// src/controllers/authController.js

const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// User registration
const registerUser = async (req, res) => {
  // ... (your existing code for registration)
};

// User login
const loginUser = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // Generate JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Login successful', user, token });
    });
  })(req, res, next);
};

// User logout
const logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { registerUser, loginUser, logoutUser }