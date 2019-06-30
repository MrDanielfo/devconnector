const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwtSecret = config.get('jwtSecret');

require('../models/User');

const User = mongoose.model('User'); 

const userData = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        
    } catch (err) {
        
        console.error(err.message)
        res.status(500).send('Server Error');

    }
}

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // verify password

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {

        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

    } 

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({token});
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

};

module.exports = {
  userData,
  loginUser
};