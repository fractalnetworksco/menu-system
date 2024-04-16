import React, { useState, useEffect } from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuHeader from './Components/Menu-Header.js';
import MenuSection from './Components/MenuSection'; // Import MenuSection component

export default function App() {
  const [startersData, setStartersData] = useState([]);
  const [poboysData, setPoboysData] = useState([]);

  useEffect(() => {
    const fetchStartersData = async () => {
      try {
        const response = await fetch('/data/starters.json');
        const data = await response.json();
        console.log('Starters data:', data); // Add this line to log the fetched data
        setStartersData(data);
      } catch (error) {
        console.error('Error fetching starters data:', error);
      }
    };

    const fetchPoboysData = async () => {
      try {
        const response = await fetch('/data/poboys.json');
        const data = await response.json();
        console.log('Poboys data:', data); // Add this line to log the fetched data
        setPoboysData(data);
      } catch (error) {
        console.error('Error fetching poboys data:', error);
      }
    };

    fetchStartersData();
    fetchPoboysData();
  }, []);

  return (
    <div>
      <div className="mt-20vh mx-auto w-3/4 flex justify-between items-center">
        <div className="w-1/3 h-px bg-gray-500"></div>
        <span className="text-red-700">STARKVILLE, MS</span>
        <div className="w-1/3 h-px bg-gray-500"></div>
      </div>
      <div className="mt-8vh mx-auto w-3/4 flex items-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold text-red-700">The Little Dooey</h1>
        </div>
        <div className="w-1/5 flex items-center justify-center">
          <div className="h-10 w-px bg-gray-500"></div>
        </div>
        <div className="w-1/5">
          <img src="restaurant.jpg" alt="Restaurant Image" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="mt-10px mx-auto w-3/4 flex justify-between items-center">
        <div className="w-full h-px bg-gray-500"></div>
      </div>
      <div className="mt-8vh mx-auto w-3/4 flex justify-between">
        <Column>
          <MenuSection data={{ title: "STARTERS", items: startersData }} /> {/* Pass starters data to MenuSection */}
          <MenuSection data={{ title: "POBOYS", items: poboysData }} /> {/* Pass poboys data to MenuSection */}
        </Column>
        <Column>
          <MenuSection data={{ title: "STARTERS", items: startersData }} /> {/* Pass starters data to MenuSection */}
          <MenuSection data={{ title: "POBOYS", items: poboysData }} /> {/* Pass poboys data to MenuSection */}
        </Column>
        <Column>
          <MenuSection data={{ title: "STARTERS", items: startersData }} /> {/* Pass starters data to MenuSection */}
          <MenuSection data={{ title: "POBOYS", items: poboysData }} /> {/* Pass poboys data to MenuSection */}
        </Column>
      </div>
    </div>
  );
}
