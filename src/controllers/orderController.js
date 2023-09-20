// src/controllers/orderController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await prisma.order.create({
      data: {
        userId,
        products: {
          createMany: {
            data: products,
          },
        },
      },
    });
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed' });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { products } = req.body;
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        products: {
          upsertMany: {
            data: products,
          },
        },
      },
    });
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Order update failed' });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Order deletion failed' });
  }
};

// Retrieve order details by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json({ order });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch order details' });
  }
};

// View order history for a user
const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming you use Passport for authentication
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch order history' });
  }
};

module.exports = { createOrder, updateOrder, deleteOrder, getOrderById, getOrderHistory };