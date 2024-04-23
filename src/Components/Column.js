import React from 'react';
import '../Column.css'; // Import the corresponding CSS file

const Column = ({ children }) => {
  return (
    <div className="column">
      {children}
    </div>
  );
};

export default Column;