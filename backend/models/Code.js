const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  language: {
    type: String,
    required: [true, 'Please select a language'],
    enum: [
      'javascript',
      'python',
      'java',
      'c',
      'cpp',
      'php',
      'ruby',
      'go',
      'swift',
      'typescript'
    ]
  },
  code: {
    type: String,
    required: [true, 'Please add some code']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Code', CodeSchema);