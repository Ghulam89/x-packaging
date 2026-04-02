"use client";
import React, { useState, useMemo, useEffect } from "react";
import { siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  products?: Product[];
  title?: string;
  description?: string;
};

const CreativeGallery = ({ products = [], title, description }: Props) => {
  const images = useMemo(() => {
    if (products && products.length > 0) {
      return products.slice(0, 5).map((product, index) => ({
        id: product._id || String(index),
        url: product?.images?.[0]?.url
          ? `${siteOrigin}/${product.images[0].url.replace(/^\//, "")}`
          : "/assets/images/placeholder.jpg",
        title: product?.name || `Product ${index + 1}`,
        slug: product?.slug,
      }));
    }
    return [];
  }, [products]);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0 && !activeImage) {
      setActiveImage(images[0].url);
    }
  }, [images, activeImage]);

  if (!products || products.length === 0 || images.length === 0) {
    return null;
  }

  const currentItem = images.find((img) => img.url === activeImage) || images[0];

  return (
    <section className="bg-white min-w-0 overflow-x-hidden py-8 sm:py-10 px-3 min-[400px]:px-4 sm:px-5 md:px-6">
      <div className="sm:max-w-8xl max-w-full w-full min-w-0 mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-3 sm:mb-4">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"></div>
          </div>
          <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-bold text-[#213554] mb-2 sm:mb-3 px-1 leading-tight text-balance">
            {"Your Packaging Journey Starts Here!"}
          </h2>
          <p className="text-gray-600 text-xs min-[360px]:text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed px-1">
            {description ||
              "Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-10 min-w-0">
          {/* Main Featured Image */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] bg-white p-2 sm:p-3 shadow-xl shadow-slate-200/50 border border-gray-100 min-w-0">
            <div className="overflow-hidden rounded-xl sm:rounded-[1.75rem] md:rounded-[2rem] h-[min(52vh,22rem)] min-[400px]:h-[min(56vh,24rem)] sm:h-[min(62vh,28rem)] md:h-[500px] relative min-w-0">
              <Image
                src={activeImage || images[0].url}
                alt={currentItem?.title || "Featured Packaging"}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {currentItem?.slug && (
                <Link
                  href={`/product/${currentItem.slug}`}
                  className="absolute inset-0 z-10"
                />
              )}
            </div>
          </div>

          {/* Side Grid */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-6 min-w-0">
            {images[1] && (
              <div className="h-[min(40vw,11rem)] min-h-[140px] sm:h-[220px] md:h-[240px] group overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-white p-2 sm:p-3 shadow-lg border border-gray-100 relative min-w-0">
                <Image
                  src={images[1].url}
                  alt={images[1].title || "Detail"}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-cover rounded-[1.5rem] p-3"
                />
                {images[1].slug && (
                  <Link
                    href={`/product/${images[1].slug}`}
                    className="absolute inset-0 z-10"
                  />
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              {images[2] && (
                <div className="h-full min-h-[140px] sm:min-h-[180px] rounded-xl sm:rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group min-w-0">
                  <Image
                    src={images[2].url}
                    alt={images[2].title || "Detail 2"}
                    fill
                    sizes="(max-width: 768px) 45vw, 17vw"
                    className="object-cover rounded-[1.2rem] p-1"
                  />
                  {images[2].slug && (
                    <Link
                      href={`/product/${images[2].slug}`}
                      className="absolute inset-0 z-10"
                    />
                  )}
                </div>
              )}
              {images[3] && (
                <div className="h-full min-h-[140px] sm:min-h-[180px] rounded-xl sm:rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group min-w-0">
                  <Image
                    src={images[3].url}
                    alt={images[3].title || "Detail 3"}
                    fill
                    sizes="(max-width: 768px) 45vw, 17vw"
                    className="object-cover rounded-[1.2rem] p-1"
                  />
                  {images[3].slug && (
                    <Link
                      href={`/product/${images[3].slug}`}
                      className="absolute inset-0 z-10"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="relative group min-w-0 -mx-1 px-1">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto overscroll-x-contain pb-4 scroll-smooth no-scrollbar min-w-0 touch-pan-x">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                type="button"
                className={`shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 transition-all duration-300 relative ${
                  activeImage === img.url
                    ? "border-[#EE334B] scale-105 shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  fill
                  sizes="128px"
                  className="object-cover"
                  alt={img.title}
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
};

export default CreativeGallery;
