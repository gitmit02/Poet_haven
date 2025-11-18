// src/pages/AllPosts.jsx
import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'poem', 'story'

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await API.get('/posts');
        setPosts(res.data);               // direct array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ---------------------------------------------------------
  // FILTER LOGIC – we only have text posts, so we treat
  // every text post as a "poem".  If you later add a `type`
  // field in the DB, just change the condition.
  // ---------------------------------------------------------
const filteredPosts = posts.filter((post) => {
  if (filter === 'all') return true;
  return post.type === filter;
});

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore All Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing works from our creative community
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="mb-8 flex flex-wrap gap-3">
          {['all', 'poem', 'story'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === f
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? 'All Posts' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <Loading message="Loading posts..." />
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              {filter === 'all'
                ? 'No posts available yet. Be the first to share!'
                : `No ${filter}s found. Try a different filter.`}
            </p>
            <a
              href="/create-post"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
            >
              Create a Post
            </a>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredPosts.length}{' '}
              {filter === 'all' ? 'post' : filter}
              {filteredPosts.length !== 1 ? 's' : ''}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllPosts;