import React from 'react';
import Page1 from './Page1';
import Page2 from './Page2'
import Page3 from './Page3'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page1 />} />
        <Route path='/2' element={<Page2 />} />
        <Route path='/3' element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
