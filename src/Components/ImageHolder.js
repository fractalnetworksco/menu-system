import React from 'react';

const ImageHolder = ({ imageUrl, height }) => {
  return (
    <div className="mt-8 w-full">
      <img src={imageUrl} alt="Image" className="w-full" style={{ height: height }} /> {/* Set the height using inline style */}
    </div>
  );
};

export default ImageHolder;
