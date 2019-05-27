const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// @route GET api/users
// @desc  Test route
// @access Public



router.get('/', (req, res) => {
  res.json({
    message: 'Hola',
    nombre: 'Josué'
  });
});


module.exports = router; 
