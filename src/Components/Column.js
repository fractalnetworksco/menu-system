import React from 'react';

const Column = ({ children, width }) => {
  return (
    <div className={`h-full mx-1 ${width}`}> {/* Apply width dynamically */}
      {children}
    </div>
  );
};

export default Column;
