import React from 'react';

const MenuHeaderWithDescription = ({ title, description }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-4xl libre-baskerville-regular font-semibold">{title}</h2>
      {description && (
        <div className="max-w-sm">
          <p className="text-lg glacial-indifference-regular text-[#474B4E]">{description}</p>
        </div>
      )}
      <hr className="mt-2 w-full border-t border-gray-500" style={{ width: '99%', borderColor: '#CF8B77' }} />
    </div>
  );
};

export default MenuHeaderWithDescription;
