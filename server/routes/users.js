// routes/users.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { updateUser } from '../controllers/userController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `avatar-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.put('/:id', protect, upload.single('avatar'), updateUser);

export default router;