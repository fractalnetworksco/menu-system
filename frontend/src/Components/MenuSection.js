import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithDescription from './MenuHeaderWithDescription';

const MenuSection = ({ data, descriptions }) => {
  // Check if descriptions is undefined or empty

  // if (!descriptions || descriptions.length === 0) {
  //   // Return loading or default content if descriptions is not available
  //   return (
  //     <div className="mt-8">
  //       <MenuHeaderWithDescription title={data.title} description="" />
  //       <div>No menu items available</div>
  //     </div>
  //   );
  // }

  // Assuming the first element in data contains descriptions

  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        <MenuHeaderWithDescription title={data.title} description={descriptions} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex-col flex-grow flex justify-between">
      <MenuHeaderWithDescription title={data.title} description={descriptions} />
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
