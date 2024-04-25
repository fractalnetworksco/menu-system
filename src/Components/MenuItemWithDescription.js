import React from 'react';

const MenuItemWithDescription = ({ title, description, price }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3> {/* Title */}
      <p className="text-sm text-gray-500 mb-2">{description}</p> {/* Description */}
      <p className="text-lg font-semibold">{price}</p> {/* Price */}
    </div>
  );
};

export default MenuItemWithDescription;
