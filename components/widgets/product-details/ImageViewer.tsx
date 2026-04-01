"use client";
import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
};

const ImageViewer = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <svg
          className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-linear-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
        >
          <FaAngleLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white/5 backdrop-blur-sm p-4 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Full screen view ${currentIndex + 1}`}
          width={1600}
          height={1200}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          unoptimized
        />
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-linear-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
        >
          <FaAngleRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
          <span className="text-white/90">{currentIndex + 1}</span>
          <span className="mx-2 text-white/50">/</span>
          <span className="text-white/90">{images.length}</span>
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (idx > currentIndex) {
                  for (let i = currentIndex; i < idx; i += 1) onNext();
                } else if (idx < currentIndex) {
                  for (let i = currentIndex; i > idx; i -= 1) onPrev();
                }
              }}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === idx
                  ? "border-[#EE334B] ring-2 ring-[#EE334B]/50 scale-110"
                  : "border-white/20 hover:border-white/40 hover:scale-105"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} width={64} height={64} className="w-full h-full object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
