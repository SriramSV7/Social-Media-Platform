const express = require('express');
const { createPost, likePost, commentPost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer config (same as app.js, but for route-specific)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/', protect, upload.single('image'), createPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
