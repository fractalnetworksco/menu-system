// App.js
import React, { useState, useEffect, useRef } from 'react';
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
  const [saladsData, setSaladsData] = useState([]);
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [dressingChoices, setDressingChoices] = useState([]);
  const [extraAddOns, setExtraAddOns] = useState([]);
  const [extraAddOnsNote, setExtraAddOnsNote] = useState("");
  const [friedGrilledBurgersData, setFriedGrilledBurgersData] = useState([]);

  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for Starters
        const startersResponse = await fetch('/data/starters.json');
        const startersData = await startersResponse.json();
        setStartersData(startersData);

        // Fetch data for Fried Grilled Burgers
        const friedGrilledBurgersResponse = await fetch('/data/fried_grilled_burgers.json');
        const friedGrilledBurgersData = await friedGrilledBurgersResponse.json();
        setFriedGrilledBurgersData(friedGrilledBurgersData);

        // Fetch data for Salads
        const saladsResponse = await fetch('/data/salads.json');
        const saladsData = await saladsResponse.json();
        setSaladsData(saladsData);

        // Fetch data for Po Boys
        const poboysResponse = await fetch('/data/poboys.json');
        const poboysData = await poboysResponse.json();
        setPoboysData(poboysData);

        // Fetch data for Wraps
        const wrapsResponse = await fetch('/data/wraps.json');
        const wrapsData = await wrapsResponse.json();
        setWrapsData(wrapsData);

        // Fetch data for section headers
        const sectionHeadersResponse = await fetch('/data/section_headers.json');
        const sectionHeadersData = await sectionHeadersResponse.json();
        setSectionHeaders(sectionHeadersData);

        // Fetch data for Dressing Choices
        const dressingChoicesResponse = await fetch('/data/border_header_with_choices.json');
        const dressingChoicesData = await dressingChoicesResponse.json();
        const dressingChoices = dressingChoicesData.find(item => item.section === 'Dressing Choices');
        if (dressingChoices) {
          setDressingChoices(dressingChoices.choices);
        }

        // Fetch data for Extra Add Ons
        const extraAddOnsResponse = await fetch('/data/border_header_with_choices.json');
        const extraAddOnsData = await extraAddOnsResponse.json();
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

  useEffect(() => {
    function setEqualHeight() {
      if (leftColumnRef.current && rightColumnRef.current) {
        const leftHeight = leftColumnRef.current.offsetHeight;
        const rightHeight = rightColumnRef.current.offsetHeight;
        const maxHeight = Math.max(leftHeight, rightHeight);
        leftColumnRef.current.style.height = `${maxHeight}px`;
        rightColumnRef.current.style.height = `${maxHeight}px`;
      }
    }

    // Call setEqualHeight when the window is resized
    window.addEventListener('resize', setEqualHeight);

    // Call setEqualHeight once initially
    setEqualHeight();

    // Cleanup event listener
    return () => window.removeEventListener('resize', setEqualHeight);
  }, []);

  return (
    <div className="w-5/6 mx-auto flex">
      <Column width="w-1/2" ref={leftColumnRef}>
        <MenuSection data={{ title: "Starters", items: startersData }} descriptions={sectionHeaders} />
        <MenuSection data={{ title: "Salads", items: saladsData }} descriptions={sectionHeaders} />
        <SelectionMenu title="Dressing Choices" choices={dressingChoices} />
        <ImageHolder imageUrl="/salad.jpg" height="300px" />
      </Column>
      <Column width="w-1/2" ref={rightColumnRef}>
        <MenuSection data={{ title: "Fried Grilled Burgers", items: friedGrilledBurgersData }} descriptions={sectionHeaders} />
        <ImageHolder imageUrl="/poboy.jpg" height="300px" />
        <MenuSection data={{ title: "Po Boys", items: poboysData }} descriptions={sectionHeaders} />
        <MenuSection data={{ title: "Wraps", items: wrapsData }} descriptions={sectionHeaders} />
        <SelectionMenuWithNote title="Extra Add Ons" note={extraAddOnsNote} choices={extraAddOns} />
      </Column>
    </div>
  );
}