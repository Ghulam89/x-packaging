import React, { useRef } from "react";
import "./CardSlider.css";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const CardSlider = ({ items, top }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="scroll-container items-center gap-4 flex productOverflow overflow-x-auto whitespace-nowrap"
      >
        {items}
      </div>
      <div className="md:block hidden">
        <button
          className={`arrow arrow-left absolute left-1 cursor-pointer rounded-full flex justify-center items-center bg-white hover:bg-[#EE334B] hover:shadow-lg w-12 h-12 hover:text-white`}
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(60%)" }}
          onClick={scrollLeft}
        >
          <LiaAngleLeftSolid size={25} />
        </button>
        <button
          className={`arrow arrow-right absolute right-1 cursor-pointer rounded-full flex justify-center items-center bg-white hover:bg-[#EE334B] hover:shadow-lg w-12 h-12 hover:text-white`}
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(60%)" }}
          onClick={scrollRight}
        >
          <LiaAngleRightSolid size={25} />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
