const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { checkDbStatus } = require('./middleware/dbStatus');

// Import routes
const userRoutes = require('./routes/users');
const trackRoutes = require('./routes/tracks');
const statusRoutes = require('./routes/status');
const authRoutes = require('./routes/auth');
const socialAuthRoutes = require('./routes/socialAuth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Beat Blend API is running');
});

// Status route - no DB check required
app.use('/api/status', statusRoutes);

// Apply DB connection check middleware to all API routes except status
app.use('/api', checkDbStatus);

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', socialAuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Don't crash the server, just log the error
});