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
    <section className="bg-white py-10 px-6">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-2  tracking-tight">
            {"Your Packaging Journey Starts Here!"}
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            {description ||
              "Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Main Featured Image */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-xl shadow-slate-200/50 border border-gray-100">
            <div className="overflow-hidden rounded-[2rem] h-[400px] sm:h-[450px] md:h-[500px] relative">
              <Image
                src={activeImage || images[0].url}
                alt={currentItem?.title || "Featured Packaging"}
                fill
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
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            {images[1] && (
              <div className="h-[180px] sm:h-[220px] md:h-[240px] group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-gray-100 relative">
                <Image
                  src={images[1].url}
                  alt={images[1].title || "Detail"}
                  fill
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
            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              {images[2] && (
                <div className="h-full min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group">
                  <Image
                    src={images[2].url}
                    alt={images[2].title || "Detail 2"}
                    fill
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
                <div className="h-full min-h-[180px] rounded-[1.5rem] overflow-hidden border-2 border-gray-100 p-1 bg-white relative group">
                  <Image
                    src={images[3].url}
                    alt={images[3].title || "Detail 3"}
                    fill
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
        <div className="relative group">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 relative ${
                  activeImage === img.url
                    ? "border-[#EE334B] scale-105 shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  fill
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
