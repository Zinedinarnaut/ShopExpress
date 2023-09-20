// src/controllers/cartController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you use Passport for authentication
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user cart' });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you use Passport for authentication
    const { productId, quantity } = req.body;
    const cart = await prisma.cart.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        cartItems: {
          create: {
            productId,
            quantity,
          },
        },
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add product to cart' });
  }
};

module.exports = { getUserCart, addToCart };