import React from 'react';

const SelectionMenuWithNote = ({ title, note, choices }) => {
  return (
    <div className="menu-section">
      <br></br>
      <br></br>
      <div className='border border-gray-500 mb-4 rounded inline-block px-4 py-2'>
        <h2 className="text-2xl text-[#526C3F] font-bold italic">{title}</h2>
      </div>
      {note && <p className="menu-section-note font-bold italic">{note}</p>}
      {Array.isArray(choices) && choices.map((choice, index) => (
        <div key={index} className="menu-item italic">
          {choice}
        </div>
      ))}
    </div>
  );
};

export default SelectionMenuWithNote;
