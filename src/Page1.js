import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const { data: extraAddOnsData } = useQuery('extraAddOns', async () => {
    const extraAddOnsData = await fetchData('/data/border_header_with_choices.json');
    const extraAddOns = extraAddOnsData.find(item => item.section === 'Extra Add Ons');
    return {
      choices: extraAddOns ? extraAddOns.choices : [],
      note: extraAddOns ? extraAddOns.note : "",
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


  if (sectionHeadersLoading) return <div>Loading...</div>;
  if (sectionHeadersError) return <div>Error fetching section headers.</div>;


  return (
    <div className="w-5/6 mx-auto flex h-screen">
      <Column width="w-1/2" >
        <MenuSection data={{ title: "Starters", items: startersData }} descriptions={sectionHeaders} />
        <MenuSection data={{ title: "Salads", items: saladsData }} descriptions={sectionHeaders} />
        <SelectionMenu title="Dressing Choices" choices={dressingChoices} />
        <ImageHolder imageUrl="/salad.jpg" height="300px" />
      </Column>
      <Column width="w-1/2" >
        <MenuSection data={{ title: "Fried Grilled Burgers", items: friedGrilledBurgersData }} descriptions={sectionHeaders} />
        <p className="pr-2 italic pb-2 pt-6 font-bold text-[#474B4E]">Add-on: <span className="pr-2 font-normal italic text-[#474B4E]">Cheese $.69, Bacon $2.69</span></p>
        <ImageHolder imageUrl="/poboy.jpg" height="300px" />
        <MenuSection data={{ title: "Po Boys", items: poboysData }} descriptions={sectionHeaders} />
        <MenuSection data={{ title: "Wraps", items: wrapsData }} descriptions={sectionHeaders} />
        <SelectionMenuWithNote title="Extra Add Ons" note={extraAddOnsData.note} choices={extraAddOnsData.choices} />

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
