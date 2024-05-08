import React from 'react';

const Notes = ({ notes }) => {
  return (
    <div className="border border-gray-800 rounded p-4 border-2"> {/* Added border-2 class for thicker border */}
      {notes.map((note, index) => (
        <div key={index} className="mb-4">
          <p className="pr-2 italic font-bold text-[#474B4E]">{note.section}: <span className="pr-2 font-normal italic text-[#474B4E]">{note.description}</span></p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
