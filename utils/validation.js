// src/utils/validation.js

// Validate an email address using a simple regex pattern
const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

// Validate a password to meet certain criteria (e.g., at least 8 characters)
const isPasswordValid = (password) => {
  return password.length >= 8;
};

module.exports = { isEmailValid, isPasswordValid };