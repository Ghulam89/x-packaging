"use client";
import Image from "next/image";
import { useMemo, memo } from "react";

const BottomHero = () => {

  const brands = useMemo(
    () => [
      { id: 1, image: "/assets/images/brand/1.png", alt: "Adidas" },
      { id: 2, image: "/assets/images/brand/2.png", alt: "Good Vibe CBD" },
      { id: 3, image: "/assets/images/brand/3.png", alt: "Nike" },
      { id: 4, image: "/assets/images/brand/4.png", alt: "The Frankie Shop" },
      { id: 5, image: "/assets/images/brand/5.png", alt: "Channel" },
      { id: 6, image: "/assets/images/brand/6.png", alt: "Brand 1" },
      { id: 7, image: "/assets/images/brand/7.png", alt: "Brand 2" },
      { id: 8, image: "/assets/images/brand/8.png", alt: "Brand 3" },
      { id: 9, image: "/assets/images/brand/9.png", alt: "Brand 4" },
      { id: 10, image: "/assets/images/brand/10.png", alt: "Brand 5" },
      { id: 11, image: "/assets/images/brand/11.png", alt: "Brand 6" },
      { id: 12, image: "/assets/images/brand/12.png", alt: "Brand 7" },
      { id: 13, image: "/assets/images/brand/13.png", alt: "Brand 8" },
      { id: 14, image: "/assets/images/brand/14.png", alt: "Brand 9" },
      { id: 15, image: "/assets/images/brand/15.png", alt: "Brand 10" },
    ],
    []
  );

  const duplicatedBrands = useMemo(() => {
    return [...brands, ...brands, ...brands];
  }, [brands]);

  const animationDuration = brands.length * 3;

  return (
    <div className="py-3.5 bg-[#F7F7F7]">
      <div className="sm:max-w-7xl w-[95%] mx-auto">
        <div className="relative overflow-hidden w-full">
          <div
            className="flex whitespace-nowrap gap-8 items-center"
            style={{
              animation: `scroll-brands ${animationDuration}s linear infinite`
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="inline-flex items-center justify-center flex-shrink-0 h-[40px] w-[140px]"
              >
                <Image
                  src={brand.image}
                  alt={brand.alt}
                  loading="lazy"
                  width={140}
                  height={40}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll-brands {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}
      </style>
    </div>
  );
};

export default memo(BottomHero);
