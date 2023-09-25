// src/controllers/stockController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get current stock for products
const getStock = async (req, res) => {
  try {
    // Query your database to retrieve product stock information
    const products = await prisma.product.findMany();

    // You may customize the response format based on your database schema
    const stockInfo = products.map((product) => ({
      productId: product.id,
      productName: product.name,
      stockQuantity: product.stockQuantity,
    }));

    res.status(200).json(stockInfo);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getStock };
