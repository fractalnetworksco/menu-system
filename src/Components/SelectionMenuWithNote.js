import React from 'react';

const SelectionMenuWithNote = ({ title, note, choices }) => {
  return (
    <div className="menu-section">
      <h2 className="menu-section-title">{title}</h2>
      {note && <p className="menu-section-note">{note}</p>}
      {Array.isArray(choices) && choices.map((choice, index) => (
        <div key={index} className="menu-item">
          {choice}
        </div>
      ))}
    </div>
  );
};

export default SelectionMenuWithNote;
