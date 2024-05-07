import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithBullets from './MenuHeaderWithBullets';

const MenuSectionWithBullets = ({ data, descriptions }) => {
  // Find the description for the current section
  const sectionDescription = descriptions.find(section => section.section === data.title);

  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        <MenuHeaderWithBullets title={data.title} bullets={sectionDescription ? sectionDescription.bullets : []} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <MenuHeaderWithBullets title={data.title} bullets={sectionDescription ? sectionDescription.bullets : []} />
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
