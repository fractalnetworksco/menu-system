import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithDescription from './MenuHeaderWithDescription';

const MenuSectionWithNote = ({ data, descriptions }) => {
  // Find the description for the current section
  const sectionDescription = descriptions.find(section => section.section === data.title);

  // Check if the data object exists and contains items
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="mt-8">
        <MenuHeaderWithDescription title={data.title} description={sectionDescription ? sectionDescription.description : ''} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <MenuHeaderWithDescription title={data.title} description={sectionDescription ? sectionDescription.description : ''} />
      {data.items.map((menuItem, index) => (
        <div key={index}>
          {index === 0 && menuItem.note ? (
            <div className="text-center text-black mt-2">{menuItem.note}</div>
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

export default MenuSectionWithNote;
