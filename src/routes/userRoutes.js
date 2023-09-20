// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  updateUserProfile,
  changePassword,
  getUserProfileByUsername,
  getUserProfileById,
} = require('../controllers/userController');

// Update user profile
router.put('/profile', updateUserProfile);

// Change password
router.put('/password', changePassword);

// Retrieve user profile by username
router.get('/:username', getUserProfileByUsername);

// Retrieve user profile by user ID
router.get('/id/:userId', getUserProfileById);

module.exports = router;