import React from 'react';

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="my-4 flex justify-between">
      <div className="text-sm text-left"> {/* Set text to smaller size */}
        <h3 className="font-semibold text-[#9F785A] glacial-indifference-regular text-sm">{name}</h3>
        <p className="text-xs text-[#474B4E] glacial-indifference-regular">{description}</p> {/* Set slightly smaller size for description */}
      </div>
      <div className="text-sm text-right"> {/* Set text to smaller size */}
        <p className="font-semibold glacial-indifference-regular text-[#9F785A] text-sm">${price}</p> {/* Ensure font size is also smaller for price */}
      </div>
    </div>
  );
};

export default MenuItem;
