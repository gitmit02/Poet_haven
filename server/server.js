// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import 'dotenv/config';
import 'dotenv/config';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

// dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(
  cors({
    origin: 'https://poet-haven.vercel.app',
    credentials: true,
  })
);

app.use(express.json());

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error('Global Error:', err);

  // Multer / file errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large (max 5 MB)' });
    }
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: err.message || 'Server Error',
  });
});

// ---------- DB ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
