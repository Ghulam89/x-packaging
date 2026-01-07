import React, { useState, useEffect } from "react";
import hero from "../../assets/images/banner-slider-image.webp";
import videoSrc from "../../assets/videos/main-banner-video.mp4";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showShine, setShowShine] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload hero image for faster FCP
  useEffect(() => {
    const heroImage = new Image();
    heroImage.onload = () => setImageLoaded(true);
    heroImage.src = hero;
  }, []);

  useEffect(() => {
    // Show gallery effect automatically on first load
    if (isFirstLoad) {
      // Start shine animation after a small delay
      const shineTimer = setTimeout(() => {
        setShowShine(true);
      }, 100);
      
      // Hide effects after 3 seconds
      const hideTimer = setTimeout(() => {
        setIsFirstLoad(false);
        setShowShine(false);
      }, 3000);
      
      return () => {
        clearTimeout(shineTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isFirstLoad]);

  return (
    <div className="w-full sm:h-[490px] h-[60vh] bg-[#213554] relative overflow-hidden">
      <div className=" w-full h-full flex flex-col sm:flex-row items-center  mx-auto relative z-10">
        {/* Left Side - Text Content */}
        <div className="flex-1 flex items-center sm:pr-8 py-8 sm:py-0">
          <div className="max-w-2xl mx-auto">
            <div>
              <h1 className="text-white">
                Custom Boxes at Unbeatable Prices with Faster Lead Time
              </h1>
              <div className="py-6">
               
                <p className="text-white">From free design support to low minimums, fast production and express delivery within 7 days, we make custom boxes easy and affordable</p>
              </div>
              <Link to={'/shop'}>
                <Button className="bg-[#EE334B] font-semibold" label="Browse Our Catalogue" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Video */}
        <div className="flex-1 w-full sm:w-auto h-full flex items-center justify-center">
          <div className="relative w-full h-full max-h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Shine Effect - Gallery style - animates automatically on first load only */}
            {/* <div 
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out pointer-events-none ${
                showShine ? 'translate-x-full' : '-translate-x-full'
              }`}
            ></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
