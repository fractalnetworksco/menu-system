import React from 'react';

const Column = ({ children }) => {
  return (
    <div className="h-full border border-green-300 mx-1">
      {children}
    </div>
  );
};

export default Column;
