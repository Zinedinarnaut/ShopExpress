// src/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { getUserCart, addToCart } = require('../controllers/cartController');
const jwtMiddleware = require('../middleware/jwtMiddleware'); // Import JWT middleware

// Get user's cart route (protected with JWT)
router.get('/cart', jwtMiddleware, getUserCart);

// Add product to cart route (protected with JWT)
router.post('/cart', jwtMiddleware, addToCart);

module.exports = router;