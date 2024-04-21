import React from 'react';

const SelectionMenuWithNote = ({ title, note, choices }) => {
  return (
    <div className="mt-8 w-full">
      <div className="p-4">
        <div className="rounded border border-gray-500 mb-4 p-2">
          <h2 className="text-xl text-[#526C3F] font-semibold italic">{title}</h2>
        </div>
        {note && <p className="font-bold italic text-[#474B4E]">{note}</p>}
        <div className="mt-2">
          {choices.map((choice, index) => (
            <div key={index} className="mb-1 italic text-[#474B4E]">
              {choice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionMenuWithNote;
