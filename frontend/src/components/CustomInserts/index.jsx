import React from 'react';
import CardSlider from '../common/CardSlider';
import { insert1, insert2, insert3, insert4, insert5 } from '../../assets';

const CustomInserts = () => {
  const addons = [
    { img: insert1, title: 'Foam Inserts', desc: 'Design a folding carton that suits your brand with custom sizes, prints, and eco-friendly materials.' },
    { img: insert2, title: 'Cardboard Inserts', desc: 'Prepare your products with high-quality folding carton packaging, offering durability, customization, and eco-friendly solutions.' },
    { img: insert3, title: 'Clamshell Inserts', desc: 'Settle paper is used for securing products in folding cartons, ensuring safe, organized packaging during transit.' },
    { img: insert4, title: 'Corrugated Inserts', desc: 'Add-ons for customization, branding, or packaging enhancements to meet your specific needs.' },
    { img: insert5, title: 'Eva Foam Inserts', desc: 'Enhance your packaging with spot UV coating for premium finish and visual appeal.' },
    
  ];

  return (
    <section className="pt-12 ">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Custom inserts that enhance unboxing and strengthen your brand identity.</h2>
        <p className="text-center text-gray-600 mb-12">
        Custom Packaging specializes in high-quality, tailor-made packaging solutions.
We design and manufacture packaging that fits your product and brand perfectly.
Our focus is on durability, premium presentation, and cost-effective solutions.
        </p>
        <CardSlider
          top={40}
          items={addons.map((addon, index) => (
            <div 
              key={index} 
              className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
            >
              <div 
                className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
              >
                <div className="relative mb-4">
                  <img 
                    src={addon.img} 
                    alt={addon.title} 
                    className="w-full  object-cover transform transition-transform duration-700" 
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
    </section>
  );
};

export default CustomInserts;
