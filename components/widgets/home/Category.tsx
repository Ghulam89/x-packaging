 "use client";
import React, { useRef } from "react";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import ProductCard from "@/components/entities/product/ui/ProductCard";

export default function Category({ serverData = [] as Product[] }) {
  if (!Array.isArray(serverData) || !serverData.length) return null;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChildWidth = (el.firstChild as HTMLElement | null)?.clientWidth || 240;
    el.scrollTo({
      left: el.scrollLeft + (dir === "left" ? -firstChildWidth : firstChildWidth),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f7f7f7] pt-10">
      <div className="sm:max-w-8xl w-[95%] mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Signature Packaging Styles
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our range of premium packaging shapes and styles.
            <Link
              href="/products"
              className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center hover:opacity-80 transition"
            >
              View all
              <FaAngleRight className="ml-1" size={15} />
            </Link>
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="grid grid-cols-2 gap-3 px-4 sm:px-0 sm:pl-0 sm:pr-0 sm:flex sm:items-start sm:gap-4 sm:overflow-x-auto sm:overflow-y-hidden sm:whitespace-nowrap py-2 sm:snap-x sm:snap-mandatory min-h-[280px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {serverData.map((p) => {
              const img =
                p.images && p.images[0]?.url
                  ? `${siteOrigin}/${String(p.images[0].url).replace(/^\//, "")}`
                  : "";
              return (
                <div key={p._id} className="w-full min-w-0 sm:w-[285px] sm:shrink-0 sm:px-2">
                  <ProductCard
                    href={`/product/${p.slug}`}
                    title={p.name || p.slug}
                    imageSrc={img}
                    imageAlt={p.name || p.slug}
                    variant="carousel"
                  />
                </div>
              );
            })}
          </div>
          <div className="md:block hidden">
            <button
              className="absolute left-2 text-gray-600 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => scrollByCard("left")}
              aria-label="Scroll left"
            >
              <span className=" ">
                <FaAngleLeft size={20} />
              </span>
            </button>
            <button
              className="absolute right-2 text-gray-600 rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-12 h-12 hover:text-white"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => scrollByCard("right")}
              aria-label="Scroll right"
            >
              <span className=" ">
                <FaAngleRight size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
