import React from 'react';
import img1 from '../../assets/images/Design.webp';
import img2 from '../../assets/images/prepare.webp';
import img3 from '../../assets/images/Settle Paper.webp';
import img4 from '../../assets/images/Settle Paper.webp';

const WorkWithYou = () => {
  const addons = [
    { img: img1, title: 'Design', desc: 'Design a folding carton that suits your brand with custom sizes, prints, and eco-friendly materials.' },
    { img: img2, title: 'Prepare', desc: 'Prepare your products with high-quality folding carton packaging, offering durability, customization, and eco-friendly solutions.' },
    { img: img3, title: 'Settle Paper', desc: 'Settle paper is used for securing products in folding cartons, ensuring safe, organized packaging during transit.' },
    { img: img4, title: 'Extra', desc: 'Add-ons for customization, branding, or packaging enhancements to meet your specific needs.' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">How We Work With You</h2>
        <p className="text-center text-gray-600 mb-12">
          We are in the China-based Folding Carton packaging manufacturing industry. Experienced staff, advanced technology, and custom designs to produce high-quality Folding Cartons.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
            >
              <div className="relative   mb-4">
                <img 
                  src={addon.img} 
                  alt={addon.title} 
                  className="w-full h-44 object-cover transform  transition-transform duration-700" 
                />
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
              </div>
             <div className=' px-5 pb-5'>
             <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h3>
             <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">{addon.desc}</p>
             </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkWithYou;
