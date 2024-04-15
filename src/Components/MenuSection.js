import React from 'react';
import MenuItem from './MenuItem';

const MenuSection = ({ data }) => {
  console.log('right here============', data);

  // Check if the items array is empty
  if (data.items.length === 0) {
    return <div>No menu items available</div>;
  }

  return (
    <div className="mt-8">
      {data.items.map((menuItem, index) => (
        <div key={index}>
          <MenuItem
            name={menuItem.name}
            description={menuItem.description}
            price={menuItem.price}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuSection;
