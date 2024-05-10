import React from 'react';

const MenuHeaderWithBullets = ({ title, bullets }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-4xl libre-baskerville-regular font-semibold">{title}</h2>
      {bullets.length > 0 && (
        <ul className="max-w-sm flex flex-row space-x-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="note glacial-indifference-bold font-bold text-2xl mx-auto" style={{fontWeight: 'bold'}}>
              {index !== 0 && '•'} {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuHeaderWithBullets;
