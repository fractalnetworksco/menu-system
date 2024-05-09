import React, { useEffect } from 'react';
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
  const { data: bbqData } = useQuery('bbq', () => fetchData('/data/bbq_sandwiches.json'));
  const { data: sigSandwiches } = useQuery('sigSandwiches', () => fetchData('/data/signature_dooey_sandwiches.json'));
  const { data: plattersData } = useQuery('platters', () => fetchData('/data/platters.json'));
  const { data: comboPlatterData } = useQuery('comboPlatters', () => fetchData('/data/combo_platters.json'));
  const { data: sidesData, isLoading: sidesLoading, isError: sidesError } = useQuery('sides', () => fetchData('/data/sides.json'));
  const { data: sigFries } = useQuery('sigFries', () => fetchData('/data/signature_fries.json'));
  const { data: sectionHeaders, isLoading: sectionHeadersLoading, isError: sectionHeadersError } = useQuery('sectionHeaders', () => fetchData('/data/section_headers.json'));

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchData('/data/bbq_sandwiches.json');
      fetchData('/data/signature_dooey_sandwiches.json');
      fetchData('/data/platters.json');
      fetchData('/data/combo_platters.json');
      fetchData('/data/sides.json');
      fetchData('/data/signature_fries.json');
      fetchData('/data/section_headers.json');
    };

    const intervalId = setInterval(fetchDataPeriodically, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  if (sectionHeadersLoading) return <div>Loading...</div>;
  if (sectionHeadersError) return <div>Error fetching section headers.</div>;

  return (
    <div className="w-5/6 mx-auto flex flex-col h-screen pb-20">
      <div className="flex flex-grow flex-col md:flex-row">
        <Column width="w-full md:w-1/2">
          <MenuSection data={{ title: "Bar B Q Sandwiches", items: bbqData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Signature Dooey Sandwiches", items: sigSandwiches }} descriptions={sectionHeaders} />
        </Column>
        <Column width="w-full md:w-1/2">
          <ImageHolder imageUrl={'/ribs.jpg'}></ImageHolder>
          <MenuSection data={{ title: "Platters", items: plattersData }} descriptions={sectionHeaders} />
          <MenuSection data={{ title: "Combo Platters", items: comboPlatterData }} descriptions={sectionHeaders} />
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
