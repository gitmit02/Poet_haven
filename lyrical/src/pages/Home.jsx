import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchRecentPosts();
//     }
//   }, [isAuthenticated]);

//   const fetchRecentPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/posts?limit=6');
//       setRecentPosts(response.data.posts || []);
//     } catch (err) {
//       console.error('Failed to load recent posts:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

useEffect(() => {
  if (isAuthenticated) {
    fetchRecentPosts();
  }
}, [isAuthenticated]);

const fetchRecentPosts = async () => {
  try {
    setLoading(true);
    const response = await API.get('/posts');
    const allPosts = response.data; // ← Direct array
    setRecentPosts(allPosts.slice(0, 6)); // ← Limit to 6
  } catch (err) {
    console.error('Failed to load recent posts:', err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Poet's Haven
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A creative sanctuary for poets and writers to share their stories, poems, and literary works with a passionate community.
          </p>
          
          {isAuthenticated ? (
            <div className="space-x-4">
              <Link
                to="/create-post"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Create a Post
              </Link>
              <Link
                to="/all-posts"
                className="inline-block bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Explore All Posts
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signup"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Share Your Work
            </h3>
            <p className="text-gray-600">
              Post your poems and stories in text or image format
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Build Your Profile
            </h3>
            <p className="text-gray-600">
              Create a unique profile as a poet or writer
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Connect & Inspire
            </h3>
            <p className="text-gray-600">
              Discover and engage with works from fellow creators
            </p>
          </div>
        </div>

        {/* User Welcome Section */}
        {isAuthenticated && (
          <div className="mt-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-lg opacity-90">
              Ready to share your next masterpiece?
            </p>
          </div>
        )}

        {/* Recent Posts Section - Only for authenticated users */}
        {isAuthenticated && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Recent Posts from the Community
                </h2>
                <p className="text-gray-600">
                  Discover the latest creative works from our writers and poets
                </p>
              </div>
              <Link
                to="/all-posts"
                className="hidden md:inline-block text-purple-600 hover:text-purple-700 font-semibold"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <Loading message="Loading recent posts..." />
            ) : recentPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">
                  No posts yet. Be the first to share your work!
                </p>
                <Link
                  to="/create-post"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Create First Post
                </Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <PostCard key={post._id || post.id} post={post} />
                  ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                  <Link
                    to="/all-posts"
                    className="inline-block text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    View All Posts →
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* Call to Action for Non-authenticated Users */}
        {!isAuthenticated && (
          <div className="mt-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Creative Community Today
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Connect with fellow writers and poets, share your work, and get inspired by others' creativity.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Sign Up Free
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;