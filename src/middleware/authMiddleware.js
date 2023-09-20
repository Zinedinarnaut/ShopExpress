const passport = require('passport');

// Middleware to check if the user is authenticated using Passport
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

module.exports.isAuthenticated = isAuthenticated;