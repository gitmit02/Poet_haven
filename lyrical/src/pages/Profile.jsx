// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user?.avatar ? `https://poet-haven-backend.onrender.com${user.avatar}` : ''
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    role: user?.role || 'poet',
  });

  // Update form when user changes (e.g., after login)
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      role: user?.role || 'poet',
    });
    setImagePreview(user?.avatar ? `https://poet-haven-backend.onrender.com${user.avatar}` : '');
  }, [user]);

  useEffect(() => {
    if (user?._id) fetchUserPosts();
  }, [user?._id]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/posts/user/${user._id}`);
      setUserPosts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('bio', formData.bio);
    fd.append('role', formData.role);
    if (imageFile) fd.append('avatar', imageFile);

    const response = await API.put(`/users/${user._id}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',  // THIS WAS MISSING!
      },
    });

    updateUser(response.data);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(`http://localhost:5000${response.data.avatar}`); // Update preview
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to update profile');
  }
};

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              {/* MAIN AVATAR - Shows real image or fallback */}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={user?.name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-purple-100 shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold ring-4 ring-purple-100 shadow-xl">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}

              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-purple-600 font-semibold capitalize text-lg">{user?.role || 'poet'}</p>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* EDIT FORM OR BIO */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-10 pt-8 border-t border-gray-200 space-y-7">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  placeholder="Your full name"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                >
                  <option value="poet">Poet</option>
                  <option value="writer">Writer</option>
                  <option value="storyteller">Storyteller</option>
                  <option value="author">Author</option>
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none transition"
                  placeholder="Tell the world about your poetic soul..."
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-600 file:mr-5 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
                />

                {/* Show current or new preview */}
                {imagePreview && (
                  <div className="mt-5 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-purple-200"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setImageFile(null);
                    setImagePreview(user?.avatar ? `http://localhost:5000${user.avatar}` : '');
                  }}
                  className="px-8 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            user?.bio && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About Me</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{user.bio}</p>
              </div>
            )
          )}
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">My Posts</h2>
          
          {loading ? (
            <Loading message="Loading your masterpieces..." />
          ) : error ? (
            <Error message={error} onRetry={fetchUserPosts} />
          ) : userPosts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-16 text-center">
              <p className="text-gray-600 text-xl mb-6">Your creative journey begins now!</p>
              <a
                href="/create-post"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
              >
                Write Your First Poem
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
