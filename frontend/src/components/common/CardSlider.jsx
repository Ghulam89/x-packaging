import React, { useRef } from "react";
import "./CardSlider.css";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const CardSlider = ({ items, top }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstChild?.clientWidth || 200; // Default to 200 if no card is found
      container.scrollTo({
        left: container.scrollLeft - cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstChild?.clientWidth || 200; // Default to 200 if no card is found
      container.scrollTo({
        left: container.scrollLeft + cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="scroll-container sm:pl-0 pl-4 items-center gap-4 flex productOverflow  overflow-x-auto overflow-y-visible whitespace-nowrap custom-scrollbar pb-4 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items}
      </div>
      <div className="md:block hidden">
        <button
          className="arrow arrow-left absolute left-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white transition-all duration-300 group z-10"
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(-50%)" }}
          onClick={scrollLeft}
        >
          <LiaAngleLeftSolid size={24} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
        </button>
        <button
          className="arrow arrow-right absolute right-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white transition-all duration-300 group z-10"
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(-50%)" }}
          onClick={scrollRight}
        >
          <LiaAngleRightSolid size={24} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;