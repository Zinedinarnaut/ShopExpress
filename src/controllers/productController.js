// src/controllers/productController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Product creation failed' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price } = req.body;
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name,
        description,
        price,
      },
    });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Product update failed' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Product deletion failed' });
  }
};

// Retrieve product details by ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product details' });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProductById };