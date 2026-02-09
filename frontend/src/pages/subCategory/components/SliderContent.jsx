import React from 'react';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

const SliderContent = ({ chunks, currentIndex, onPrev, onNext }) => (
  <div className="relative rounded-2xl pb-12 overflow-hidden bg-white/50">
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {chunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="w-full flex-shrink-0 flex justify-between gap-3 sm:gap-4"
          >
            {chunk.map((slide) => (
              <div
                key={slide.title}
                className="flex-1 flex flex-col items-center group"
              >
                <div className="w-full flex justify-center">
                  <div className="w-44 h-32 lg:w-48 lg:h-36 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h4 className="mt-4 text-sm font-semibold text-[#213554] group-hover:text-[#EE334B] transition-colors duration-300">
                  {slide.title}
                </h4>
                <p className="mt-1 text-[11px] text-gray-600 text-center">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-3 right-4 flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
      >
        <TfiAngleLeft size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
      >
        <TfiAngleRight size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
      </button>
    </div>
  </div>
);

export default SliderContent;
