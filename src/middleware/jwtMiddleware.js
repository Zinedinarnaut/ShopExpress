const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token using your secret key
    req.user = decoded; // Set the user in the request object
    next(); // Move on to the protected route
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = jwtMiddleware;