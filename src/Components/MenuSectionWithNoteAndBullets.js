import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithBullets from './MenuHeaderWithBullets'; // Import MenuHeaderWithBullets

const MenuSectionWithNoteAndBullets = ({ data, descriptions }) => {
  // Find the description for the current section
  const sectionDescription = descriptions.find(section => section.section === data.title);

  // Find the note for the current section
  const sectionNote = data.items.find(item => item.note); // Find the first item with a note


  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        {/* Use MenuHeaderWithBullets here */}
        <MenuHeaderWithBullets title={data.title} bullets={sectionDescription ? sectionDescription.bullets : []} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex-col flex-grow flex justify-between">
      {/* Use MenuHeaderWithBullets here */}
      <MenuHeaderWithBullets title={data.title} bullets={sectionDescription ? sectionDescription.bullets : []} />
      {data.items.map((menuItem, index) => (
        <div key={index}>
          {menuItem.note && (
            <div className="note font-bold text-xl max-w-[16rem] mx-auto">{menuItem.note}</div>
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

export default MenuSectionWithNoteAndBullets;
