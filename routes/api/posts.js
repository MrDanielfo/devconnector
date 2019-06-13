const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check } = require('express-validator/check');

const {
  createPost,
  getPost,
  getAllPosts,
  deletePost,
  likePost,
  unlikePost,
  writeComment,
  deleteComment
} = require('../../controllers/Post');

// @route POST api/posts
// @desc  Create a Post
// @access Private

router.post('/', [auth, [
                        check('text', 'Text is required').not().isEmpty()
                      ]
                ], createPost);

// @route GET api/posts
// @desc  GET All Posts
// @access Private

router.get('/', auth, getAllPosts);

// @route GET api/posts/post/:id
// @desc  GET a post by Id
// @access Private

router.get('/post/:id', auth, getPost);

// @route DELETE api/posts/post/:id
// @desc  DELETE a post by Id
// @access Private

router.delete('/post/:id', auth, deletePost);

// @route PUT api/posts/like/:id
// @desc  PUT GIVE A Like
// @access Private

router.put('/like/:id', auth, likePost);

// @route PUT api/posts/unlike/:id
// @desc  PUT GIVE AN UNLike
// @access Private

router.put('/unlike/:id', auth, unlikePost);

// @route PUT api/posts/comments/:id
// @desc  PUT Write a Comment in a Post
// @access Private

router.put('/comments/:id', [auth, [
                                    check('text', 'Text is required').not().isEmpty()
                                  ]
                                ], writeComment);

// @route DELETE api/posts/rmcomments/:id/:comment_id
// @desc  DELETE Delete a Comment
// @access Private

router.delete('/rmcomments/:id/:comment_id', auth, deleteComment);

module.exports = router;
