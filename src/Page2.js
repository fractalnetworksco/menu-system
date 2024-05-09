import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuItemWithDescription from './Components/MenuItemWithDescription.js';
import MenuSection from './Components/MenuSection.js';
import TriColumnSection from './Components/TriColumnSection.js';
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
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);
  const [rightColumnHeight, setRightColumnHeight] = useState(0);

  const { data: bbqData } = useQuery('bbq', () => fetchData('/data/bbq_sandwiches.json'));
  const { data: sigSandwiches } = useQuery('sigSandwiches', () => fetchData('/data/signature_dooey_sandwiches.json'));
  const { data: plattersData } = useQuery('platters', () => fetchData('/data/platters.json'));
  const { data: comboPlatterData } = useQuery('comboPlatters', () => fetchData('/data/combo_platters.json'));
  const { data: sidesData, isLoading: sidesLoading, isError: sidesError } = useQuery('sides', () => fetchData('/data/sides.json'));
  const { data: sigFries } = useQuery('sigFries', () => fetchData('/data/signature_fries.json'));
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
  const measureHeights = () => {
    if (leftColumnRef.current && rightColumnRef.current) {
      const leftHeight = leftColumnRef.current.getBoundingClientRect().height;
      const rightHeight = rightColumnRef.current.getBoundingClientRect().height;
      setLeftColumnHeight(leftHeight);
      setRightColumnHeight(rightHeight);
    }
  };

  // Wait for rendering to complete before measuring
  setTimeout(measureHeights, 0);
}, [bbqData, sigSandwiches, plattersData, comboPlatterData, sidesData, sigFries, sectionHeaders, dressingChoices, extraAddOns]);




  console.log('Left Column Height:', leftColumnHeight);
  console.log('Right Column Height:', rightColumnHeight);

  if (sectionHeadersLoading) return <div>Loading...</div>;
  if (sectionHeadersError) return <div>Error fetching section headers.</div>;

  return (
    <div className="w-5/6 mx-auto flex flex-col h-screen pb-20">
      <div className="flex flex-grow flex-col md:flex-row">
        <Column width="w-full md:w-1/2" ref={leftColumnRef}>
          <MenuSection data={{ title: "Bar B Q Sandwiches", items: bbqData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Signature Dooey Sandwiches", items: sigSandwiches }} descriptions={sectionHeaders} />
        </Column>
        <Column width="w-full md:w-1/2" ref={rightColumnRef}>
          <ImageHolder imageUrl={'/ribs.jpg'}></ImageHolder>
          <MenuSection data={{ title: "Platters", items: plattersData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Combo Platters", items: comboPlatterData }} descriptions={sectionHeaders} />
          {/* Pass the data to MenuItemWithDescription */}
          {sigFries && sigFries.map((item, index) => (
            <MenuItemWithDescription
              key={index}
              title={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
        </Column>
      </div>
      <TriColumnSection className="staic bottom-0"
        title="Sides"
        items={sidesData}
      />
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
