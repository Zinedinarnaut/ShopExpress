// src/services/emailService.js
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter with your email service provider's settings
const transporter = nodemailer.createTransport({
  service: 'YourEmailServiceProvider',
  auth: {
    user: 'your@email.com',
    pass: 'your-email-password',
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'your@email.com',
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };