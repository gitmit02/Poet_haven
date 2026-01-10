// routes/posts.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createPost,
  getPosts,
  getUserPosts,
  getPostById,
} from '../controllers/postController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/user/:userId', protect, getUserPosts);
router.get('/:id', getPostById);

export default router;
