
import React from 'react';

const RestaurantHeader = () => {
  return (
    <div className="mt-8vh mx-auto w-3/4 flex items-center">
      <div className="w-4/5">
        <h1 className="text-7xl font-bold text-red-700 brush-script">The Little Dooey</h1>
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <div className="h-10 w-px bg-gray-500"></div>
      </div>
      <div className="w-1/5">
        <img src="restaurant.jpg" alt="Restaurant Image" className="h-full w-full object-cover" />
      </div>
    </div> 
  );
};

export default RestaurantHeader;
