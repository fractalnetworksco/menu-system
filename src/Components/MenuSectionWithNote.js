// MenuSectionWithNote.js
import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithDescription from './MenuHeaderWithDescription';

const MenuSectionWithNote = ({ data, descriptions }) => {
  // Find the description for the current section
  const sectionDescription = descriptions.find(section => section.section === data.title);

  // Find the note for the current section
  const sectionNote = data.items.find(item => item.note); // Find the first item with a note


  // Check if the items array is empty
  if (data.items.length === 0) {
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
          {menuItem.note && (
            <div className="note font-bold">{menuItem.note}</div>
          )}
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

export default MenuSectionWithNote;
