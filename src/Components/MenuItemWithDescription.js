import React from 'react';

const MenuItemWithDescription = ({ title, description, price }) => {
  return (
    <div className="text-center">
      <h3 className="font-semibold text-[#9F785A] glacial-indifference-regular text-lg">{title}</h3> {/* Title */}
      <p className="text-sm text-[#474B4E] glacial-indifference-regular">{description}</p> {/* Description */}
      <p className="font-semibold glacial-indifference-regular text-[#9F785A] text-lg">{price}</p> {/* Price */}
    </div>
  );
};

export default MenuItemWithDescription;
