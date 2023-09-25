// src/routes/stockRoutes.js

const express = require('express');
const router = express.Router();
const { getStock } = require('../controllers/stockController'); // Create a stock controller

// Stock endpoint to get current stock for products
router.get('/stock', getStock);

module.exports = router;
