// src/index.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const secretKEY = process.env.JWT_SECRET

// Middleware setup
app.use(express.json());
app.use(session({ secret: secretKEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

const authMiddleware = require('./src/middleware/authMiddleware');
const jwtToken = require('./src/middleware/jwtMiddleware');

// Middleware route
app.use(authMiddleware.isAuthenticated)
// Protect routes with JWT authentication middleware
app.use(jwtToken) // apply jwtMiddleware to all routes

// Include and use your routes
const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const stockRoutes = require('./src/routes/stockRoutes.js')

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/payment', paymentRoutes); // Use paymentRoutes
app.use('/api', stockRoutes);

// Start the server
const port = process.env.PORT || 3055;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
