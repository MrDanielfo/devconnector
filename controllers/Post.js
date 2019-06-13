const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

const request = require('request');
const config = require('config');

require('../models/Post');
const Post = mongoose.model('Post');

require('../models/Profile');
const Profile = mongoose.model('Profile'); 

require('../models/User');
const User = mongoose.model('User'); 



const createPost = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        } 

        const post = new Post(newPost);
        await post.save(); 

        res.json(post);
        

    } catch (err) {

        console.log(err.message);
        res.status(500).send('Server Error');

    }

}

const getPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'There is no post' });
        }

        res.json(post);
 
    } catch (err) {

        console.log(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
        
    }
}

const getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find().sort({ date: -1 })

        if (!posts) {
            return res.status(400).json({ msg: 'There are no posts' });
        }

        res.json(posts);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

}

const deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'There is no post' });
        }

        if(req.user.id !== post.user.toString()) {
            
            return res.status(401).json({msg: 'User not authorized'});
    
        }

        await post.remove();

        return res.json({msg: 'Post deleted'});
 
    } catch (err) {
        console.log(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
    }


}

const likePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked

        let likeVerified = post.likes.filter(like => like.user.toString() === req.user.id)

        if(likeVerified.length > 0) {

            return res.status(400).json({ msg: 'Post already liked' });

        }

        post.likes.unshift({ user: req.user.id });
        

        await post.save();

        res.json(post.likes)

    } catch (err) {

        console.log(err.message);

        res.status(500).send('Server Error');

    }

}

const unlikePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        // Check if the post has not been liked

        let likeVerified = post.likes.filter(like => like.user.toString() === req.user.id)

        if (likeVerified.length === 0) {

            return res.status(400).json({ msg: 'Post hasn´t been liked' });

        }

        // Get Remove Index
        // Si nos damos cuenta, ya tenemos la verificación arriba

        post.likes.splice(likeVerified, 1);

        await post.save();

        res.json(post.likes)

    } catch (err) {

        console.log(err.message);

        res.status(500).send('Server Error');

    }

}

const writeComment = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);
        // User can add one or more comments
        const user = await User.findById(req.user.id).select('-password');

        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments)

    } catch (err) {

        console.log(err.message);

        res.status(500).send('Server Error');

    }

}

const deleteComment = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        // Check if the post has not been liked

        let commentToDelete = post.comments.find(comment => comment.id === req.params.comment_id)

        if (!commentToDelete) {

            return res.status(404).json({ msg: 'Comment does not exist' });

        }

        //Check if user is the author of the comment

        if(commentToDelete.user.toString() !== req.user.id ) {

            return res.status(401).json({ msg: 'User not authorized' });

        }

        post.comments.splice(commentToDelete, 1);

        await post.save();

        res.json(post.comments)

    } catch (err) {

        console.log(err.message);

        res.status(500).send('Server Error');

    }

}

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    deletePost,
    likePost,
    unlikePost,
    writeComment,
    deleteComment
}