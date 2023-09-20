// src/middleware/errorMiddleware.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error to the console

  // Handle specific error types and send appropriate responses
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', error: err.message });
  }

  // Handle other errors with a generic 500 Internal Server Error response
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = { errorHandler };