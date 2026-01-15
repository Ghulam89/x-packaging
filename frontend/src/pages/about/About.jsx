
import React from 'react'
import AboutBanner from '../../components/common/AboutBanner'
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5';
import { LiaAngleRightSolid } from 'react-icons/lia';

// Components
import Button from '../../components/common/Button';
import Capabilities from '../../components/Capabilities';
import SampleKit from '../../components/SampleKit';

// Assets
import hero from "../../assets/images/banner-slider-image.webp";
import companyLogo from '../../assets/images/companies.png';
const About = () => {
  return (
   <div className="font-['Quicksand'] selection:bg-[#ee334b] selection:text-white bg-[#fdfeff] text-[#213554]">
      
    {/* --- Section 1: Hero Banner --- */}
    <div
      className="w-full min-h-[30vh] relative flex items-center overflow-hidden"
      style={{
        backgroundColor: "#213554",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl  flex items-center justify-center w-full mx-auto px-6 relative z-10 h-16">
      
        
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight text-center">
            About Us</h1>
        
      
      </div>
    </div>
    <section className="max-w-8xl mx-auto  py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 ">
      
      {/* --- Image Section (Left) --- */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center">
        {/* Main/Bottom Large Image */}
        <div className="relative w-3/4 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl z-0 transform -translate-x-6">
          <img 
            src="https://images.unsplash.com/photo-1540959733332-e94e1bf32f38?auto=format&fit=crop&q=80&w=800" 
            alt="Traveler exploring" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Floating Video/Image with Play Button */}
        <div className="absolute top-0 right-4 w-3/5 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
          <div className="relative w-full h-full group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" 
              alt="Temple landscape" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div className="w-14 h-14 flex items-center justify-center bg-white/90 rounded-full shadow-lg">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements could be added here (like the prayer flags in your image) */}
      </div>

      {/* --- Text Section (Right) --- */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-6">
        <h2 className="text-9xl md:text-10xl text-gray-900 leading-tight">
          Crafting <span className="italic  text-7xl font-medium">travel</span> <br />
          experiences
        </h2>
        
        <p className="text-gray-600 leading-relaxed text-lg max-w-lg">
          We are passionate about crafting extraordinary travel experiences that leave a lasting impact. 
          With years of expertise, we have honed the art of live curating unique journeys that blend adventure, 
          culture, and sustainability. Our mission is to connect travelers with the world's wonders while 
          preserving its beauty for generations to come.
        </p>

        <button className="flex items-center gap-3 bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all group">
          Explore Now
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
      
    </section>

    {/* --- Section 2: Editorial Story Section --- */}
    <section className="max-w-8xl mx-auto px-6 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 relative group order-2 lg:order-1">
          <div className="absolute -inset-4 bg-slate-100 rounded-[50px] -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
          <div className="relative bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100">
            <img src={companyLogo} alt="Logo" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
          <h2 className="text-[#213554] font-black text-4xl lg:text-6xl leading-[1.1] tracking-tighter">
            Packaging That Turns <br /> <span className="text-[#ee334b]">Browsers into Buyers</span>
          </h2>
          <div className="text-slate-600 space-y-6 text-lg leading-relaxed">
            <p className="font-bold text-[#213554] text-xl">At X Custom Packaging, we believe packaging is more than a box—it’s your brand’s first physical touchpoint.</p>
            <p>Since 2017, we’ve scaled from a specialized startup to a global powerhouse trusted by <strong>5,000+ brands</strong>.</p>
            <div className="relative py-10 px-8 bg-slate-50 rounded-3xl border-l-4 border-[#ee334b]">
              <p className="italic text-[#213554] text-xl relative z-10 font-medium">"We didn’t grow by just selling boxes. We grew by solving complex structural problems and treating every brand like it’s our own."</p>
              <p className="font-black text-[#ee334b] mt-4 uppercase tracking-widest text-xs">— M.Junaid Badil, CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* --- Section 3: Professional Capabilities --- */} 
    <div className="bg-slate-50 py-24 border-y border-slate-100">
      <Capabilities />
    </div>

    {/* --- Section 4: Global Stats & Presence (Modernized) --- */}
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#ee334b] opacity-[0.03] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#213554] p-8 rounded-[2rem] text-white shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-6xl font-black text-[#ee334b] mb-2 tracking-tighter">5+</h3>
              <p className="text-slate-300 text-sm font-bold uppercase tracking-widest leading-tight">
                Global <br /> Headquarters
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-6xl font-black text-[#213554] mb-2 tracking-tighter">1k+</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">
                Satisfied <br /> Brand Partners
              </p>
            </div>
          </div>

          {/* Section Header */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-[#ee334b] font-black text-xs uppercase tracking-[0.4em]">Our Global Footprint</h2>
            <h3 className="text-[#213554] text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Operating at the speed of <br /> 
              <span className="text-slate-400">International Commerce.</span>
            </h3>
            <p className="text-slate-500 text-lg max-w-xl">
              Strategic hubs positioned across three continents to ensure 
              localized service with a global distribution reach.
            </p>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              country: "USA", 
              address: "9854 National Blvd #1042, Los Angeles, CA 90034",
              flag: "🇺🇸" 
            },
            { 
              country: "UK", 
              address: "275 New North Road, Islington, Suite 1946, London",
              flag: "🇬🇧" 
            },
            { 
              country: "Canada", 
              address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2",
              flag: "🇨🇦" 
            }
          ].map((loc, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-slate-100 hover:border-[#ee334b]/20 hover:bg-slate-50/50 transition-all duration-300 relative">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{loc.flag}</div>
              <h4 className="text-2xl font-black mb-3 group-hover:text-[#ee334b] transition-colors">{loc.country}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{loc.address}</p>
              <div className="w-10 h-1 bg-slate-200 group-hover:w-full group-hover:bg-[#ee334b] transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>


  
  </div>
  )
}

export default About