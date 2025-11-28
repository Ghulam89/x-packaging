import React from "react";
import { Link } from "react-router-dom";
import brand1 from "../../assets/images/brand/addidas.png";
import brand2 from "../../assets/images/brand/good-vibe-cbd.png";
import brand3 from "../../assets/images/brand/nike.png";
import brand4 from "../../assets/images/brand/thefrankieshop.png";
import brand5 from "../../assets/images/brand/channel.png";
const BottomHero = () => {
  return (
    <div className=" py-2 bg-[#F7F7F7]">
      <div className=" sm:max-w-7xl w-[90%] mx-auto flex flex-wrap     justify-between items-center">
        <div className=" flex flex-wrap justify-center  gap-3 items-center">
          <span className=" font-bold">More than 5,000 customers love us:</span>
          <ul className=" flex items-center gap-4">
            <Link to={""} className=" text-black underline  text-lg font-bold">
              Trustpilot
            </Link>
            <Link to={""} className=" text-black text-lg underline font-bold">
              4.9 Google Reviews
            </Link>
          </ul>
        </div>
        <div className=" sm:w-5/12 w-full">
          <ul className=" flex  sm:pt-0 pt-3 items-center">
            <li>
              <img src={brand1} className=" w-3xs" alt="" />
            </li>
            <li>
              <img src={brand2} className=" w-44" alt="" />
            </li>
            <li>
              <img src={brand3} className=" w-3xs" alt="" />
            </li>
            <li>
              <img src={brand4} className="w-3xs" alt="" />
            </li>
            <li>
              <img src={brand5} className=" w-3xs" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BottomHero;
