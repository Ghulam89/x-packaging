

// import React, { useState } from 'react'
// import { IoPlayCircleOutline } from "react-icons/io5";
// import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart';
// import { BaseUrl } from '../../utils/BaseUrl';
// import PageMetadata from '../../components/common/PageMetadata';
// import { aboutVideo, banner, Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, map } from '../../assets';

// export const About = () => {

//   const [isVideoOpen, setIsVideoOpen] = useState(false);

//   const openVideoPlayer = () => {
//     setIsVideoOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeVideoPlayer = () => {
//     setIsVideoOpen(false);
//     document.body.style.overflow = 'auto';
//   };
//   const metadata = {
//     title: "About us - Umbrella Custom Packaging",
//     description: "About us Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
//     keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
//     author: "Umbrella Custom Packaging",
//     ogUrl: `${BaseUrl}/about-us`,
//     canonicalUrl: `${BaseUrl}/about-us`,
//     ogTitle: "About us - Umbrella Custom Packaging",
//     ogDescription: "About us Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
//     modifiedTime: "2025-06-13T15:18:43+00:00",
//     twitterTitle: "About us - Umbrella Custom Packaging",
//     twitterDescription: "About us Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
//     robots: "index, follow"
//   };
//   return (
//     <>
//       <PageMetadata {...metadata} />
//       <main>
//         <div className='max-w-[1200px] mt-5 mx-auto text-center  rounded-[8px] p-5'>
//           <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
//             <div className='flex items-center justify-center h-[300px] bg-cover bg-no-repeat rounded-[8px] relative' style={{ backgroundImage: `url(${banner})` }}>
//               <button
//                 onClick={openVideoPlayer}
//                 className='p-2 rounded-full bg-[#5a56e9] hover:bg-[#4a46d9] transition-colors'
//               >
//                 <IoPlayCircleOutline size={50} color='#fff' />
//               </button>
//             </div>

//             <div className='flex flex-col items-start justify-center space-y-2'>
//               <hr className='text-gray-400 md:w-120 w-80 border-0.5' />
//               <h2 className='md:text-[36px] text-[25px]  font-[600]  opacity-70 font-sans text-start'>Umbrella Custom Packaging</h2>
//               <p className='text-[#333333] md:text-[16px] leading-6 text-[14px] text-left'>
//                 Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs.
//                 We have technologically advanced digital and offset presses. It ensures that every packaging box we print
//                 has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes.
//                 We don't charge our valued customers for design preparation
//               </p>
//             </div>
//           </div>
//           <div className=" bg-[#B8B6FA99]  grid sm:grid-cols-6  grid-cols-2 my-3.5 mt-3 p-4 rounded-md w-full">
//             <div className=" flex gap-1 items-center">
//               <img src={Icon1} width={30} alt="" />
//               <h5>Free Quote</h5>
//             </div>
//             <div className=" flex gap-1 items-center">
//               <img src={Icon2} width={30} alt="" />
//               <h5>Free Design support</h5>
//             </div>
//             <div className=" flex gap-1 items-center">
//               <img src={Icon3} width={30} alt="" />
//               <h5>Free Lamination</h5>
//             </div>
//             <div className=" flex gap-1 items-center">
//               <img src={Icon4} width={30} alt="" />
//               <h5>Free Shipping</h5>
//             </div>
//             <div className=" flex gap-1 items-center">
//               <img src={Icon5} width={30} alt="" />
//               <h5>FSC Certified</h5>
//             </div>
//             <div className=" flex gap-1 items-center">
//               <img src={Icon6} width={30} alt="" />
//               <h5>Quickest Turnaround</h5>
//             </div>
//           </div>
//           <div className='mt-5'>
//             <p className='text-left text-[16px] tracking-wide leading-6 '>The production team is very efficient which helps us in completing every task in minimum time span. Timely printing and shipment are the core values of our company. Umbrella Custom Packaging takes pride in delivering the best solution at reasonable price. Cardboard boxes, Kraft boxes, corrugated boxes, window boxes, die cut boxes and wedding boxes come under our range of expertise. From these box types, we accept the responsibility to manufacture spectacular packaging for electronics, food items, toys, cosmetics, etc. You name it and we have it. Umbrella Custom Packaging is a specialist in producing catchy customizations. Die cut, embossing, perforations, laminations, UV, glossy, matte and several other options are available for the designing of your customized packaging boxes. We use environment and consumer friendly stocks for manufacturing the boxes without compromising on excellence. Our competent work force enables us presenting impeccable printed designs and styles.<br /><br />

//               Umbrella Custom Packaging has been catering the packaging needs of thousands of businesses across the globe. We have achieved a magnanimous success in short period of time due to our premium printing services, fastest turnaround, free shipping and unique customized designing. Umbrella Custom Packaging is helping many macro and mini businesses in their packaging needs. For specific events, we offer exciting favor and gift boxes with special discounts. Customer satisfaction is our top priority. To facilitate the customers by cutting down their expenses, we not only print at our in-house press in USA but also utilize the offshore printing facilities in Asia and Africa. We look forward to hear from your business in the near future. Our customer care services are available around the clock. For custom quote or inquiry, feel free to contact our representatives from Monday-Friday.</p>
//           </div>

//           <CustomPackagingApart />
//           <div className='bg-[#F4ECFB] rounded-[8px] mt-8 p-3'>
//             <div className='grid md:grid-cols-2 grid-cols-1 space-y-2 '>
//               <div className='' >
//                 <img src={map} alt="" className='w-full' />


//               </div>
//               <div className=' flex flex-col sm:w-md w-full ml-auto justify-center items-center  gap-3'>
//                 <div className='flex sm:flex-row flex-col text-white gap-5 '>
//                   <div className='bg-[#5a56e9]  min-h-36 rounded-[8px] flex flex-col items-start p-2.5 space-y-5'>
//                     <h2 className='text-[32px] font-semibold text-white'>5+</h2>
//                     <h3 className='text-[14px] text-left text-white'>Head Quarter on Global Family</h3>
//                   </div>
//                   <div className='bg-[#5a56e9]  min-h-36  rounded-[8px] flex flex-col items-start p-2.5 space-y-5'>
//                     <h2 className='text-[32px] font-semibold text-white'>1000+</h2>
//                     <h3 className='text-[14px] text-left text-white'>Satisfied Customers All Over the Globe </h3>
//                   </div>
//                   <div></div>

//                 </div>
//               </div>


//             </div>

//             <div className='grid md:grid-cols-3 grid-cols-1 '>
//               <div className='  flex flex-col justify-center items-start p-2.5 space-y-5 md:border-r-1 border-0'>
//                 <h1 className='text-[32px] font-bold'>USA</h1>
//                 <p className='text-[14px] text-start'>9854 National Blvd #1042, Los Angeles, CA 90034, United States</p>
//               </div>
//               <div className='  flex flex-col items-start p-2.5 space-y-5 md:border-r-1 border-0'>
//                 <h1 className='text-[32px] font-bold'>Uk</h1>
//                 <p className='text-[14px] text-start'>275 New North Road Islington Suite 1946 London, N1 7AA United Kingdom</p>
//               </div>
//               <div className='  flex flex-col items-start p-2.5 space-y-5'>
//                 <h1 className='text-[32px] font-bold' >Canada</h1>
//                 <p className='text-[14px] text-start'>7398 Yonge St #6d, Thornhill, ON L4J 8J2, Canada </p>
//               </div>

//             </div>
//           </div>

//           {isVideoOpen && (
//             <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-50 flex items-center justify-center p-4 ">
//               <div className="relative w-full max-w-6xl flex flex-col h-[90vh]">

//                 <div className="flex justify-end mb-2">
//                   <button
//                     onClick={closeVideoPlayer}
//                     className=" rounded-full  cursor-pointer w-10 h-10 flex items-center justify-center"
//                     aria-label="Close video"
//                   >
//                     <h5 className="text-2xl text-white leading-none">&times;</h5>
//                   </button>
//                 </div>

//                 {/* Video Container */}
//                 <div className="flex-1 relative rounded-xl overflow-hidden bg-black">
//                   <video
//                     controls
//                     autoPlay
//                     className="w-full h-full object-contain"
//                     playsInline
//                   >
//                     <source src={aboutVideo} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>

//               </div>
//             </div>
//           )}

//         </div>
//       </main>
//     </>

//   )
// }


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
    <div> <div className="font-['Quicksand'] selection:bg-[#ee334b] selection:text-white bg-[#fdfeff] text-[#213554]">
      
    {/* --- Section 1: Hero Banner --- */}
    <div
      className="w-full min-h-[50vh] relative flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(33, 53, 84, 0.9), rgba(33, 53, 84, 0.4)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl h-full flex items-center w-full mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <nav className="flex gap-3 items-center text-white/70 mb-8 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            <Link to={'/'} className="hover:text-[#ee334b] transition-colors">
              <IoHomeOutline size={18} />
            </Link> 
            <LiaAngleRightSolid />
            <p className="text-xs uppercase font-bold tracking-[0.2em]">About Us</p>
          </nav>
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight">
            About <span className="text-[#ee334b]">Us</span>
          </h1>
          <div className="py-6">
            <p className="text-white font-semibold text-xl">We give your products the attention they deserve.</p>
            <p className="text-white/80 text-lg mt-2">Let's Showcase Your Brand Better</p>
          </div>
          <Link to={'/shop'}>
            <Button className="bg-white text-[#213554] font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all" label="Browse Our Catalogue" />
          </Link>
        </div>
      </div>
    </div>

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