import React from 'react';
import MenuItem from './MenuItem';

const MenuSectionWithNote = ({ data, descriptions }) => {
  // Find the description for the current section
  const sectionDescription = descriptions.find(section => section.section === data.title);

  // Check if the data object exists and contains items
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
      {data.items.map((menuItem, index) => (
        <div key={index}>
          {menuItem.note ? (
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
