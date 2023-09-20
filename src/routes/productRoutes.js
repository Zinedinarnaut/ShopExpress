// src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require('../controllers/productController');

// Create a new product
router.post('/', createProduct);

// Update a product by ID
router.put('/:productId', updateProduct);

// Delete a product by ID
router.delete('/:productId', deleteProduct);

// Retrieve product details by ID
router.get('/:productId', getProductById);

module.exports = router;