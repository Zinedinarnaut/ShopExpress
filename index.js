// src/index.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middleware setup
app.use(express.json());
app.use(session({ secret: '6410bc26488e9d552772c509df99346c', resave: false, saveUninitialized: false }));
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

const authMiddleware = require('./middleware/authMiddleware');

// Middleware route
app.use(authMiddleware)

// Include and use your routes
const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes'); // Import your paymentRoutes
const jwtMiddleware = require('./src/middleware/jwtMiddleware'); // Import JWT middleware

// Protect routes with JWT authentication middleware
app.use('/cart', jwtMiddleware);
app.use('/products', jwtMiddleware);
app.use('/user', jwtMiddleware);
app.use('/payment', jwtMiddleware); // Apply JWT middleware to paymentRoutes

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/payment', paymentRoutes); // Use paymentRoutes

// Start the server
const port = process.env.PORT || 3055;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});