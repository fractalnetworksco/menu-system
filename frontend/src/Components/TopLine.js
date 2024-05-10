import React from 'react';

const TopLine = () => {
  return (
    <div className="mt-20vh mx-auto w-3/4 flex justify-between items-center">
        <div className="w-1/3 h-px bg-gray-500"></div>
        <span className="text-red-700 rethink-sans" style={{ letterSpacing: '5px' }}>STARKVILLE, MS</span>
        <div className="w-1/3 h-px bg-gray-500"></div>
    </div>
  );
};

export default TopLine;
