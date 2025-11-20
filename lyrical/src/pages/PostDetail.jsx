// src/pages/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-center">Loading…</p>;
  if (!post) return <p className="text-center">Not found</p>;

  const author = post.authorId;
  const base = 'https://poet-haven-backend.onrender.com';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/all-posts" className="text-purple-600 hover:underline mb-6 inline-block">
          ← Back
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4">

            {post.title}
          </h1>

          <div className="flex items-center mb-6">
            {author?.avatar ? (
              <img src={`${base}${author.avatar}`} alt="" className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                {author?.name?.[0]}
              </div>
            )}
            <div className="ml-3">
              <p className="font-semibold">{author?.name}</p>
              <p className="text-sm text-gray-500">{author?.role}</p>
            </div>
          </div>

          {post.contentType === 'image' ? (
            <img src={`${base}${post.imageUrl}`} alt="" className="w-full rounded-lg" />
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-lg">{post.textContent}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
