import React, { useState } from 'react';
// Components
import Banner from '../../components/common/Banner';
import Button from '../../components/common/Button';

// Assets
import Leatherjackets from '../../assets/images/about-imges/leatherjackets.webp';
import xinc from '../../assets/images/about-imges/x-inc.webp';
import xcustompacakging from '../../assets/images/about-imges/xcustompacakging.webp';
import xcustomclothing from '../../assets/images/about-imges/xcustomclothing.webp';
import gallery1 from '../../assets/images/about-imges/gallery1.jpg';
import gallery2 from '../../assets/images/about-imges/gallery2.jpg';
import Silks from '../../assets/images/about-imges/Silks.webp';
import xpackaging from '../../assets/images/about-imges/xpackaging.webp';
import videoabout from '../../assets/images/about-imges/videoabout.mp4';
import usa from '../../assets/images/about-imges/usa.svg';
import uk from '../../assets/images/about-imges/uk.svg';
import canda from '../../assets/images/about-imges/canda.svg';
import australia from '../../assets/images/about-imges/australia.svg';
import uae from '../../assets/images/about-imges/uae.svg';
import chaina from '../../assets/images/about-imges/chaina.svg';


/**
 * Sub-component for the Gallery/Packaging Section
 * Separated to prevent re-render performance issues
 */
const CreativePackaging = () => {
  const images = [
    { id: 1, url: gallery1, title: "Main Display" },
    { id: 2, url: gallery2, title: "Retail Wall" },
    { id: 3, url: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=800", title: "Eco-Friendly" },
    { id: 4, url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800", title: "Box Structure" },
    { id: 5, url: "https://images.unsplash.com/photo-1512331283953-19967202267a?q=80&w=800", title: "Luxury Kit" },
  ];

  const [activeImage, setActiveImage] = useState(images[0].url);

  return (
    <section className="bg-white py-10 px-6" id='brand-details-section'>
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Creative Packaging Designs
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore a diverse range of innovative and inspiring packaging solutions from various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-xl shadow-slate-200/50 border border-lime-100">
            <div className="overflow-hidden rounded-[2rem] h-[500px]">
              <img
                src={activeImage}
                alt="Featured Packaging"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="h-1/2 group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-lime-100">
              <img src={images[1].url} alt="Detail" className="w-full h-full object-cover rounded-[1.5rem]" />
            </div>
            <div className="h-1/2 grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <img src={images[2].url} alt="Detail 2" className="w-full h-full object-cover rounded-[1.2rem]" />
              </div>
              <div className="rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <img src={images[3].url} alt="Detail 3" className="w-full h-full object-cover rounded-[1.2rem]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img.url)}
                className={`flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${activeImage === img.url ? 'border-lime-400 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default function About() {
  const companyLogos = [
    {
      name: "X-Custom Packaging",
      logo: xcustompacakging,
      tagline: "Tailored packaging solutions designed to elevate your brand identity.",
      color: "bg-[#213554]",
      accentColor: "bg-slate-100",
    },
    {
      name: "Leather Jackets",
      logo: Leatherjackets,
      tagline: "Timeless craftsmanship meets modern style in every premium hide.",
      color: "bg-[#213554]",
      accentColor: "bg-slate-100",
    },
    {
      name: "X-Inc",
      logo: xinc,
      tagline: "Driving innovation and excellence across global enterprise sectors.",
      color: "bg-[#213554]",
      accentColor: "bg-slate-100",
    },
    {
      name: "X-Custom Clothing",
      logo: xcustomclothing,
      tagline: "Bespoke apparel crafted with precision for the modern individual.",
      color: "bg-[#213554]",
      accentColor: "bg-slate-100",
    },
    {
      name: "Silks",
      logo: Silks,
      tagline: "Exquisite luxury fabrics defined by elegance and superior comfort.",
      color: "bg-[#213554]",
      accentColor: "bg-slate-100",
    },
  ];

  return (
    <div className="font-sans selection:bg-red-500 selection:text-white bg-gray-50 text-slate-800">

      {/* Hero Banner */}
      <div >
        <Banner title={"About Us"} subTitle={"About Us"} />
      </div>

      {/* Intro Section */}
      <section className="max-w-8xl mx-auto px-10 py-16 md:py-12 flex flex-col md:flex-row items-center gap-12 bg-white">
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-3/4 aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl z-0 transform -translate-x-6">
            <img
              src={xpackaging}
              alt="Fashion showcase"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-4 w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
            <div className="relative w-full h-full group">
              <video
                src={videoabout}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 scale-110"
              />
              {/* Overlay stays if you want a slight tint, or remove it for clarity */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start  space-y-6">
          <h2 className="text-5xl md:text-6xl text-gray-900 leading-tight font-bold">
            Delivering Premium Custom Packaging at Scale
          </h2>
          <div className=' overflow-y-auto max-h-48'>
            <p className="text-gray-600 leading-relaxed text-lg  text-justify p-2">
              At X Custom Packaging, we believe packaging is more than just protection—it is a powerful representation of your brand’s identity and values. With a state-of-the-art production facility and a reliable logistics network, we deliver high-quality custom packaging solutions designed to meet the evolving needs of modern businesses.

              Our advanced manufacturing capabilities allow us to produce a wide range of packaging styles, from simple and cost-effective boxes to premium, luxury packaging. We work with durable materials such as cardboard, kraft, corrugated, rigid, and specialty stocks to ensure maximum product safety and visual appeal. Whether your products are in retail, eCommerce, cosmetics, food, electronics, or promotional industries, X Custom Packaging provides tailored solutions that align perfectly with your brand.

              Efficiency and precision are at the core of our production process. Our experienced team carefully manages every stage—from structural design and printing to finishing and quality control. We offer extensive customization options, including die-cutting, embossing, debossing, foil stamping, window cutouts, UV coating, and matte or gloss lamination. These features allow businesses to create packaging that not only protects their products but also enhances customer experience and shelf presence.

              Timely delivery is one of our strongest commitments. Supported by an organized shipping and logistics system, we ensure your orders are completed and dispatched within agreed timelines. Our dependable supply chain helps businesses maintain smooth operations and meet market demands without delays. No matter the order size, we focus on consistency, accuracy, and reliability.

              At X Custom Packaging, customer satisfaction drives everything we do. We collaborate closely with our clients to understand their goals and transform ideas into packaging that leaves a lasting impression. Our dedication to quality craftsmanship, innovation, and affordability has made us a trusted partner for brands seeking dependable custom packaging solutions.
            </p>
          </div>

         <a href="#brand-details-section"> <Button label={"See Our Work in Action"} /></a>
        </div>
      </section>
      <section className="max-w-8xl mx-auto px-6 py-10 relative overflow-hidden bg-white">
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-20">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">Our Premium Brands</h1>
              <p className="text-xl text-slate-600">Discover excellence across every industry</p>
            </div>

            <div className="relative">
              {/* Central Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 hidden md:block"></div>

              <div className="flex flex-col gap-16 md:gap-10">
                {/* Process brands in pairs */}
                {[0, 2, 4].map((startIndex) => {
                  const brand1 = companyLogos[startIndex];
                  const brand2 = companyLogos[startIndex + 1];
                  const isCentered = startIndex === 4; // The 5th item logic

                  return (
                    <div key={startIndex} className="relative w-full">
                      {isCentered ? (
                        /* --- 5th BOX: CENTERED --- */
                        <div className="flex justify-center w-full relative">
                          {/* Central Dot for 5th item */}
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-20">
                            <div className="w-6 h-6 bg-white rounded-full border-[4px] border-slate-800 shadow-md"></div>
                          </div>

                          <div className="w-full md:w-[60%] lg:w-[50%] group relative bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className={`w-32 h-32 mb-8 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-inner border border-slate-100 ${brand1?.accentColor || 'bg-slate-50'}`}>
                              <img src={brand1?.logo} alt={brand1?.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-4">{brand1?.name}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">{brand1?.tagline}</p>
                            <div className="absolute right-8 bottom-4 text-8xl font-bold text-slate-900/[0.03] pointer-events-none uppercase">
                              {brand1?.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* --- PAIRS: FRONT TO FRONT --- */
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-0 relative">
                          {/* Central Dot for Pair */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-20">
                            <div className="w-6 h-6 bg-white rounded-full border-[4px] border-slate-800 shadow-md"></div>
                          </div>

                          {/* Left Card */}
                          <div className="w-full md:w-[45%] group relative bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className={`w-32 h-32 mb-2 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-inner border border-slate-100 ${brand1?.accentColor || 'bg-slate-50'}`}>
                              <img src={brand1?.logo} alt={brand1?.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-4">{brand1?.name}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">{brand1?.tagline}</p>
                            <div className="absolute right-8 bottom-4 text-8xl font-bold text-slate-900/[0.03] pointer-events-none uppercase">
                              {brand1?.name.charAt(0)}
                            </div>
                          </div>

                          {/* Right Card */}
                          <div className="w-full md:w-[45%] group relative bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            {brand2 && (
                              <>
                                <div className={`w-32 h-32 mb-2 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-inner border border-slate-100 ${brand2.accentColor || 'bg-slate-50'}`}>
                                  <img src={brand2.logo} alt={brand2.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-4">{brand2.name}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed">{brand2.tagline}</p>
                                <div className="absolute right-8 bottom-4 text-8xl font-bold text-slate-900/[0.03] pointer-events-none uppercase">
                                  {brand2.name.charAt(0)}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section Component */}
      <CreativePackaging />

      {/* Global Stats & Footprint */}
     <section className="py-24 px-6 relative overflow-hidden bg-white">
  <div className="max-w-8xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-6xl font-black text-red-500 mb-2 tracking-tighter">5+</h3>
          <p className="text-slate-300 text-sm font-bold uppercase tracking-widest leading-tight">
            Global Headquarters
          </p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-6xl font-black text-slate-800 mb-2 tracking-tighter">1k+</h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">
            Satisfied Brand Partners
          </p>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-red-500 font-black text-xs uppercase tracking-widest">Our Global Footprint</h2>
        <h3 className="text-slate-800 text-4xl lg:text-5xl font-black leading-tight tracking-tight">
          Operating at the speed of <span className="text-slate-400">International Commerce.</span>
        </h3>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { country: "USA", address: "9854 National Blvd #1042, Los Angeles, CA 90034", flag: usa },
        { country: "UK", address: "275 New North Road, Islington, Suite 1946, London", flag: uk },
        { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: chaina }, // Fixed variable name
        { country: "Australia", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: australia },
        { country: "UAE", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: uae },
        { country: "China", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: chaina }, // Fixed variable name
      ].map((loc, idx) => (
        <div key={idx} className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-red-500/20 hover:bg-slate-50/50 transition-all duration-300">
          <div className="mb-4 flex justify-start items-start  transition-all">
            {/* Added fixed width/height to image to prevent layout breaking */}
            <img src={loc.flag} alt={`${loc.country} flag`} className="w-12 h-8 object-contain" />
          </div>
          <h4 className="text-2xl font-black mb-3">{loc.country}</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{loc.address}</p>
          <div className="w-10 h-1 bg-slate-200 group-hover:w-full group-hover:bg-red-500 transition-all duration-500"></div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}