const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const svgCaptcha = require('svg-captcha');
const User = require('../models/User');
const auth = require('../middleware/auth');
require('dotenv').config();

// Store captcha text temporarily (in a real app, use Redis or another session store)
const captchaStore = new Map();

/**
 * @route   GET /api/auth
 * @desc    Get authenticated user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error in auth route:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a user
 * @access  Public
 */
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('city', 'City is required').not().isEmpty(),
  check('captcha', 'Captcha is required').not().isEmpty()
], async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, city, captcha, captchaId } = req.body;

  // Verify captcha
  const storedCaptcha = captchaStore.get(captchaId);
  if (!storedCaptcha || storedCaptcha.toLowerCase() !== captcha.toLowerCase()) {
    return res.status(400).json({ message: 'Invalid captcha' });
  }

  // Delete used captcha
  captchaStore.delete(captchaId);

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      city
    });

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in register route:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  check('captcha', 'Captcha is required').not().isEmpty()
], async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, captcha, captchaId } = req.body;

  // Verify captcha
  const storedCaptcha = captchaStore.get(captchaId);
  if (!storedCaptcha || storedCaptcha.toLowerCase() !== captcha.toLowerCase()) {
    return res.status(400).json({ message: 'Invalid captcha' });
  }

  // Delete used captcha
  captchaStore.delete(captchaId);

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in login route:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/auth/captcha
 * @desc    Generate a new captcha
 * @access  Public
 */
router.get('/captcha', (req, res) => {
  // Generate a random captcha
  const captcha = svgCaptcha.create({
    size: 6, // captcha text length
    noise: 2, // number of noise lines
    color: true, // characters will have color
    background: '#f0f0f0', // background color
    width: 200,
    height: 100,
  });

  // Generate a unique ID for this captcha
  const captchaId = Date.now().toString();
  
  // Store captcha text with its ID
  captchaStore.set(captchaId, captcha.text);
  
  // Set expiration for captcha (5 minutes)
  setTimeout(() => {
    captchaStore.delete(captchaId);
  }, 5 * 60 * 1000);

  // Send captcha SVG and ID
  res.json({
    captchaId,
    captchaSvg: captcha.data
  });
});

module.exports = router;