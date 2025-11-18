// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'poem',
    content: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [postType, setPostType] = useState('text');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be < 5MB');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const switchToText = () => {
    setPostType('text');
    setImageFile(null);
    setImagePreview('');
  };

  const switchToImage = () => {
    setPostType('image');
    setFormData({ ...formData, content: '' });
  };

// CreatePost.jsx – handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!formData.title.trim()) {
    setError('Title is required');
    setLoading(false);
    return;
  }

  const fd = new FormData();

  // SEND contentType FIRST — Multer needs this to decide if file is required
  fd.append('contentType', postType);
  fd.append('title', formData.title);
  fd.append('type', formData.type);

  if (postType === 'text') {
    if (!formData.content.trim()) {
      setError('Content is required');
      setLoading(false);
      return;
    }
    fd.append('textContent', formData.content);
  } else {
    if (!imageFile) {
      setError('Image is required');
      setLoading(false);
      return;
    }
    fd.append('image', imageFile);
  }

  // DEBUG: Log FormData
  for (let [key, value] of fd.entries()) {
    // console.log(key, value);
  }

  try {
    await API.post('/posts', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/all-posts');
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to post');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create Post</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Toggle */}
        <div className="flex space-x-4 mb-8">
          <button
            type="button"
            onClick={switchToText}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              postType === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Text Post
          </button>
          <button
            type="button"
            onClick={switchToImage}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              postType === 'image' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Image Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              placeholder="Enter a catchy title..."
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              <option value="poem">Poem</option>
              <option value="story">Story</option>
            </select>
          </div>

          {/* Content */}
          {postType === 'text' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 resize-none"
                placeholder="Write your poem, story, or prose..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                required
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-50 file:text-purple-700"
              />
              {imagePreview && (
                <img src={imagePreview} alt="preview" className="mt-4 max-h-64 mx-auto rounded-lg shadow" />
              )}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;