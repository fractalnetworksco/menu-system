import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuSection from './Components/MenuSection';
import SelectionMenu from './Components/SelectionMenu';
import SelectionMenuWithNote from './Components/SelectionMenuWithNote';
import ImageHolder from './Components/ImageHolder';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const REFRESH_INTERVAL = 30000; // Refresh interval in milliseconds (30 seconds)

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const queryClient = new QueryClient();

function App() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const { data: startersData } = useQuery('starters', () => fetchData('/data/starters.json'));
  const { data: friedGrilledBurgersData } = useQuery('friedGrilledBurgers', () => fetchData('/data/fried_grilled_burgers.json'));
  const { data: saladsData } = useQuery('salads', () => fetchData('/data/salads.json'));
  const { data: poboysData } = useQuery('poboys', () => fetchData('/data/poboys.json'));
  const { data: wrapsData } = useQuery('wraps', () => fetchData('/data/wraps.json'));
  const { data: sectionHeaders, isLoading: sectionHeadersLoading, isError: sectionHeadersError } = useQuery('sectionHeaders', () => fetchData('/data/section_headers.json'));
  const { data: dressingChoices } = useQuery('dressingChoices', async () => {
    const dressingChoicesData = await fetchData('/data/border_header_with_choices.json');
    const dressingChoices = dressingChoicesData.find(item => item.section === 'Dressing Choices');
    return dressingChoices ? dressingChoices.choices : [];
  });
  const { data: extraAddOns, extraAddOnsNote } = useQuery('extraAddOns', async () => {
    const extraAddOnsData = await fetchData('/data/border_header_with_choices.json');
    const extraAddOns = extraAddOnsData.find(item => item.section === 'Extra Add Ons');
    return {
      extraAddOns: extraAddOns ? extraAddOns.choices : [],
      extraAddOnsNote: extraAddOns ? extraAddOns.note : "",
    };
  });

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchData('/data/starters.json');
      fetchData('/data/fried_grilled_burgers.json');
      fetchData('/data/salads.json');
      fetchData('/data/poboys.json');
      fetchData('/data/wraps.json');
      fetchData('/data/section_headers.json');
      fetchData('/data/border_header_with_choices.json');
    };

    const intervalId = setInterval(fetchDataPeriodically, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
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

  if (sectionHeadersLoading) return <div>Loading...</div>;
  if (sectionHeadersError) return <div>Error fetching section headers.</div>;

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

export default function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
