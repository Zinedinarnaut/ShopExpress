// src/controllers/paymentController.js

const stripe = require('stripe')('your-stripe-secret-key');

// Create a payment intent
const createPaymentIntent = async (req, res) => {
  try {
    // Calculate the total amount to charge (based on items in the cart)
    const { cartItems } = req.body;
    // Calculate the total amount to charge (e.g., sum of cart items)

    // Create a payment intent with the calculated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculatedAmount,
      currency: 'usd', // Change this to your preferred currency
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Payment intent creation failed' });
  }
};

module.exports = { createPaymentIntent };