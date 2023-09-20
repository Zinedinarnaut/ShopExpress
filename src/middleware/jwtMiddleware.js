// src/middleware/jwtMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify the token using your secret key
    req.user = decoded; // Set the user in the request object
    next(); // Move on to the protected route
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};