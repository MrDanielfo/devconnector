const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const gravatar = require('gravatar'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');


require('../models/User');

const User = mongoose.model('User'); 


const registerUser = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {name, email, password } = req.body

    try {
          
        let user = await User.findOne({ email: email });

        if(user) {
           return res.status(400).json({ errors : [{ msg : 'User already exists' }] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        // Return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 
                jwtSecret, 
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json( { token } )
                }
            )


    } catch(err) {

        console.error(err.message);
        res.status(500).send('Server error');

    }

    
}


module.exports = {
    registerUser 
}

