import {React, useState} from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
const [existingData, setExistingData] = useState([]);
const { isLoading, error, data, isFetching, refetch } = useQuery({
  queryKey: ['menuData'],
  queryFn: () =>
    fetch('https://demo.test.starkville.net/menu').then((res) => {
      let data = res.json()
      setExistingData(data);
      return data;
    }).catch((error) => {
          console.error('Fetch error:', error);
          return existingData; // Return a default value or handle the error as needed
        }),
  refetchInterval: 30000, 
});


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data.</div>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 data={data}/>} />
          <Route path="/2" element={<Page2 data={data}/>} />
          <Route path="/3" element={<Page3 data={data}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
