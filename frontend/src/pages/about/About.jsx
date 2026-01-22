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
import thumbnailvideo from '../../assets/images/about-imges/thumbnailvideo.webp';  
import videoabout from '../../assets/images/about-imges/videoabout.mp4';  
import xfav from '../../assets/images/about-imges/xfav.webp';

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
    <section className="bg-slate-50  px-6">
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
                className={`flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  activeImage === img.url ? 'border-lime-400 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
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
       <Banner title={"About Us"} subTitle={"About Us"}/>
      </div>

      {/* Intro Section */}
      <section className="max-w-8xl mx-auto px-10 py-16 md:py-32 flex flex-col md:flex-row items-center gap-12 b g">
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
            Crafting premium experiences
          </h2>
          <div className=' overflow-y-auto max-h-72'>
              <p className="text-gray-600 leading-relaxed text-lg  text-justify p-2">
           The production team is very efficient which helps us in completing every task in minimum time span. Timely printing and shipment are the core values of our company. Umbrella Custom Packaging takes pride in delivering the best solution at reasonable price. Cardboard boxes, Kraft boxes, corrugated boxes, window boxes, die cut boxes and wedding boxes come under our range of expertise. From these box types, we accept the responsibility to manufacture spectacular packaging for electronics, food items, toys, cosmetics, etc. You name it and we have it. Umbrella Custom Packaging is a specialist in producing catchy customizations. Die cut, embossing, perforations, laminations, UV, glossy, matte and several other options are available for the designing of your customized packaging boxes. We use environment and consumer friendly stocks for manufacturing the boxes without compromising on excellence. Our competent work force enables us presenting impeccable printed designs and styles.<br></br>Umbrella Custom Packaging has been catering the packaging needs of thousands of businesses across the globe. We have achieved a magnanimous success in short period of time due to our premium printing services, fastest turnaround, free shipping and unique customized designing. Umbrella Custom Packaging is helping many macro and mini businesses in their packaging needs. For specific events, we offer exciting favor and gift boxes with special discounts. Customer satisfaction is our top priority. To facilitate the customers by cutting down their expenses, we not only print at our in-house press in USA but also utilize the offshore printing facilities in Asia and Africa. We look forward to hear from your business in the near future. Our customer care services are available around the clock. For custom quote or inquiry, feel free to contact our representatives from Monday-Friday.
          </p>
          </div>
        
          <Button label={"Learn More About Our Journey"}/>
        </div>
      </section>

      {/* Brand Cards Section */}
<section className={`max-w-8xl mx-auto px-6 mb-24 relative overflow-hidden `} style={{backgroundImage: `url(${xfav})` }}>
  
  {/* --- LARGE BACKGROUND WATERMARKS --- */}
  {/* Left Side: Premium Quality */}
  <div className="hidden 2xl:block absolute -left-16 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
    <span className="text-[220px] font-black uppercase tracking-tighter text-slate-100/40 [writing-mode:vertical-lr] rotate-180 leading-none">
      Premium Quality
    </span>
  </div>

  {/* Right Side: Trusted Brands */}
  <div className="hidden 2xl:block absolute -right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
    <span className="text-[220px] font-black uppercase tracking-tighter text-slate-100/40 [writing-mode:vertical-lr] leading-none">
      Trusted Brands
    </span>
  </div>
  {/* ---------------------------------- */}

  <div className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">Our Premium Brands</h1>
        <p className="text-xl text-slate-600">Discover quality products that bring excellence to every industry</p>
      </div>

      <div className="flex flex-col gap-8">
        {companyLogos.map((brand, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`group relative ${isEven ? "bg-white" : "bg-slate-50/50"} 
                rounded-[2.5rem] flex flex-col md:flex-row items-center border border-slate-200/60 
                shadow-sm transition-all duration-500 hover:shadow-xl hover:scale-[1.01] overflow-hidden`}
            >
              {/* Subtle Initial behind the text in the card */}
              <div className="absolute right-8 bottom-[-20px] text-[120px] font-bold text-slate-900/[0.03] pointer-events-none uppercase">
                {brand.name.charAt(0)}
              </div>

              <div className="w-full md:w-1/3 p-6">
                <div className={`w-full h-40 md:h-48 ${brand.accentColor} rounded-3xl flex items-center justify-center overflow-hidden shadow-inner`}>
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>

              <div className="px-8 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between flex-1 gap-8 z-10">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">{brand.name}</h2>
                  <p className="text-slate-500 text-base max-w-md leading-relaxed">{brand.tagline}</p>
                </div>
               <Button
  className={`whitespace-nowrap py-3.5 px-10 ${brand.color} text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95`}
  label="Explore Products">

</Button>

                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* Gallery Section Component */}
      <CreativePackaging />

      {/* Global Stats & Footprint */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-8xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-6xl font-black text-red-500 mb-2 tracking-tighter">5+</h3>
                <p className="text-slate-300 text-sm font-bold uppercase tracking-widest leading-tight">Global Headquarters</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-6xl font-black text-slate-800 mb-2 tracking-tighter">1k+</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">Satisfied Brand Partners</p>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-red-500 font-black text-xs uppercase tracking-widest">Our Global Footprint</h2>
              <h3 className="text-slate-800 text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Operating at the speed of <span className="text-slate-400">International Commerce.</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { country: "USA", address: "9854 National Blvd #1042, Los Angeles, CA 90034", flag: "🇺🇸" },
              { country: "UK", address: "275 New North Road, Islington, Suite 1946, London", flag: "🇬🇧" },
              { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: "🇨🇦" },
              { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: "🇨🇦" },
              { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: "🇨🇦" },
              { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: "🇨🇦" },
            ].map((loc, idx) => (
              <div key={idx} className="group p-8 rounded-3xl border border-slate-100 hover:border-red-500/20 hover:bg-slate-50/50 transition-all duration-300">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{loc.flag}</div>
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