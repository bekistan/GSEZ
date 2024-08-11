import React from 'react';

const NoOutput: React.FC = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-red-500 mx-auto mb-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v6a1 1 0 102 0V4zM9 15a1 1 0 112 0v1a1 1 0 11-2 0v-1zM7.25 6.25a.75.75 0 111.5 0v6.5a.75.75 0 01-1.5 0v-6.5zM6 10a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-lg text-gray-500 mb-2">No output to display</p>
        <p className="text-sm text-gray-400">Please check back later</p>
      </div>
    </div>
  );
};

export default NoOutput;
