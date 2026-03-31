"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";

type Props = {
  images: string[];
  productName: string;
  onImageClick?: (index: number) => void;
};

const ProductGallery = ({ images, productName, onImageClick }: Props) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurr((c) => (c === images.length - 1 ? 0 : c + 1));

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
      {/* Thumbnails - Left Side on Desktop */}
      <div className="hidden md:flex flex-col gap-3 w-24 lg:w-28">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurr(i)}
            className={`relative aspect-square  rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
              curr === i
                ? "border-[#EE334B] ring-2 ring-[#EE334B]/20"
                : "border-transparent hover:border-gray-300"
            }`}
          > 
            <Image
              src={img}
              alt={`${productName} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
        ))}
      </div>

      {/* Main Image Slider */}
      <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden group bg-gray-50 border border-gray-100">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative flex-none w-full h-full">
              <Image
                src={img}
                alt={`${productName} main ${i + 1}`}
                fill
                className="object-contain  cursor-zoom-in"
                priority={i === 0}
                onClick={() => onImageClick?.(i)}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          ))}
        </div>

        {/* Search Icon / Zoom */}
        <button
          onClick={() => onImageClick?.(curr)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
        >
          <IoSearch size={20} className="text-[#213554]" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <TfiAngleLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <TfiAngleRight size={18} />
        </button>

        {/* Dots - Mobile only */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                curr === i ? "bg-[#EE334B] w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
