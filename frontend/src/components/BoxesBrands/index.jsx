import { Star } from 'lucide-react'
import React from 'react'
import CardSlider from '../common/CardSlider';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';

const BoxesBrands = ({ title, description, products = [] }) => {
 
  
  return (
    <section className="py-16 px-4 max-w-8xl mx-auto">
      {/* Header Text */}
      <div className="text-center mb-10">
        <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-2'>
          {title}
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      <CardSlider
        items={products?.map((brand, index) => {
         const brandLogo = brand?.images?.[0]?.url ? `${BaseUrl}/${brand?.images?.[0]?.url}` : brand?.logo;
         const brandName = brand?.name;
         const brandImage = brand?.images?.[0]?.url ? `${BaseUrl}/${brand?.images?.[0]?.url}` : brand?.image;
         const brandSlug = brand?.slug;

          return (
            <div 
              key={brand?._id || brand?.name || index} 
              className="flex-none w-[280px] md:w-[320px] flex flex-col items-center flex-shrink-0"
            >
           
              <div className="relative mt-10 w-full group">
              
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden z-10 bg-white transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={brandLogo} 
                    alt={brandName} 
                    className="w-full h-full object-contain p-2" 
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                </div>

                {brandSlug ? (
                  <Link to={`/product/${brandSlug}`}>
                    <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                      <img
                        src={brandImage}
                        alt={`${brandName} packaging`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/320x400";
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                    <img
                      src={brandImage}
                      alt={`${brandName} packaging`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/320x400";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Brand Info */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#EE334B]">
                  {brandName}
                </h3>
              
              </div>
            </div>
          );
        })}
      />
    </section>
  )
}

export default BoxesBrands
