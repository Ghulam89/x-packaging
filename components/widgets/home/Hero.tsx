"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ASSETS } from "@/lib/assets";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {});
      }
    };
    v.addEventListener('loadeddata', tryPlay, { once: true });
    tryPlay();
    return () => {
      v.removeEventListener('loadeddata', tryPlay);
    };
  }, []);
  return (
    <section
      className="w-full lg:h-[75vh] h-[55vh] relative overflow-hidden"
      aria-label="Custom Packaging Hero Section"
    >
      
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={900}
      >
        <source src={ASSETS.videos.hero} type="video/mp4" />
      </video>

     
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-black/30 z-10" />

      
      <div className="relative w-full h-full flex items-center z-20">
        <div className="w-full sm:w-3/5 px-6 sm:px-8 md:px-12 lg:px-16 text-left">

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase tracking-wide leading-tight">
            The X Factor Always Delivers!
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 uppercase tracking-wide">
            Premium Custom Boxes — Priced to Impress, Delivered in Record Time.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-[#EE334B] text-white px-5 py-3 rounded-lg font-semibold"
          >
            Browse Our Catalogue
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
