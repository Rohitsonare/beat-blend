/**
 * Middleware to check database connection status
 * This can be used to verify if the database is connected before processing requests
 */

const mongoose = require('mongoose');

/**
 * Check if the database is connected
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkDbStatus = (req, res, next) => {
  // Check if mongoose is connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: 'error',
      message: 'Database connection not established',
      details: {
        readyState: mongoose.connection.readyState,
        readyStateText: getReadyStateText(mongoose.connection.readyState)
      }
    });
  }
  
  // Database is connected, proceed to next middleware
  next();
};

/**
 * Get text description of mongoose connection ready state
 * @param {Number} state - Mongoose connection ready state
 * @returns {String} - Text description of the ready state
 */
const getReadyStateText = (state) => {
  switch (state) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'unknown';
  }
};

module.exports = {
  checkDbStatus,
  getReadyStateText
};