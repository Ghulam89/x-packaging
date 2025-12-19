import React, { useState, useEffect } from "react";
import hero from "../../assets/images/banner-slider-image.webp";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showShine, setShowShine] = useState(false);

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
    <div
      className="w-full sm:h-[490px] h-[60vh] relative overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay - Gallery style - shows automatically on first load only */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent transition-opacity duration-500 ${
          isFirstLoad ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* Shine Effect - Gallery style - animates automatically on first load only */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out ${
          showShine ? 'translate-x-full' : '-translate-x-full'
        }`}
      ></div>

      <div className="sm:max-w-8xl h-full flex items-center max-w-[95%] mx-auto relative z-10">
        <div className=" max-w-xl">
          <div>
            <h1 className=" text-white">
              Custom Packaging That Defines Your Brand!
            </h1>
            <div className=" py-6">
              <p className=" text-white font-semibold">
                Celebrate the New Year with Up To 30% Off!
              </p>
              <p className=" text-white">Let's Showcase Your Brand Better</p>
            </div>
            <Link to={'/shop'}>
              <Button className="bg-white font-semibold" label="Browse Our Catalogue" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
