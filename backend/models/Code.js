const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Code', CodeSchema); 