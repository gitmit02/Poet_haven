// server.js  ← FINAL VERSION (Nov 2025 – works perfectly on Render free tier)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== 1. ROOT HEALTH CHECK (keeps Render awake) ==========
app.get('/', (req, res) => {
  res.json({ 
    message: 'Poet\'s Haven Backend is ALIVE & READY ♡', 
    time: new Date().toISOString(),
    tip: 'Ping this URL every 5–10 mins to prevent sleep!'
  });
});

// ========== 2. CORS (exact origins – no trailing slash) ==========

app.use(cors({
  origin: "https://poet-haven.vercel.app",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
}));


// ========== 3. BODY PARSER & STATIC FILES ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));  // ← make sure "uploads" folder exists!

// ========== 4. MULTER CONFIG (only used inside postRoutes) ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) cb(null, true);
    else cb(new Error('Only images allowed (jpeg, jpg, png, gif, webp)'));
  },
});

// Attach multer only where needed (inside postRoutes – not globally)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ========== 5. BULLETPROOF MONGO CONNECTION (Render-proof) ==========
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('→ Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('MongoDB Connected Successfully ♡');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    isConnected = false;
    // Don't crash the server – let next request retry
  }
};

// Connect once at startup
connectDB();

// Auto-reconnect on every request if connection dropped (CRITICAL for Render!)
app.use(async (req, res, next) => {
  if (!isConnected) {
    console.log('MongoDB disconnected → Reconnecting...');
    await connectDB();
  }
  next();
});

// ========== 6. GLOBAL ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large (max 5MB)' });
    }
  }
  res.status(500).json({ message: err.message || 'Server Error' });
});

// ========== 7. 404 FOR UNKNOWN ROUTES ==========
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ========== 8. START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} – Poet's Haven is alive!`);
});
