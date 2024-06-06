import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithBullets from './MenuHeaderWithBullets';

const MenuSectionWithBullets = ({ data, descriptions }) => {
  // Find the description for the current section

  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        <MenuHeaderWithBullets title={data.title} bullets={descriptions} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex-col flex-grow flex justify-between">
      <MenuHeaderWithBullets title={data.title} bullets={descriptions} />
      {data.items.map((menuItem, index) => (
        <div key={index}>
          {menuItem.note ? (
            <div className="text-sm glacial-indifference-regular text-[#474B4E]">
              &bull; {menuItem.note}
            </div>
          ) : (
            <MenuItem
              name={menuItem.name}
              description={menuItem.description}
              price={menuItem.price}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuSectionWithBullets;
