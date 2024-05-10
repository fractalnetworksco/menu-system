import React, { useEffect } from 'react';
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
  const { data, isLoading, isError, refetch } = useQuery('allData', async () => {
    const [
      gulfPondData,
      redfishData,
      catfishData,
      basketsData,
      notesData,
      kidsMenuData,
      drinkChoicesData,
      bulletsData,
      sectionHeadersData
    ] = await Promise.all([
      fetchData('/data/from_the_gulf_or_the_pond.json'),
      fetchData('/data/louisiana_redfish.json'),
      fetchData('/data/mississippi_catfish.json'),
      fetchData('/data/baskets.json'),
      fetchData('/data/notes_for_customer.json'),
      fetchData('/data/kids_menu.json'),
      fetchData('/data/border_header_with_choices.json'),
      fetchData('/data/three_bullet_header.json'),
      fetchData('/data/section_headers.json')
    ]);

    return {
      gulfPondData,
      redfishData,
      catfishData,
      basketsData,
      notesData,
      kidsMenuData,
      drinkChoicesData,
      bulletsData,
      sectionHeadersData
    };
  }, {
    refetchInterval: REFRESH_INTERVAL
  });

  useEffect(() => {
    // Ensure data is refetched on mount and at regular intervals
    refetch();
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  // Filter out only the choices from the "Drinks" section
  const drinkChoices = data.drinkChoicesData.find(item => item.section === 'Drinks').choices;

  return (
    <div className="w-5/6 mx-auto flex h-screen">
      <div className="flex flex-col md:flex-row">
        <Column width="w-1/2">
          <MenuSectionWithNote data={{ title: "From the Gulf or Pond", items: data.gulfPondData }} descriptions={data.sectionHeadersData} />
          <MenuSectionWithBullets data={{ title: "Louisiana Redfish", items: data.redfishData }} descriptions={data.bulletsData} />
          <ImageHolder imageUrl={'/friedFish.jpg'}></ImageHolder>
          <MenuSectionWithNoteAndBullets data={{ title: "Mississippi farm-raised catfish", items: data.catfishData }} descriptions={data.bulletsData} />
        </Column>
        <Column width="w-1/2">
          <ImageHolder imageUrl={'/shrimpBoil.jpg'}></ImageHolder>
          <MenuSection data={{ title: "Baskets", items: data.basketsData }} descriptions={data.sectionHeadersData} />
          <MenuSection data={{ title: "Kids Menu", items: data.kidsMenuData }} descriptions={data.sectionHeadersData} />
          <SelectionMenu title="Drinks" choices={drinkChoices} />
          <div className="text-2xl p-6 text-[#526C3F] font-bold italic">Ask us about our desserts</div>
          <Notes notes={data.notesData}></Notes>
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
