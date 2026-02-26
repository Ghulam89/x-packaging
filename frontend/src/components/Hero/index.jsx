import React, { memo, useMemo } from "react";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
// import { CRITICAL_VIDEOS } from "../../hooks/usePreloadAssets";
import heroImage from '../../assets/videos/hero.mp4';
const Hero = () => {
  // const videoSrc = useMemo(() => CRITICAL_VIDEOS, []);
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
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroImage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/40 z-10" />

      
      <div className="relative w-full h-full flex items-center z-20">
        <div className="w-full sm:w-3/5 px-6 sm:px-8 md:px-12 lg:px-16 text-left">

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase tracking-wide leading-tight">
            The X Factor Always Delivers!
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 uppercase tracking-wide">
            Premium Custom Boxes — Priced to Impress, Delivered in Record Time.
          </p>

          <Link to="/shop">
            <Button
              variant="red"
              className="font-semibold"
              label="Browse Our Catalogue"
            />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
