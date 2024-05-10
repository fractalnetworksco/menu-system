import React from 'react';

const MenuHeader = ({ title }) => {
  console.log('Title:', title); // Add this line to check the title prop
  return (
    <div className="mt-8 flex flex-col items-center"> {/* Center the content horizontally */}
      <h2 className="text-xl font-semibold">{title}</h2>
      <hr className="mt-2 w-full border-t border-gray-500" style={{ width: '80%' }} /> {/* Adjust the width here */}
    </div>
  );
};

export default MenuHeader;
