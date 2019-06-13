const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator/check');


const { 
        userProfile, 
        createProfile, 
        getAllProfiles, 
        userIdProfile, 
        deleteProfile, 
        userExperience, 
        deleteUserExperience,
        userEducation,
        deleteUserEducation,
        githubProfile

  } = require('../../controllers/Profile');

// @route GET api/profile/me
// @desc  Get current users profile
// @access Private

router.get('/me', auth, userProfile);

// @route POST api/profile
// @desc  CREATE or UPDATE user profile
// @access Private

router.post('/', [auth, [
                          check('status', 'Status is required').not().isEmpty(),
                          check('skills', 'Skills are required').not().isEmpty()
                        ]
                  ], createProfile);

// @route GET api/profile
// @desc  GET (READ) all profiles
// @access Public

router.get('/', getAllProfiles);

// @route GET api/profile/user/:user_id
// @desc  GET (READ) user profile by user id
// @access Public

router.get('/user/:user_id', userIdProfile);

// @route DELETE api/profile
// @desc  DELETE profile, user & posts
// @access Private

router.delete('/', auth, deleteProfile);

// @route PUT api/profile/experience
// @desc  ADD Profile experience
// @access Private

router.put('/experience', [auth, [
                                  check('title', 'Title is required').not().isEmpty(),
                                  check('company', 'Company are required').not().isEmpty(),
                                  check('from', 'From date of your experience is required').not().isEmpty()
                                ]
                          ], userExperience);

// @route DELETE api/profile/experience/:exp_id
// @desc  DELETE Profile experience
// @access Private

router.delete('/experience/:exp_id', auth, deleteUserExperience);

// @route PUT api/profile/education
// @desc  ADD Profile education
// @access Private

router.put('/education', [auth, [
                                  check('school', 'School is required').not().isEmpty(),
                                  check('degree', 'Degree is required').not().isEmpty(),
                                  check('fieldofstudy', 'Field of study is required').not().isEmpty(),
                                  check('from', 'From date of your experience is required').not().isEmpty()
                                ]
                          ], userEducation);

// @route DELETE api/profile/education/:edu_id
// @desc  DELETE Profile education
// @access Private

router.delete('/education/:edu_id', auth, deleteUserEducation);

// @route GET api/profile/github/:username
// @desc  GET Github Profile
// @access Public

router.get('/github/:username', githubProfile);



module.exports = router;
