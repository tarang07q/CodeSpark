const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Code = require('../models/Code');

// @route    POST api/code
// @desc     Save code snippet
// @access   Private
router.post('/', auth, async (req, res) => {
  const { title, language, code } = req.body;

  try {
    const newCode = new Code({
      user: req.user.id,
      title,
      language,
      code
    });

    const savedCode = await newCode.save();
    res.json(savedCode);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/code
// @desc     Get all user's code snippets
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const codes = await Code.find({ user: req.user.id }).sort({ date: -1 });
    res.json(codes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/code/:id
// @desc     Get code snippet by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);

    if (!code) {
      return res.status(404).json({ msg: 'Code snippet not found' });
    }

    // Check user owns the code
    if (code.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(code);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/code/:id
// @desc     Update code snippet
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { title, language, code } = req.body;

  const codeFields = {};
  if (title) codeFields.title = title;
  if (language) codeFields.language = language;
  if (code) codeFields.code = code;

  try {
    let codeSnippet = await Code.findById(req.params.id);

    if (!codeSnippet) {
      return res.status(404).json({ msg: 'Code snippet not found' });
    }

    // Check user owns the code
    if (codeSnippet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    codeSnippet = await Code.findByIdAndUpdate(
      req.params.id,
      { $set: codeFields },
      { new: true }
    );

    res.json(codeSnippet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;