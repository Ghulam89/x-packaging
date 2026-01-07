import React from 'react';
import { FaGift, FaBell } from 'react-icons/fa';

const AnnouncementBanner = () => {
  // Static announcements
  const announcements = [
    {
      id: 1,
      title: '40% on Custom Packaging',
      subTitle: 'Get More Boxes, Pay Less - Ends Soon!',
      color: '#213554' // Logo secondary color (dark blue)
    },
    {
      id: 2,
      title: 'Biggest Sale Of The Year Save up to 40% on Custom Packaging',
      subTitle: 'Get More Boxes, Pay Less - Ends Soon!',
      color: '#213554' // Logo secondary color (dark blue)
    }
  ];

  // Duplicate announcements for seamless loop
  const duplicatedAnnouncements = [...announcements, ...announcements];
  const animationDuration = announcements.length * 15;

  return (
    <>
      <style>
        {`
          @keyframes scroll-announcement {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .announcement-scroll {
            animation: scroll-announcement ${animationDuration}s linear infinite;
          }
          .announcement-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="bg-white border-b border-gray-200 relative overflow-hidden w-full z-50">
        <div className="relative w-full">
          {/* Sliding Announcement Container */}
          <div className="flex announcement-scroll whitespace-nowrap w-max">
            {duplicatedAnnouncements.map((announcement, index) => (
              <div
                key={`${announcement.id}-${index}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 mx-2 sm:mx-4"
              >
                {/* Main Text - Logo Primary Color */}
                <span className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap" style={{ color: '#EE334B' }}>
                  <span className="underline">
                    {announcement.title}
                  </span>
                </span>

                {/* Icons */}
                <FaGift className="text-orange-500 text-xs sm:text-sm flex-shrink-0" />
                <FaBell className="text-yellow-500 text-xs sm:text-sm flex-shrink-0" />

                {/* Sub Title - Logo Secondary Color */}
                <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap" style={{ color: announcement.color || '#213554' }}>
                  {announcement.subTitle}
                </span>

                {/* Separator */}
                <span className="text-gray-400 mx-1 sm:mx-2">|</span>
              </div>
            ))}
          </div>

          {/* Bottom Border Lines */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-0.5" style={{ backgroundColor: '#213554' }}></div>
            <div className="h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBanner;

