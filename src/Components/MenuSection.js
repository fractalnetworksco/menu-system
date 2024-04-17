import React from 'react';
import MenuItem from './MenuItem';
import MenuHeader from './Menu-Header'; // Import MenuHeader component

const MenuSection = ({ data }) => {
  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        <MenuHeader title={data.title} /> {/* Render MenuHeader with the section title */}
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <MenuHeader title={data.title} /> {/* Render MenuHeader with the section title */}
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
