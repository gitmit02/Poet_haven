// controllers/userController.js
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

// ================= GET USER PROFILE =================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get User Profile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ================= UPDATE USER =================
export const updateUser = async (req, res) => {
  try {
    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.bio !== undefined) updates.bio = req.body.bio;
    if (req.body.role) updates.role = req.body.role;

    // Upload new avatar to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        { folder: 'poet-haven/avatars' }
      );

      updates.avatar = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Update User Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
