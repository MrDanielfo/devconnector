const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

const request = require('request');
const config = require('config');
const githubClientId = config.get('githubClientId');
const githubSecret = config.get('githubSecret');

require('../models/Profile');
const Profile = mongoose.model('Profile'); 

require('../models/User');
const User = mongoose.model('User'); 

require('../models/Post');
const Post = mongoose.model('Post'); 


const userProfile = async (req, res) => {

    try {
        // va en minúscula
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'] );

        if(!profile) {
            return res.status(400).json({msg : 'There is no profile for this user'})
        }

        res.json(profile);

        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

const createProfile = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body

    // Build profile object

    const profileFields = {};
    profileFields.user = req.user.id

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location =  location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;

    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // build social object

    const socialMedia = {};

    if(youtube) socialMedia.youtube = youtube;
    if(facebook) socialMedia.facebook = facebook;
    if(twitter) socialMedia.twitter = twitter;
    if(instagram) socialMedia.instagram = instagram;
    if(linkedin) socialMedia.linkedin = linkedin

    profileFields.social = socialMedia;

    try {

        let profile = await Profile.findOne({ user: req.user.id })

        if(profile) {
            // Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set : profileFields }, { new: true } )
            return res.json(profile);

        } else {
            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }


}


const getAllProfiles = async (req, res) => {

    try {

        const profiles = await Profile.find().populate('user', ['name', 'avatar']); 
        res.json(profiles);
      
    } catch (err) {

        console.log(err.message);
        res.status(500).send('Server Error');
        
    }

}

const userIdProfile = async (req, res) => {

    try {

        const profile = await Profile.findOne({user : req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({msg: 'Profile not found'}); 
        }

        res.json({ profile });

    } catch (err) {

        console.log(err.message);

        if(err.kind === 'ObjectId') {

            return res.status(400).json({ msg: 'Profile not found' }); 
        }

        res.status(500).send('Server Error');

    }

}

const deleteProfile = async (req, res) => {

    try {
        

        await Post.deleteMany({user: req.user.id })
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // Remove User
        await User.findOneAndRemove({ _id : req.user.id } )

        res.json({msg : 'User and Profile Deleted'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

const userExperience = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { title, company, location, from, to, current, description } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {

        let profile = await Profile.findOne({ user: req.user.id });

        // Update
        profile.experience.unshift(newExp);

        await profile.save();
        
        return res.json(profile);



    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

const deleteUserExperience = async (req, res) => {

    try {
        
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Remove Index
    const removeIndex = profile.experience.filter(experience => experience.id === req.params.exp_id); 

    profile.experience.splice(removeIndex, 1);

    await profile.save()

    res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

const userEducation = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update
      profile.education.unshift(newEducation);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

}

const deleteUserEducation = async (req, res) => {

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get Remove Index
      const removeIndex = profile.education.filter(
        education => education.id === req.params.edu_id
      );

      profile.education.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

}

const githubProfile = async (req, res) => {

    try {

        const options = await {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecret}`,
            method: 'GET',
            headers: { 'user-agent' : 'node.js' }
        }

        request(options, (err, response, body) => {

            if(err) console.log(err);

            if(response.statusCode !== 200) {

                return res.status(400).json({msg : 'No Github profile found'})

            }

            res.json(JSON.parse(body));
        })
        

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

module.exports = {
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
}

