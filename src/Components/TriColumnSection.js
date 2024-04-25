import React from 'react';

const TriColumnSection = ({ title, items }) => {
  return (
    <div className="border-2 border-gray-800 rounded-lg p-4 mt-4">
      <h2 className="text-2xl text-[#526C3F] font-bold italic">{title}</h2>
      <div className="grid grid-cols-3 gap-2 pr-2 pl-2 italic text-[#474B4E]"> {/* Reduced the gap between grid items */}
        {items.map((item, index) => (
            <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TriColumnSection;
