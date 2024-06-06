import './App.css';
import Column from './Components/Column.js';
import Notes from './Components/Notes.js';
import MenuSectionWithNoteAndBullets from './Components/MenuSectionWithNoteAndBullets.js';
import MenuSectionWithBullets from './Components/MenuSectionWithBullets.js';
import MenuSection from './Components/MenuSection.js';
import MenuSectionWithNote from './Components/MenuSectionWithNote.js'; // Import MenuSectionWithNote
import SelectionMenu from './Components/SelectionMenu.js';
import ImageHolder from './Components/ImageHolder.js';

function App({ data }) {
  const gulf_or_pond = data.find(section => section.name === "From the Gulf or Pond");
  const la_redfish = data.find(section => section.name === "Louisiana Redfish");
  const catfish = data.find(section => section.name === "Mississippi farm-raised catfish");
  const baskets = data.find(section => section.name === "Baskets");
  const kids = data.find(section => section.name === "Kids Menu");
  const drinks = data.find(section => section.name === "Drinks");
  const notes = data.find(section => section.name === "Notes");

  return (
    <div className="w-5/6 mx-auto flex h-screen">
      <div className="flex flex-col md:flex-row">
        <Column width="w-1/2">
          <MenuSectionWithNote data={{ title: gulf_or_pond.name, items: gulf_or_pond }} descriptions={gulf_or_pond.note} />
          <MenuSectionWithBullets data={{ title: la_redfish.name, items: la_redfish.items }} descriptions={["Fried", "Grilled", "Blackened"]} />
          <ImageHolder imageUrl={'/friedFish.jpg'}></ImageHolder>
          <MenuSectionWithNoteAndBullets data={{ title: catfish.name, items: catfish.items, }} descriptions={["Fried", "Grilled", "Blackened"]} menu_note={catfish.menu_notes[0].description } />
        </Column>
        <Column width="w-1/2">
          <ImageHolder imageUrl={'/shrimpBoil.jpg'}></ImageHolder>
          <MenuSection data={{ title: baskets.name, items: baskets.items }} descriptions={baskets.note} />
          <MenuSection data={{ title: kids.name, items: kids.items }} descriptions={kids.note} />
          <SelectionMenu title={drinks.name} choices={drinks.items} />
          <div className="text-2xl p-6 text-[#526C3F] font-bold italic">Ask us about our desserts</div>
          <Notes notes={notes.items}></Notes>
        </Column>
      </div>
    </div>
  );
}

export default App;