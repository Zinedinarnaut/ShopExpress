// src/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderHistory,
} = require('../controllers/orderController');

// Create a new order
router.post('/', createOrder);

// Update an order by ID
router.put('/:orderId', updateOrder);

// Delete an order by ID
router.delete('/:orderId', deleteOrder);

// Retrieve order details by ID
router.get('/:orderId', getOrderById);

// View order history for a user
router.get('/user/orders', getOrderHistory);

module.exports = router;