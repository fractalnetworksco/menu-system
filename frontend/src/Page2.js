import './App.css';
import Column from './Components/Column.js';
import MenuItemWithDescription from './Components/MenuItemWithDescription.js';
import MenuSection from './Components/MenuSection.js';
import TriColumnSection from './Components/TriColumnSection.js';
import ImageHolder from './Components/ImageHolder.js';

function App({ data }) {
    const bbq = data.find(section => section.name === "Bar B Q Sandwiches");
    const sigSandwiches = data.find(section => section.name === "Signature Dooey Sandwiches");
    const platters = data.find(section => section.name === "Platters");
    const comboPlatters = data.find(section => section.name === "Combo Platters");
    const sides = data.find(section => section.name === "Sides");
    const signature_fries = data.find(section => section.name === "Signature Fries");
    const sig_fries = signature_fries.items[0]
  

  return (
    <div className="w-5/6 mx-auto flex flex-col h-screen pb-20">
      <div className="flex flex-grow flex-col md:flex-row">
        <Column width="w-full md:w-1/2">
          <MenuSection data={{ title: bbq.name, items: bbq.items }} descriptions={bbq.note} />
          <MenuSection data={{ title: sigSandwiches.name, items: sigSandwiches.items }} descriptions={sigSandwiches.note} />
        </Column>
        <Column width="w-full md:w-1/2">
          <ImageHolder imageUrl={'/ribs.jpg'}></ImageHolder>
          <MenuSection data={{ title: platters.name, items: platters.items }} descriptions={platters.note} />
          <MenuSection data={{ title: comboPlatters.name, items: comboPlatters.items }} descriptions={comboPlatters.note} />
          <MenuItemWithDescription
            title={sig_fries.name}
            description={sig_fries.description}
            price={sig_fries.price}
          />
        </Column>
      </div>
      <TriColumnSection className="staic bottom-0"
        title="Sides"
        items={sides.items}
      />
    </div>
  );
}

export default App;
