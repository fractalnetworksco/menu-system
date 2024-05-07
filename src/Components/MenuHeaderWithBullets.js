import React from 'react';

const MenuHeaderWithBullets = ({ title, bullets }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-3xl libre-baskerville-regular font-semibold">{title}</h2>
      {bullets.length > 0 && (
        <ul className="max-w-sm flex flex-row space-x-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-md glacial-indifference-bold text-[#474B4E]" style={{fontWeight: 'bold'}}>
              {index !== 0 && '•'} {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuHeaderWithBullets;
