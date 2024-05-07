import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Column from './Components/Column.js';
import Notes from './Components/Notes.js';
import MenuSectionWithNoteAndBullets from './Components/MenuSectionWithNoteAndBullets.js';
import MenuSectionWithBullets from './Components/MenuSectionWithBullets.js';
import MenuSection from './Components/MenuSection.js';
import MenuSectionWithNote from './Components/MenuSectionWithNote.js'; // Import MenuSectionWithNote
import SelectionMenu from './Components/SelectionMenu.js';
import ImageHolder from './Components/ImageHolder.js';
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

  const { data: gulfPondData } = useQuery('gulfPond', () => fetchData('/data/from_the_gulf_or_the_pond.json'));
  const { data: redfishData } = useQuery('redfish', () => fetchData('/data/louisiana_redfish.json'));
  const { data: catfishData } = useQuery('catfish', () => fetchData('/data/mississippi_catfish.json'));
  const { data: basketsData } = useQuery('baskets', () => fetchData('/data/baskets.json'));
  const { data: notes } = useQuery('notes', () => fetchData('/data/notes_for_customer.json'));
  const { data: kidsMenu } = useQuery('kidsMenu', () => fetchData('/data/kids_menu.json'));
    const { data: drinkChoices } = useQuery('drinkChoices', async () => {
    const drinksData = await fetchData('/data/border_header_with_choices.json');
    const drinks = drinksData.find(item => item.section === 'Drinks');
    return drinks ? drinks.choices : [];
    });


  const { data: bullets } = useQuery('bullets', () => fetchData('/data/three_bullet_header.json'));
  const { data: sectionHeaders, isLoading: sectionHeadersLoading, isError: sectionHeadersError } = useQuery('sectionHeaders', () => fetchData('/data/section_headers.json'));
  console.log('catfish here', catfishData);

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchData('/data/from_the_gulf_or_the_pond.json');
      fetchData('/data/louisiana_redfish.json');
      fetchData('/data/baskets.json');
      fetchData('/data/kids_menu.json');
      fetchData('/data/notes_for_customer.json');
      fetchData('/data/border_header_with_choices.json');
      fetchData('/data/mississippi_catfish.json');
      fetchData('/data/three_bullet_header.json');
      fetchData('/data/section_headers.json');
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
    <div className="w-5/6 mx-auto flex flex-col">
      <div className="flex flex-col md:flex-row">
        <Column width="w-full md:w-1/2">
          {/* Replace MenuSection with MenuSectionWithNote */}
          <MenuSectionWithNote data={{ title: "From the Gulf or Pond", items: gulfPondData }} descriptions={sectionHeaders} />
          <MenuSectionWithBullets data={{ title: "Louisiana Redfish", items: redfishData }} descriptions={bullets} />
          <ImageHolder imageUrl={'/friedFish.jpg'}></ImageHolder>
          <MenuSectionWithNoteAndBullets data={{ title: "Mississippi farm-raised catfish", items: catfishData }} descriptions={bullets} />
        </Column>
        <Column width="w-full md:w-1/2">
          <ImageHolder imageUrl={'/shrimpBoil.jpg'}></ImageHolder>
          <MenuSection data={{ title: "Baskets", items: basketsData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Kids Menu", items: kidsMenu }} descriptions={sectionHeaders} />
          <SelectionMenu title="Drinks" choices={drinkChoices} />
          <div className="text-2xl text-[#526C3F] font-bold italic">Ask us about our desserts</div>
          <Notes notes={notes}></Notes>
        </Column>
      </div>
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
