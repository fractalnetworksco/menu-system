import React from 'react';

const MenuItemWithDescription = ({ title, description, price }) => {
  return (
    <div className="text-center pt-6">
      <h3 className="font-semibold text-[#9F785A] glacial-indifference-regular text-2xl">{title}</h3> {/* Title */}
      <p className="text-xl text-[#474B4E] glacial-indifference-regular">{description}</p> {/* Description */}
      <p className="font-semibold glacial-indifference-regular text-[#9F785A] text-2xl">{price}</p> {/* Price */}
    </div>
  );
};

export default MenuItemWithDescription;
