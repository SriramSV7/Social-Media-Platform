const Post = require('../models/postModel');
const User = require('../models/userModel');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        const image = req.file ? req.file.filename : null;

        const newPost = await Post.create({
            user: req.user._id,
            text,
            image,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        post.likes.push(req.user._id);
        await post.save();

        res.json({ message: 'Post liked' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
const commentPost = async (req, res) => {
    try {
        const { text } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user._id,
            text,
        };

        post.comments.push(comment);
        await post.save();

        res.json({ message: 'Comment added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createPost,
    likePost,
    commentPost,
};
