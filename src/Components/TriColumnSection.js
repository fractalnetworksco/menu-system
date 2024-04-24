import React from 'react';

const TriColumnSection = ({ title, items }) => {
  return (
    <div className="border-2 border-gray-800 rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
            <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TriColumnSection;
