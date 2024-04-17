import React from 'react';

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="my-4 flex justify-between">
      <div className="text-sm text-left"> {/* Set text to smaller size */}
        <h3 className="font-semibold text-sm">{name}</h3> {/* Bullet point added here */}
        <p className="text-xs">{description}</p> {/* Set slightly smaller size for description */}
      </div>
      <div className="text-sm text-right"> {/* Set text to smaller size */}
        <p className="font-bold text-sm">${price}</p> {/* Ensure font size is also smaller for price */}
      </div>
    </div>
  );
};

export default MenuItem;
