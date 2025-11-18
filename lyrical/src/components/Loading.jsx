import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default Loading;