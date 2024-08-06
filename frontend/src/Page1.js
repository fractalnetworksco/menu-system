import React from 'react';
import './App.css';
import Column from './Components/Column.js';
import MenuSection from './Components/MenuSection';
import SelectionMenu from './Components/SelectionMenu';
import SelectionMenuWithNote from './Components/SelectionMenuWithNote';
import ImageHolder from './Components/ImageHolder';

function App({ data }) {
  const starters = data.find(section => section.name === "Starters");
  const salads = data.find(section => section.name === "Salads");
  const dressings = data.find(section => section.name === "Dressing Choices");
  const burgers = data.find(section => section.name === "Fired Grilled Burgers");
  const poboys = data.find(section => section.name === "Po Boys");
  const wraps = data.find(section => section.name === "Wraps");
  const addons = data.find(section => section.name === "Extra Add Ons");

  return (
    <div className="w-5/6 mx-auto flex h-screen">
      <Column width="w-1/2">
        <MenuSection data={{ title: starters.name, items: starters.items }} descriptions={starters.note} /> 
        <MenuSection data={{ title: salads.name, items: salads.items }} descriptions={salads.note} />
        <SelectionMenu title={dressings.name} choices={dressings.items} />
        <ImageHolder imageUrl="/salad.jpg" height="300px" />
      </Column>

      <Column width="w-1/2">
        <MenuSection data={{ title: burgers.name, items: burgers.items }} descriptions={burgers.note} />
        <p className="pr-2 italic pb-2 pt-6 font-bold text-[#474B4E]">Add-on: <span className="pr-2 font-normal italic text-[#474B4E]">Cheese $.50, Bacon $1.69</span></p>
        <ImageHolder imageUrl="/poboy.jpg" height="300px" />
        <MenuSection data={{ title: poboys.name, items: poboys.items }} descriptions={poboys.note} />
        <MenuSection data={{ title: wraps.name, items: wraps.items }} descriptions={wraps.note} />
        <br></br>
        <SelectionMenuWithNote title={addons.name} note={addons.note} choices={addons.items} />
      </Column>
    </div>
  );
}

export default App;