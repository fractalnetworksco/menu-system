import React, { useState, useEffect } from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuHeader from './Components/Menu-Header.js';
import TopLine from './Components/TopLine.js';
import MenuSection from './Components/MenuSection'; // Import MenuSection component
import RestaurantHeader from './Components/RestaurantHeader.js';

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
    <div className="w-5/6 mx-auto"> {/* Adjust the width here and add mx-auto for centering */}
      <div className="mt-10px flex justify-between items-center">
        <div className="w-full h-px bg-gray-500"></div>
      </div>
      <div className="mt-8vh flex justify-between">
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
