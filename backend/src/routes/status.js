const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getReadyStateText } = require('../middleware/dbStatus');

/**
 * Route to check the status of the application and database connection
 */
router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  
  res.json({
    status: 'success',
    timestamp: new Date(),
    app: {
      name: 'Beat Blend API',
      version: '1.0.0',
      uptime: process.uptime() + ' seconds'
    },
    database: {
      connected: dbState === 1,
      readyState: dbState,
      readyStateText: getReadyStateText(dbState),
      host: mongoose.connection.host || 'Not connected',
      name: mongoose.connection.name || 'Not connected'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Simple test route to verify API is working
 */
router.get('/test', (req, res) => {
  res.json({ message: 'Status API is working!' });
});

module.exports = router;