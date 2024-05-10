import React from 'react';
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
  const { data, isLoading, isError, refetch } = useQuery('allData', async () => {
    const [
      startersData,
      friedGrilledBurgersData,
      saladsData,
      poboysData,
      wrapsData,
      sectionHeaders,
      dressingChoicesData,
      extraAddOnsData
    ] = await Promise.all([
      fetchData('/data/starters.json'),
      fetchData('/data/fried_grilled_burgers.json'),
      fetchData('/data/salads.json'),
      fetchData('/data/poboys.json'),
      fetchData('/data/wraps.json'),
      fetchData('/data/section_headers.json'),
      fetchData('/data/border_header_with_choices.json'),
      fetchData('/data/border_header_with_choices.json')
    ]);

    const dressingChoices = dressingChoicesData.find(item => item.section === 'Dressing Choices');
    const extraAddOns = extraAddOnsData.find(item => item.section === 'Extra Add Ons');

    return {
      startersData,
      friedGrilledBurgersData,
      saladsData,
      poboysData,
      wrapsData,
      sectionHeaders,
      dressingChoices: dressingChoices ? dressingChoices.choices : [],
      extraAddOns: {
        choices: extraAddOns ? extraAddOns.choices : [],
        note: extraAddOns ? extraAddOns.note : ""
      }
    };
  }, {
    refetchInterval: REFRESH_INTERVAL
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <div className="w-5/6 mx-auto flex h-screen">
      <Column width="w-1/2">
        <MenuSection data={{ title: "Starters", items: data.startersData }} descriptions={data.sectionHeaders} />
        <MenuSection data={{ title: "Salads", items: data.saladsData }} descriptions={data.sectionHeaders} />
        <SelectionMenu title="Dressing Choices" choices={data.dressingChoices} />
        <ImageHolder imageUrl="/salad.jpg" height="300px" />
      </Column>
      <Column width="w-1/2">
        <MenuSection data={{ title: "Fried Grilled Burgers", items: data.friedGrilledBurgersData }} descriptions={data.sectionHeaders} />
        <p className="pr-2 italic pb-2 pt-6 font-bold text-[#474B4E]">Add-on: <span className="pr-2 font-normal italic text-[#474B4E]">Cheese $.69, Bacon $2.69</span></p>
        <ImageHolder imageUrl="/poboy.jpg" height="300px" />
        <MenuSection data={{ title: "Po Boys", items: data.poboysData }} descriptions={data.sectionHeaders} />
        <MenuSection data={{ title: "Wraps", items: data.wrapsData }} descriptions={data.sectionHeaders} />
        <SelectionMenuWithNote title="Extra Add Ons" note={data.extraAddOns.note} choices={data.extraAddOns.choices} />
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
