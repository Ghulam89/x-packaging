"use client";
import { FaAngleRight } from 'react-icons/fa';
import Banner from '@/components/shared/marketing/Banner';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/shared/ui/Button';
import { ASSETS } from '@/lib/assets';
import AboutPackagingGallery from '@/components/about/AboutPackagingGallery';
import AboutGlobalFootprint from '@/components/about/AboutGlobalFootprint';
export default function About() {
  const companyLogos = [
    {
      name: "X-Custom Packaging",
      logo:ASSETS.xcustompacakging,
      location: "Global Solutions",
      tagline: "Tailored packaging solutions designed to elevate your brand identity.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
    },
    {
      name: "Leather Jackets",
      logo:ASSETS.leatherjackets,
      location: "Premium Apparel",
      tagline: "Timeless craftsmanship meets modern style in every premium hide.",
      bgColor: "bg-slate-50", // Light grey/blue tint like the image
      textColor: "text-slate-800",
    },
    {
      name: "X-Inc",
      logo:ASSETS.xinc,
      location: "Innovation Hub",
      tagline: "Driving innovation and excellence across global enterprise sectors.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
    },
    {
      name: "X-Custom Clothing",
      logo:ASSETS.xcustomclothing,
      location: "Bespoke Fashion",
      tagline: "Bespoke apparel crafted with precision for the modern individual.",
      bgColor: "bg-slate-50",
      textColor: "text-slate-800",
    },
    {
      name: "Silks",
      logo:ASSETS.silks,
      location: "Luxury Textiles",
      tagline: "Exquisite luxury fabrics defined by elegance and superior comfort.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
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
          <div className="relative w-8/4 aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl z-0 transform -translate-x-6">
            <Image
              src={ASSETS.about.xpackaging}
              alt="Fashion showcase"
              width="1000"
              height="800"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-4 w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
            <div className="relative w-full h-full group">
              <video
                src={ASSETS.videos.about}
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
      <section className="max-w-8xl mx-auto px-6 py-16 bg-white">
      {/* Section Header */}
      
        
         <div className="sm:max-w-8xl max-w-[100%] mx-auto py-10">
          <div className=' flex sm:flex-row flex-col items-center justify-between gap-4'>
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
              <div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] text-left'>
                  Our Brand Partners
                </h2>
                <p className='text-gray-600 mt-1'>
                  We cover all your packaging needs. Can't find yours?
                </p>
              </div>
            </div>
            <Link href="#" className="group">
              <p className='font-bold text-[#EE334B] flex items-center hover:text-[#213554] transition-colors duration-300 uppercase text-sm'>
                View all <FaAngleRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
              </p>
            </Link>
          </div>
        </div>
      

      <div className="flex flex-col gap-6">
        {companyLogos.map((brand, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-hover duration-300 hover:shadow-md ${brand.bgColor}`}
          >
            {/* Content Side (Left) */}
            <div className="w-full md:w-[60%] p-8 md:p-12 order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                {brand.name}
              </h3>
              
              {/* Location/Category Pin */}
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-wider">{brand.location}</span>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {brand.tagline}
              </p>
            </div>

            {/* Logo Side (Right) */}
            <div className="w-full md:w-[40%] p-8 flex justify-center items-center order-1 md:order-2 bg-opacity-50">
               <div className="relative group">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    width="512"
                    height="384"
                    loading="lazy"
                    decoding="async"
                    className="max-w-full h-auto object-contain max-h-96 transition-transform duration-500 group-hover:scale-105"
                  />
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>

      <AboutPackagingGallery />
      <AboutGlobalFootprint />
    </div>
  );
}
