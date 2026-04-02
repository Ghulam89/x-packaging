"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ASSETS } from "@/lib/assets";

type JourneyItem = {
  _id: string;
  video: string;
  isStatic: true;
};

const PackagingJourney = () => {
  const journeyItems = React.useMemo((): JourneyItem[] => {
    return ASSETS.videos.gallery.map((video, index) => ({
      _id: `static-video-${index}`,
      video,
      isStatic: true,
    }));
  }, []);

  const slideClass =
    "!w-[min(280px,calc(100vw-1.5rem))] sm:!w-[min(280px,calc(100vw-2rem))] !h-auto shrink-0";

  return (
    <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 px-2 min-[360px]:px-3 sm:px-4">
      <div className="sm:max-w-8xl max-w-full mx-auto w-full min-w-0">
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-block mb-3 sm:mb-4">
            <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full" />
          </div>
          <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-bold text-[#213554] mb-3 sm:mb-4 px-0.5 leading-tight">
            Your Packaging Journey Starts Here!
          </h2>
          <p className="text-gray-600 text-xs min-[360px]:text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed px-0.5">
            Discover how quality packaging makes all the difference! Experience
            real client experiences, expert tips, and innovative packaging
            solutions that enhance brands. From custom designs to seamless
            functionality, see how we bring packaging visions to life.
          </p>
        </div>

        <div className="relative group min-w-0">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={8}
            slidesPerView="auto"
            breakpoints={{
              400: { spaceBetween: 12 },
              640: { spaceBetween: 16 },
              1024: { spaceBetween: 20 },
            }}
            navigation={{
              prevEl: ".journey-prev",
              nextEl: ".journey-next",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={journeyItems.length > 4}
            className="journey-swiper pb-8! sm:pb-10!"
          >
            {journeyItems.map((item, index) => (
              <SwiperSlide key={item._id || index} className={slideClass}>
                <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group/card bg-neutral-900/5">
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto block object-contain bg-black/90 max-h-[min(85dvh,720px)] sm:max-h-[min(80dvh,800px)]"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous slide"
            className="journey-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 max-lg:left-1 max-lg:translate-x-0 max-lg:-translate-y-[60%]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="journey-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#213554] hover:bg-[#EE334B] hover:text-white transition-opacity opacity-100 lg:opacity-0 lg:group-hover:opacity-100 max-lg:right-1 max-lg:translate-x-0 max-lg:-translate-y-[60%]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(PackagingJourney);
