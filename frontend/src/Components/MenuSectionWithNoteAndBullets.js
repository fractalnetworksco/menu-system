import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithBullets from './MenuHeaderWithBullets'; // Import MenuHeaderWithBullets

const MenuSectionWithNoteAndBullets = ({ data, descriptions, menu_note }) => {


  // Check if the items array is empty
  if (data.items.length === 0) {
    return (
      <div className="mt-8">
        {/* Use MenuHeaderWithBullets here */}
        <MenuHeaderWithBullets title={data.title} bullets={descriptions} />
        <div>No menu items available</div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex-col flex-grow flex justify-between">
      {/* Use MenuHeaderWithBullets here */}
      <MenuHeaderWithBullets title={data.title} bullets={descriptions} />
      {data && (  // Check if data exists
        <>
          {data.items.slice(0, 3).map((menuItem, index) => (  // Loop through first 3 items
            <div key={`item-${index + 1}`}>  {/* Key for first 3 items */}
              <MenuItem
                name={menuItem.name}
                description={menuItem.description}
                price={menuItem.price}
              />
            </div>
          ))}
          {menu_note && (  // Check if note exists
            <div key="note" className="note font-bold text-xl max-w-[26rem] mx-auto">
              {menu_note}
            </div>
          )}
          {data.items.slice(3).map((menuItem, index) => (  // Loop through remaining items
            <div key={`item-${index + 4}`}>  {/* Key for remaining items */}
              <MenuItem
                name={menuItem.name}
                description={menuItem.description}
                price={menuItem.price}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MenuSectionWithNoteAndBullets;
