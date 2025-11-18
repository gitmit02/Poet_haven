// models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  type: {
    type: String,
    enum: ['poem', 'story', 'prose', 'other'],
    default: 'poem',
  },
  contentType: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  textContent: {
    type: String,
    maxlength: 5000,
  },
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model('Post', postSchema);