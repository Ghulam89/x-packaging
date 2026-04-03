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
    <div className="flex w-full flex-col gap-4 md:flex-row lg:gap-8">
      {/* Thumbnails - Left Side on Desktop (cap ~4 rows, scroll w/ visible scrollbar) */}
      <div
        className="hidden w-24 shrink-0 flex-col gap-3 self-start overflow-y-auto overflow-x-hidden py-0.5 pr-1 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_#f1f5f9] md:flex md:max-h-105 lg:w-28 lg:max-h-121 min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100"
      >
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
          type="button"
          onClick={() => onImageClick?.(curr)}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:right-4 sm:top-4"
          aria-label="Zoom image"
        >
          <IoSearch size={20} className="text-[#213554]" />
        </button>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm transition-all hover:bg-white md:left-4 md:opacity-0 md:group-hover:opacity-100 opacity-100"
          aria-label="Previous image"
        >
          <TfiAngleLeft size={18} className="text-[#213554]" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm transition-all hover:bg-white md:right-4 md:opacity-0 md:group-hover:opacity-100 opacity-100"
          aria-label="Next image"
        >
          <TfiAngleRight size={18} className="text-[#213554]" />
        </button>

        {/* Dots - Mobile only */}
        {/* <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                curr === i ? "w-4 bg-[#EE334B]" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* Thumbnail strip — mobile / small tablets */}
      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:thin] [scrollbar-color:#cbd5e1_#f1f5f9] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurr(i)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
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
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
