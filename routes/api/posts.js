const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// @route GET api/posts
// @desc  Test route
// @access Public

router.get('/', (req, res) => {
  res.send('Posts route');
});

module.exports = router;
