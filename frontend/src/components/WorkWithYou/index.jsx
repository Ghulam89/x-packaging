import React from 'react';
import CardSlider from '../common/CardSlider';
import { special1, special2, special3, special4, special5, special6, special7} from '../../assets';

const WorkWithYou = () => {
  const addons = [
    { img: special1, title: 'Embossing', desc: 'Design a folding carton that suits your brand with custom sizes, prints, and eco-friendly materials.' },
    { img: special2, title: 'Debossing', desc: 'Prepare your products with high-quality folding carton packaging, offering durability, customization, and eco-friendly solutions.' },
    { img: special3, title: 'Custom Foiling', desc: 'Settle paper is used for securing products in folding cartons, ensuring safe, organized packaging during transit.' },
    { img: special4, title: 'Metallic Printing', desc: 'Add-ons for customization, branding, or packaging enhancements to meet your specific needs.' },
    { img: special5, title: 'PVC Window', desc: 'Enhance your packaging with spot UV coating for premium finish and visual appeal.' },
    { img: special6, title: 'Spot UV', desc: 'Create eye-catching holographic effects that make your packaging stand out.' },
    { img: special7, title: 'Custom Ribbons', desc: 'Create eye-catching holographic effects that make your packaging stand out.' },
  ];

  return (
    <section className="pt-12 bg-[#f7f7f7]">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
      <div className=' text-center'>
      <h2 className="sm:text-[35px] text-[25px] leading-9 font-sans font-[600] text-[#333333] break-words">
          Enhance Your Product Presentation with Our Special Packaging Features
        </h2>
        <p className="pt-3 text-gray-600 pb-3 break-words">
          Following are few steps which provide the complete Guide.
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

export default WorkWithYou;
