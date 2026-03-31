 "use client";
import React, { useEffect, useState, useRef } from 'react';
import Button from '@/components/shared/ui/Button';
import { FaArrowDown } from 'react-icons/fa';

type Banner = { description?: string } | null;

const BannerContent = React.memo(({ banner }: { banner?: Banner }) => {
  const [data, setData] = useState<Banner>(banner || null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);
  const bannerSectionRef = useRef(null);

  useEffect(() => {
    setData(banner || null);
  }, [banner]);

  useEffect(() => {
    if (contentRef.current && (data?.description || "").length > 0) {
      setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = (contentRef.current as HTMLElement).scrollHeight;
          const maxHeight = 600; // Maximum height before showing "Read More"
          setShowReadMore(contentHeight > maxHeight);
        }
      }, 100);
    }
  }, [data]);

  // Handle read more/less toggle with scroll to top
  const handleToggle = () => {
    if (isExpanded) {
      // When collapsing, scroll to top of banner section
      setIsExpanded(false);
      setTimeout(() => {
        if (bannerSectionRef.current) {
          (bannerSectionRef.current as HTMLElement).scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    } else {
      setIsExpanded(true);
    }
  };


  return (
    <div ref={bannerSectionRef} className="py-5 sm:py-8 bg-white">
      <div className=" mx-auto px-4 sm:px-6 sm:max-w-8xl w-[95%]">
        <div
          ref={contentRef}
          className="banner-content-wrapper text-gray-800 relative"
          style={{
            maxHeight: isExpanded || !showReadMore ? 'none' : '700px',
            overflow: isExpanded || !showReadMore ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease-in-out',
            position: 'relative'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: data?.description || "" }} />
          {!isExpanded && showReadMore && (
            <div
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"
            />
          )}
        </div>

        {showReadMore && (
          <div className="mt-4 flex items-start">
            <Button
              onClick={handleToggle}
              label={isExpanded ? 'READ LESS' : 'READ MORE'}
              variant="red"
              size="md"
              className=" uppercase text-white"
              rIcons={
                <span className={`transform transition-transform duration-200 inline-block  ${isExpanded ? 'rotate-180' : ''}`}>
                  <FaArrowDown color='white' />
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default BannerContent;
