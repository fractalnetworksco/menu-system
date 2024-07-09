import React from 'react';

const SelectionMenuWithNote = ({ title, note, choices }) => {
  return (
    <div className="menu-section">
      <div className='border border-gray-500 mb-4 rounded inline-block px-4 py-2'>
        <h2 className="text-3xl text-[#526C3F] font-bold italic">{title}</h2>
      </div>

      {/* Show note conditionally based on its existence */}
      {note && (
        <p className="menu-section-note text-xl text-[#474B4E] font-bold italic">{note}</p>
      )}

      {/* Handle cases where note might be missing */}
      {!note && <p className="menu-section-note text-xl text-[#474B4E] font-bold italic">No Note Available</p>}

      {Array.isArray(choices) && choices.map((choice, index) => (
        <div key={index} className="menu-item">
          <span className="menu-item-name">{choice.name}</span>
          <span className="menu-item-price">  ${choice.price}</span>  
        </div>
      ))}
    </div>
  );
};

export default SelectionMenuWithNote;
