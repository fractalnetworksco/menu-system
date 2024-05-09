import React from 'react';

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="flex justify-between"> {/* Adjust margin top and bottom here */}
      <div className="text-lg text-left"> {/* Set text to larger size */}
        <h3 className="font-semibold text-[#9F785A] glacial-indifference-regular text-lg">{name}</h3>
        <p className="text-sm text-[#474B4E] glacial-indifference-regular">{description}</p> {/* Set larger size for description */}
      </div>
      <div className="text-lg text-right"> {/* Set text to larger size */}
        <p className="font-semibold glacial-indifference-regular text-[#9F785A] text-lg">{price}</p> {/* Ensure font size is also larger for price */}
      </div>
    </div>
  );
};

export default MenuItem;
