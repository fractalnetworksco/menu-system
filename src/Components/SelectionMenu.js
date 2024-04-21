import React from 'react';

const SelectionMenu = ({ title, choices }) => {
  return (
    <div className="mt-8 w-full">
      <div className="p-4">
        <div className="border border-gray-500 mb-4 rounded inline-block p-2">
          <h2 className="text-2xl text-[#526C3F] font-bold italic">{title}</h2> {/* Larger font for title */}
        </div>
        <div className="text-sm"> {/* Small font for descriptions */}
          <div className="flex flex-wrap justify-center">
            {choices.map((choice, index) => (
              <React.Fragment key={index}>
                <div className="pr-2 italic text-[#474B4E]">{choice}</div>
                {index !== choices.length - 1 && <div className="pr-2 text-[#474B4E]">&middot;</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionMenu;
