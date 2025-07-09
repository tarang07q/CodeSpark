const express = require('express');
const Code = require('../models/Code');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Auth middleware
function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Get user's code
router.get('/mine', auth, async (req, res) => {
  try {
    let code = await Code.findOne({ user: req.user.id });
    if (!code) code = await Code.create({ user: req.user.id, code: '// Start coding!' });
    res.json(code);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/update user's code
router.post('/save', auth, async (req, res) => {
  try {
    const { code, language } = req.body;
    let userCode = await Code.findOneAndUpdate(
      { user: req.user.id },
      { code, language, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json({ message: 'Code saved!', code: userCode });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 