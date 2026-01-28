import React from 'react';
import { FaStar } from 'react-icons/fa';

const TrustBanner = ({ categoryName = "Apparel Packaging" }) => {
  return (
    <section className='py-5 bg-red-50  px-4'>
     
        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left Section - Heading */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Customers Trust Us for their{' '}
                <span className="text-[#EE334B]">{categoryName}</span>
              </h2>
            </div>

            {/* Right Section - Rating & Stats */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="text-base md:text-lg font-medium text-gray-700">
                Serving 5000+ Happy Customers!
              </p>
              
              {/* Rating Display */}
              <div className="flex items-center gap-3">
                {/* Star Rating - Green Squares with White Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center shadow-sm"
                    >
                      <FaStar className="text-white text-sm" />
                    </div>
                  ))}
                </div>
                
                {/* Rating Text */}
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  4.9/5
                </span>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default TrustBanner;
