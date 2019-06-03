const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const auth = require('../../middleware/auth');

const { userData, loginUser } = require('../../controllers/Auth');

// @route GET api/auth
// @desc  Test route
// @access Public
router.get('/', auth, userData)

// @route POST api/auth
// @desc  Authenticate user & get token
// @access Public
router.post('/', [ check('email', 'Please include a valid email').isEmail(),
                   check('password', 'Password is required').exists() 
                  ], loginUser)


module.exports = router;
