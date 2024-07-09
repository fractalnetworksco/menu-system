import React from 'react';
import MenuItem from './MenuItem';
import MenuHeaderWithDescription from './MenuHeaderWithDescription';

const MenuSectionWithNote = ({ data, descriptions }) => {
  const items = data.items.items
  const menu_note = data.items.menu_notes[0].description


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
      {data && (  // Check if data exists
        <>
          <div key="first-item">  {/* Key for first item */}
            <MenuItem
              name={items[0].name}
              description={items[0].description}
              price={items[0].price}
            />
          </div>
          {menu_note && (  // Check if note exists
            <div key="note" className="note font-bold text-xl max-w-[26rem] mx-auto">
              {menu_note}
            </div>
          )}
          {items.slice(1).map((menuItem, index) => (  // Loop through remaining items
            <div key={`item-${index + 1}`}>  {/* Key for remaining items */}
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

export default MenuSectionWithNote;
