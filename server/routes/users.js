// routes/users.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { updateUser } from '../controllers/userController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.put('/:id', protect, upload.single('avatar'), updateUser);

export default router;
