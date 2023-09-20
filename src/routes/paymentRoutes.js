// src/routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

// Create a payment intent route
router.post('/create-intent', createPaymentIntent);

module.exports = router;