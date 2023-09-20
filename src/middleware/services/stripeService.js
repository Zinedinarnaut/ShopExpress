// src/services/stripeService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to create a payment intent with Stripe
const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

// Function to confirm a payment intent with Stripe
const confirmPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPaymentIntent, confirmPaymentIntent };