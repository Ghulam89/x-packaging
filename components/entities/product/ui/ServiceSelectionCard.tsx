"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type ServiceItem = {
  id?: string | number;
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
};

type Props = {
  items: ServiceItem[];
};

const ServiceSelectionCard = ({ items = [] }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const updateArrows = () => {
      const el = scrollRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftArrow(scrollLeft > 8);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 8);
    };

    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [items.length]);

  const scrollStep = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.85, 280);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#F7F7F7] border-b border-gray-100">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto w-full min-w-0">
        {/* Mobile: horizontal scroll + arrows */}
        <div className="md:hidden relative py-1">
          {showLeftArrow && (
            <button
              type="button"
              onClick={() => scrollStep(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-colors active:scale-95"
              aria-label="Scroll services left"
            >
              <FaChevronLeft size={14} />
            </button>
          )}
          {showRightArrow && (
            <button
              type="button"
              onClick={() => scrollStep(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-colors active:scale-95"
              aria-label="Scroll services right"
            >
              <FaChevronRight size={14} />
            </button>
          )}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] px-10 py-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((item, index) => (
              <div
                key={item.id ?? index}
                className="snap-center shrink-0 min-w-[85%] max-w-[min(100%,320px)] box-border px-2 flex items-center gap-4 py-3 justify-center"
              >
                {item.icon && (
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center relative">
                    {typeof item.icon === "string" ? (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="opacity-90 object-contain"
                        style={{ filter: "saturate(100%) invert(0%)" }}
                      />
                    ) : (
                      item.icon
                    )}
                  </div>
                )}
                <div className="flex flex-col min-w-0 text-left">
                  <h6 className="text-sm font-bold text-[#213554] uppercase tracking-wider leading-tight">
                    {item.title}
                  </h6>
                  {item.description && (
                    <p className="text-[10px] text-gray-500 mt-1 font-medium line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* md+: original row with dividers */}
        <div className="hidden md:flex flex-wrap justify-center items-stretch">
          {items.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <div className="flex items-center gap-4 py-3 px-4 flex-1 min-w-[200px] justify-center md:justify-start">
                <div className="shrink-0">
                  {item.icon && (
                    <div className="w-12 h-12 flex items-center justify-center relative">
                      {typeof item.icon === "string" ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="opacity-90 object-contain"
                          style={{ filter: "saturate(100%) invert(0%)" }}
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h6 className="text-sm font-bold text-[#213554] uppercase tracking-wider leading-tight">
                    {item.title}
                  </h6>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="w-px bg-gray-200 self-stretch my-6 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionCard;
