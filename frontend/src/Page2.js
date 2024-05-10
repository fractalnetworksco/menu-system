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
  const { data, isLoading, isError, refetch } = useQuery('allData', async () => {
    const [
      bbqData,
      sigSandwiches,
      plattersData,
      comboPlatterData,
      sidesData,
      sigFries,
      sectionHeadersData
    ] = await Promise.all([
      fetchData('/data/bbq_sandwiches.json'),
      fetchData('/data/signature_dooey_sandwiches.json'),
      fetchData('/data/platters.json'),
      fetchData('/data/combo_platters.json'),
      fetchData('/data/sides.json'),
      fetchData('/data/signature_fries.json'),
      fetchData('/data/section_headers.json')
    ]);

    return {
      bbqData,
      sigSandwiches,
      plattersData,
      comboPlatterData,
      sidesData,
      sigFries,
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

  return (
    <div className="w-5/6 mx-auto flex flex-col h-screen pb-20">
      <div className="flex flex-grow flex-col md:flex-row">
        <Column width="w-full md:w-1/2">
          <MenuSection data={{ title: "Bar B Q Sandwiches", items: data.bbqData }} descriptions={data.sectionHeadersData} />
          <MenuSection data={{ title: "Signature Dooey Sandwiches", items: data.sigSandwiches }} descriptions={data.sectionHeadersData} />
        </Column>
        <Column width="w-full md:w-1/2">
          <ImageHolder imageUrl={'/ribs.jpg'}></ImageHolder>
          <MenuSection data={{ title: "Platters", items: data.plattersData }} descriptions={data.sectionHeadersData} />
          <MenuSection data={{ title: "Combo Platters", items: data.comboPlatterData }} descriptions={data.sectionHeadersData} />
          {data.sigFries && data.sigFries.map((item, index) => (
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
        items={data.sidesData}
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
