"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaAngleRight, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { siteOrigin } from "@/lib/api";
import type { Blog } from "@/types";

type BlogItem = Blog & {
  createdAt?: string;
  shortDescription?: string;
  imageAltText?: string;
};

type Props = {
  initialBlogs?: BlogItem[];
};

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog({ initialBlogs = [] }: Props) {
  const blogs = initialBlogs;

  const previewTextById = useMemo(() => {
    const map = new Map<string, string>();
    for (const b of blogs) {
      const previewLength = 120;
      const preview = b.shortDescription
        ? String(b.shortDescription).slice(0, previewLength) + "..."
        : stripHtml(b.content).slice(0, previewLength) + "...";
      map.set(b._id, preview);
    }
    return map;
  }, [blogs]);

  return (
    <section className="bg-[#F7F7F7] py-10">
      <div className="sm:max-w-8xl w-[95%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Client’s Spotlights & Blogs 
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Please see below how businesses like yours have elevated their brand
            with X Custom Packaging. We have responded quickly to them every
            time to maintain their inventories and fulfill their urgent needs.
            You can also find here the recent trends in packaging.
            <Link
              href="/blog"
              className="ml-2 uppercase font-bold text-[#EF4258] inline-flex items-center align-baseline hover:opacity-90 underline-offset-2 hover:underline transition-opacity"
            >
              View all
              <FaAngleRight className="ml-1" size={15} />
            </Link>
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="relative py-2">
            <button
              type="button"
              className="blog-swiper-prev hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-[#213554] hover:text-[#EE334B] hover:border-[#EE334B]/30 transition-all absolute left-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
              type="button"
              className="blog-swiper-next hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-[#213554] hover:text-[#EE334B] hover:border-[#EE334B]/30 transition-all absolute right-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Next"
            >
              <IoIosArrowForward size={18} />
            </button>
            <div className="md:px-12">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView="auto"
                spaceBetween={16}
                navigation={{
                  prevEl: ".blog-swiper-prev",
                  nextEl: ".blog-swiper-next",
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={blogs.length > 3}
              >
                {blogs.map((b, index) => {
                  const img = b.image
                    ? b.image.startsWith("http")
                      ? b.image
                      : `${siteOrigin}/${String(b.image).replace(/^\//, "")}`
                    : "";
                  const previewText = b._id
                    ? previewTextById.get(b._id) || ""
                    : "";
                  return (
                    <SwiperSlide
                      key={b.slug || b._id || index}
                      className="!w-[320px] sm:!w-[365px] px-2"
                    >
                      <div className="group relative w-full h-full">
                        <Link href={`/blog/${b.slug}`} className="block w-full h-full">
                          <div className="rounded-2xl overflow-hidden w-full h-full bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 flex flex-col transform hover:-translate-y-1">
                            <div className="w-full overflow-hidden relative rounded-t-2xl h-48 sm:h-56 md:h-64">
                              {img ? (
                                <Image
                                  src={img}
                                  alt={b.imageAltText || b.title || ""}
                                  width={640}
                                  height={360}
                                  sizes="(max-width: 640px) 320px, 365px"
                                  loading="eager"
                                  priority={index === 0}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-2xl" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-t-2xl" />
                              <div className="absolute top-2 left-2 z-20">
                                <span className="inline-block font-bold text-white bg-[#EF4258] rounded-full shadow-lg backdrop-blur-sm px-4 py-1.5 text-xs">
                                  Knowledge Base
                                </span>
                              </div>
                            </div>

                            <div className="text-start flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                              {b.createdAt ? (
                                <div className="flex items-center text-gray-500 text-xs mb-2 sm:mb-3">
                                  <FaCalendarAlt className="text-[#EF4258] mr-2" />
                                  <span>{formatDate(b.createdAt)}</span>
                                </div>
                              ) : null}

                              <h3 className="font-bold text-[#213554] line-clamp-2 group-hover:text-[#EF4258] transition-colors duration-300 leading-tight text-lg sm:text-xl mb-2 sm:mb-3">
                                {b.title}
                              </h3>

                              <p className="text-gray-600 line-clamp-3 leading-relaxed flex-grow mb-3 sm:mb-4 text-xs sm:text-sm">
                                {previewText}
                              </p>

                              <div className="flex justify-start items-center mt-auto pt-2">
                                <span className="inline-flex items-center text-[#EF4258] font-semibold group-hover:gap-2 gap-1 transition-all duration-300 text-xs sm:text-sm">
                                  Continue Reading
                                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
