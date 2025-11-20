// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const author = post.authorId;
  const base = 'https://poet-haven-backend.onrender.com';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Badge + Date */}
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Author */}
        <div className="flex items-center mb-4">
          {author?.avatar ? (
            <img
              src={`${base}${author.avatar}`}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {author?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          )}
          <div className="ml-2">
            <p className="text-gray-700 font-medium text-sm">
              {author?.name || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {author?.role || 'writer'}
            </p>
          </div>
        </div>

        {/* Content Preview */}
        {post.contentType === 'image' && post.imageUrl ? (
          <div className="mb-4">
            <img
              src={`${base}${post.imageUrl}`}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg shadow-sm"
            />
          </div>
        ) : (
          <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">
            {post.textContent}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {post.contentType === 'text' ? 'Text' : 'Image'} Post
          </span>
          <Link
            to={`/post/${post._id}`}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm transition flex items-center gap-1"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
