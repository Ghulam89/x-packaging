"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { apiGet } from "@/lib/api";
import type { RatingItem } from "@/types";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const CategoryTestimonials = () => {
  const [ratings, setRatings] = useState<RatingItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await apiGet<RatingItem[]>("/rating/getAll");
        const data = Array.isArray(response?.data) ? response.data : [];
        setRatings(data);
        if (data.length > 0) {
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const handleProfileClick = (index: number) => {
    setSelectedIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      if (ratings.length > 1 && swiper.params.loop) {
        swiper.slideToLoop(index);
      } else {
        swiper.slideTo(index);
      }
    }
  };

  const handleSlideChange = (swiper: any) => {
    let realIndex = swiper.activeIndex;
    if (ratings.length > 1 && swiper.params.loop) {
      realIndex = swiper.realIndex;
    }
    setSelectedIndex(realIndex);
  };

  const getInitials = (name: string) => {
    if (!name) return "AN";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-[#EE334B] to-[#EE334B]/80",
      "bg-gradient-to-br from-[#213554] to-[#213554]/80",
      "bg-gradient-to-br from-[#2D5016] to-[#2D5016]/80",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) return null;
  if (ratings.length === 0) return null;

  return (
    <section className="bg-white pt-12">
      <div className="sm:max-w-8xl mx-auto w-[95%]">
        <div className="flex sm:flex-row flex-col items-center gap-8 lg:gap-12">
          {/* Left Section - Text Content */}
          <div className="sm:w-6/12 w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-2  tracking-tight">
              Client Testimonials
            </h2>
            <p className="text-[#333333] text-sm sm:text-base mb-6 font-medium">
              GET TO KNOW ALL ABOUT OUR SERVICE THROUGH VARIOUS BUSINESS CLIENTS.
            </p>

            {/* Large Quotation Marks */}
            <div className="text-[#FFD700] text-6xl sm:text-7xl font-serif leading-none mb-2">
              "
            </div>

            {/* Swiper Slider */}
            <div className="relative">
              <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSlideChange={handleSlideChange}
                loop={ratings.length > 1}
                className="testimonial-swiper"
              >
                {ratings.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div className="pr-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${getAvatarColor(
                            item.name
                          )}`}
                        >
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#333333] text-base leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#666666] font-medium mt-0.5">
                            Verified Customer
                          </p>
                        </div>
                      </div>

                      <p className="text-[#333333] text-base sm:text-lg italic mb-6 leading-relaxed">
                        {item.comment}
                      </p>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={18}
                            className={
                              i < (item.rating || 0)
                                ? "text-[#FFD700]"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="sm:w-5/12 w-full">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/images/category-review.webp"
                alt="Category Review"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CategoryTestimonials);
