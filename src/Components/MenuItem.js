import React from 'react';

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="my-4">
      <h3 className="font-semibold">{name}</h3>
      <p>{description}</p>
      <p className="font-bold">${price}</p>
    </div>
  );
};

export default MenuItem;
