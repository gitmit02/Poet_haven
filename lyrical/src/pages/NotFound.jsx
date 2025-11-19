import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        
        <h1 className="text-9xl font-bold text-purple-200 select-none">404</h1>
        
        
        <h2 className="text-4xl font-bold text-gray-800 mt-8 mb-4">
          Oops! Page Lost in the Stars
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          The page you're looking for seems to have wandered off into the poetic void...
        </p>

        
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Return Home
        </Link>

        
        <p className="mt-12 text-gray-500 italic">
          "Not all those who wander are lost..." – but this page definitely is
        </p>
      </div>
    </div>
  );
};

export default NotFound;
