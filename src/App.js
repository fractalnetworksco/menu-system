import React, { useState, useEffect } from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuSection from './Components/MenuSection';
import SelectionMenu from './Components/SelectionMenu';
import SelectionMenuWithNote from './Components/SelectionMenuWithNote';
import ImageHolder from './Components/ImageHolder';

export default function App() {
  const [startersData, setStartersData] = useState([]);
  const [poboysData, setPoboysData] = useState([]);
  const [wrapsData, setWrapsData] = useState([]);
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [dressingChoices, setDressingChoices] = useState([]);
  const [extraAddOns, setExtraAddOns] = useState([]);
  const [extraAddOnsNote, setExtraAddOnsNote] = useState("");
  const [friedGrilledBurgersData, setFriedGrilledBurgersData] = useState([]); // State for Fried Grilled Burgers

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for Starters
        const startersResponse = await fetch('/data/starters.json');
        const startersData = await startersResponse.json();
        console.log('Starters data:', startersData);
        setStartersData(startersData);

        // Fetch data for Fried Grilled Burgers
        const friedGrilledBurgersResponse = await fetch('/data/fried_grilled_burgers.json');
        const friedGrilledBurgersData = await friedGrilledBurgersResponse.json();
        console.log('Fried Grilled Burgers data:', friedGrilledBurgersData);
        setFriedGrilledBurgersData(friedGrilledBurgersData);

        // Fetch data for Po Boys
        const poboysResponse = await fetch('/data/poboys.json');
        const poboysData = await poboysResponse.json();
        console.log('Poboys data:', poboysData);
        setPoboysData(poboysData);

        // Fetch data for Wraps
        const wrapsResponse = await fetch('/data/wraps.json');
        const wrapsData = await wrapsResponse.json();
        console.log('Wraps data:', wrapsData);
        setWrapsData(wrapsData);

        // Fetch data for section headers
        const sectionHeadersResponse = await fetch('/data/section_headers.json');
        const sectionHeadersData = await sectionHeadersResponse.json();
        console.log('Section headers data:', sectionHeadersData);
        setSectionHeaders(sectionHeadersData);

        // Fetch data for Dressing Choices
        const dressingChoicesResponse = await fetch('/data/border_header_with_choices.json');
        const dressingChoicesData = await dressingChoicesResponse.json();
        console.log('Dressing Choices data:', dressingChoicesData);
        const dressingChoices = dressingChoicesData.find(item => item.section === 'Dressing Choices');
        if (dressingChoices) {
          setDressingChoices(dressingChoices.choices);
        }

        // Fetch data for Extra Add Ons
        const extraAddOnsResponse = await fetch('/data/border_header_with_choices.json');
        const extraAddOnsData = await extraAddOnsResponse.json();
        console.log('Extra Add Ons data:', extraAddOnsData);
        const extraAddOns = extraAddOnsData.find(item => item.section === 'Extra Add Ons');
        if (extraAddOns) {
          setExtraAddOns(extraAddOns.choices);
          setExtraAddOnsNote(extraAddOns.note);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-5/6 mx-auto">
      <div className="mt-10px flex justify-between items-center">
        <div className="w-full h-px bg-gray-500"></div>
      </div>
      <div className="mt-8vh flex justify-between">
        <Column width="w-1/2">
          <MenuSection data={{ title: "Starters", items: startersData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Salads", items: startersData }} descriptions={sectionHeaders} />
          <SelectionMenu title="Dressing Choices" choices={dressingChoices} />
          <ImageHolder imageUrl="/salad.jpg" height="300px" />
        </Column>
        <Column width="w-1/2">
          <MenuSection data={{ title: "Fried Grilled Burgers", items: friedGrilledBurgersData }} descriptions={sectionHeaders} />
          <ImageHolder imageUrl="/poboy.jpg" height="300px" />
          <MenuSection data={{ title: "Po Boys", items: poboysData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Wraps", items: wrapsData }} descriptions={sectionHeaders} />
          <SelectionMenuWithNote title="Extra Add Ons" note={extraAddOnsNote} choices={extraAddOns} />
        </Column>
      </div>
    </div>
  );
}
