// controllers/postController.js
import Post from '../models/Post.js';
import cloudinary from '../config/cloudinary.js';

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, type, contentType, textContent } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!contentType) {
      return res.status(400).json({ message: 'contentType is required' });
    }

    const postData = {
      authorId: req.user._id,
      title: title.trim(),
      type: type || 'poem',
      contentType,
    };

    // TEXT POST
    if (contentType === 'text') {
      if (!textContent?.trim()) {
        return res.status(400).json({ message: 'Content is required' });
      }
      postData.textContent = textContent.trim();
    }

    // IMAGE POST
    else if (contentType === 'image') {
      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        {
          folder: 'poet-haven/posts',
        }
      );

      postData.imageUrl = result.secure_url;
    }

    else {
      return res.status(400).json({ message: 'Invalid contentType' });
    }

    const post = await Post.create(postData);
    await post.populate('authorId', 'name avatar role bio');

    res.status(201).json(post);
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('authorId', 'name avatar role bio');

    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET USER POSTS
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('authorId', 'name avatar role bio');

    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET SINGLE POST
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('authorId', 'name avatar role bio');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
