import React from "react";
import hero from "../../assets/images/banner-slider-image.webp";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="w-full sm:h-[66vh] h-[60vh]"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:max-w-8xl h-full flex   items-center max-w-[95%] mx-auto">
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
