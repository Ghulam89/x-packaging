"use client";

import Image from "next/image";
import { useState } from "react";
import { ASSETS } from "@/lib/assets";

/** Static gallery for About — mirrors legacy `CreativePackaging` (CRA About page). */
const GALLERY_ITEMS = [
  { id: "1", src: ASSETS.gallery.g09, title: "Main Display" },
  { id: "2", src: ASSETS.gallery.g08, title: "Retail Wall" },
  { id: "3", src: ASSETS.gallery.g07, title: "Eco-Friendly" },
  { id: "4", src: ASSETS.gallery.g06, title: "Box Structure" },
  { id: "5", src: ASSETS.gallery.g05, title: "Luxury Kit" },
] as const;

export default function AboutPackagingGallery() {
  const [activeImage, setActiveImage] = useState<string>(GALLERY_ITEMS[0].src);

  const activeItem =
    GALLERY_ITEMS.find((item) => item.src === activeImage) ?? GALLERY_ITEMS[0];

  return (
    <section
      className="bg-white py-10 px-6"
      id="brand-details-section"
      aria-labelledby="about-packaging-gallery-heading"
    >
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full" />
          </div>
          <h2
            id="about-packaging-gallery-heading"
            className="text-3xl sm:text-4xl font-bold text-[#213554] mb-2"
          >
            Your Packaging Journey Starts Here!
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            Discover how quality packaging makes all the difference! Experience real client
            experiences, expert tips, and innovative packaging solutions that enhance brands.
            From custom designs to seamless functionality, see how we bring packaging visions to
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-xl shadow-slate-200/50 border border-lime-100">
            <div className="overflow-hidden rounded-[2rem] h-[min(52vh,22rem)] min-[400px]:h-[min(56vh,24rem)] sm:h-[min(62vh,28rem)] md:h-[500px] relative">
              <Image
                src={activeImage}
                alt={activeItem.title || "Featured packaging"}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="h-[180px] sm:h-[220px] md:h-[240px] group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-lime-100">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image
                  src={GALLERY_ITEMS[1].src}
                  alt={GALLERY_ITEMS[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="relative min-h-[140px] sm:min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <Image
                  src={GALLERY_ITEMS[2].src}
                  alt={GALLERY_ITEMS[2].title}
                  fill
                  sizes="(max-width: 768px) 45vw, 17vw"
                  className="object-cover rounded-[1.2rem] p-1"
                />
              </div>
              <div className="relative min-h-[140px] sm:min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <Image
                  src={GALLERY_ITEMS[3].src}
                  alt={GALLERY_ITEMS[3].title}
                  fill
                  sizes="(max-width: 768px) 45vw, 17vw"
                  className="object-cover rounded-[1.2rem] p-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar touch-pan-x">
            {GALLERY_ITEMS.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImage(img.src)}
                className={`relative shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  activeImage === img.src
                    ? "border-lime-400 scale-105 shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
