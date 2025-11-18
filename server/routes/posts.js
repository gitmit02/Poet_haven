// routes/posts.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { createPost, getPosts, getUserPosts, getPostById } from '../controllers/postController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
// routes/posts.js
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `post-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only images allowed'));
  },
});


router.post('/', protect, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/user/:userId', protect, getUserPosts);
router.get('/:id', getPostById);

export default router;