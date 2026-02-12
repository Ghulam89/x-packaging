import React from 'react';
import { FaStar } from 'react-icons/fa';
import Button from './Button';
import trust from '../../assets/images/footer/trust.png';
const TrustBanner = ({ categoryName = "Apparel Packaging" }) => {
  return (
    <section className=' bg-[#F7F7F7] py-3'>
     
        <div className=" sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left Section - Heading */}
            <div className="flex-1 text-center md:text-left">
              <h2 className=" font-bold leading-tight flex gap-2 items-center">
                <h6 className="text-gray-900 text-lg md:text-xl lg:text-2xl">Customers Trust Us for their </h6>
                <h6 className="text-[#EE334B] text-lg md:text-xl lg:text-2xl">{categoryName}</h6>
              </h2>
            </div>

           
              <div className=' w-5/12'>
              <div className="flex justify-left items-center gap-4">
                
                <p className="text-base md:text-lg font-normal text-gray-900 text-center md:text-right whitespace-nowrap">
                  Serving 5000+ Happy Customers!
                </p>
  
                  <div className=" gap-1">
                   <img src={trust} alt="trust" className=' w-44' />
                  </div>
                  
                  
                  <span className="text-lg md:text-xl font-normal text-gray-900">
                    4.9/5
                  </span>
  
                  
                </div>
              </div>

             
             

            <Button label="Write a Review" className="bg-[#213554] hover:bg-[#213554]/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
                 
                 </Button>

          </div>
        </div>
      
    </section>
  );
};

export default TrustBanner;
