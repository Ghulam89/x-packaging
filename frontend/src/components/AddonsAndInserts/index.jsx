import React from 'react';
import CardSlider from '../common/CardSlider';
import Tabs from '../common/Tabs';
import { special1, special2, special3, special4, special5, special6, special7, insert1, insert2, insert3, insert4, insert5 } from '../../assets';

const AddonsAndInserts = () => {
  // Add-ons data
  const addons = [
    { img: special1, title: 'Embossing', desc: 'Embossing raises your logo or artwork for a premium, tactile experience that customers can see and feel.' },
    { img: special2, title: 'Debossing', desc: 'Debossing presses your design into the material for a subtle, sophisticated, and timeless textured effect on the box.' },
    { img: special3, title: 'Custom Foiling', desc: 'Custom foiling adds metallic colored foil on the box for instant luxury that creates a brilliant and premium finish.' },
    { img: special6, title: 'Spot UV', desc: 'A PVC window adds a practical display, allowing customers to see the product inside the packaging without opening it.' },
    { img: special4, title: 'Metallic Printing', desc: 'Metallized printing uses special inks and paper to create a vibrant, shimmering metallic effect across your packaging design.' },
    { img: special5, title: 'PVC Window', desc: 'Enhance your packaging with spot UV coating for premium finish and visual appeal.' },
    { img: special7, title: 'Custom Ribbons', desc: 'Custom printed ribbons add a final touch of elegance and color, perfect for gift and luxury packaging presentations.' },
  ];

  // Inserts data
  const inserts = [
    { img: insert1, title: 'Foam Inserts', desc: 'Foam inserts cushion and secure delicate products, providing protection and a polished unboxing presentation. We make them in any color you want.' },
    { img: insert2, title: 'Cardboard Inserts', desc: 'Cardboard inserts provide structured protection and organization inside your box. These are economical and for lightweight items. We can customize them in any color.' },
    { img: insert3, title: 'Clamshell Inserts', desc: 'Clamshell inserts surround and securely display your product, perfect for a clear, retail-ready presentation. These are the best suited for bulk usage.' },
    { img: insert4, title: 'Corrugated Inserts', desc: 'Corrugated inserts are the most durable inserts that we offer in any custom design. You can trust them to fit heavy and light-weight items both.' },
    { img: insert5, title: 'Eva Foam Inserts', desc: 'It is a type of premium foam insert that gives an ultra feel to the customers. We recommend this for expensive products. It comes in natural white and black colors.' },
  ];

  // Add-ons content component
  const AddonsContent = () => (
    <div className="py-6">
      <div className='text-center mb-6'>
        <p className="pt-3 text-gray-600 pb-3 break-words">
          X Custom Packaging is one stop shop where you can add custom colored foil to your packaging, make custom-printed ribbons, do embossing and debossing, and beyond. Our premium add-ons to your packaging would be enough themselves to boost your sales, increase brand elegancy and make your presents look special.
        </p>
      </div>
      <CardSlider
        top={40}
        items={addons.map((addon, index) => (
          <div 
            key={index} 
            className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
          >
            <div 
              className="bg-[#f7f7f7] rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
            >
              <div className="relative mb-4">
                <img 
                  src={addon.img} 
                  alt={addon.title} 
                  className="w-full object-cover transform transition-transform duration-700" 
                />
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
              </div>
              <div className='px-5 pb-5 flex-1 flex flex-col'>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{addon.desc}</p>
              </div>
            </div>
          </div>
        ))}
      />
    </div>
  );

  // Inserts content component
  const InsertsContent = () => (
    <div className="py-6">
      <div className='text-center mb-6'>
        <p className="text-center text-gray-600 mb-6">
          Secure your product inside the box with the insert, which is the best fit for it. We customize a wide range of inserts, which include luxury foam, economical cardboard, durable corrugated, and premium clamshell and Eva foam inserts. We can suggest the best insert for your product while keeping in view your budget.
        </p>
      </div>
      <CardSlider
        top={40}
        items={inserts.map((insert, index) => (
          <div 
            key={index} 
            className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
          >
            <div 
              className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
            >
              <div className="relative mb-4">
                <img 
                  src={insert.img} 
                  alt={insert.title} 
                  className="w-full object-cover transform transition-transform duration-700" 
                />
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
              </div>
              <div className='px-5 pb-5 flex-1 flex flex-col'>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{insert.title}</h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{insert.desc}</p>
              </div>
            </div>
          </div>
        ))}
      />
    </div>
  );

  // Tabs data
  const tabsData = [
    {
      title: 'Our Add-ons for Premium Packaging',
      content: <AddonsContent />
    },
    {
      title: 'Get the Inserts Your Product Needs',
      content: <InsertsContent />
    }
  ];

  return (
    <section className="py-10 bg-[#f7f7f7]">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
        <div className='text-center mb-8'>
          <h2 className="sm:text-[35px] text-[25px] leading-9 font-sans font-[600] text-[#333333] break-words">
            Enhance Your Packaging Experience
          </h2>
        </div>
        <div className="pt-2 w-full overflow-hidden">
          <Tabs defaultTab={"Our Add-ons for Premium Packaging"} className={'bg-white'} tabs={tabsData} />
        </div>
      </div>
    </section>
  );
};

export default AddonsAndInserts;
