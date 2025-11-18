import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

// Get user profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// controllers/userController.js
export const updateUser = async (req, res) => {
  try {
    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.bio !== undefined) updates.bio = req.body.bio;
    if (req.body.role) updates.role = req.body.role;
    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Update User Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Update profile
export const updateProfile = async (req, res) => {
  const { bio } = req.body;
  const updateData = { bio };

  if (req.file) {
    updateData.avatar = `/uploads/${req.file.filename}`;
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};