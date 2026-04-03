"use client";

import React, { useEffect, useRef, useState } from "react";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import ProductCard from "@/components/entities/product/ui/ProductCard";

export type RelatedProductCardItem = {
  key: string;
  href: string;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
};

type Props = {
  items: RelatedProductCardItem[];
};

export default function RelatedProductsSlider({ items }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const update = () => {
      const el = scrollRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeft(scrollLeft > 8);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 8);
    };
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  const scrollByStep = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstChild as HTMLElement | null;
    const step = card?.clientWidth
      ? card.clientWidth + 12
      : Math.min(el.clientWidth * 0.85, 300);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="relative -mx-1 sm:mx-0">
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden py-1 pl-4 pr-4 sm:pl-0 sm:pr-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => (
          <div
            key={item.key}
            className="w-[min(85vw,280px)] shrink-0 snap-start self-stretch sm:w-[min(45vw,280px)] md:w-[260px] lg:w-[272px]"
          >
            <ProductCard
              href={item.href}
              title={item.title}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              variant="carousel"
              className="h-full"
            />
          </div>
        ))}
      </div>

      {showLeft ? (
        <button
          type="button"
          className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-[#213554] shadow-md backdrop-blur-sm transition-colors hover:bg-[#213554] hover:text-white sm:left-0 md:left-2 md:h-12 md:w-12"
          onClick={() => scrollByStep(-1)}
          aria-label="Scroll related products left"
        >
          <LiaAngleLeftSolid size={24} />
        </button>
      ) : null}
      {showRight ? (
        <button
          type="button"
          className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-[#213554] shadow-md backdrop-blur-sm transition-colors hover:bg-[#213554] hover:text-white sm:right-0 md:right-2 md:h-12 md:w-12"
          onClick={() => scrollByStep(1)}
          aria-label="Scroll related products right"
        >
          <LiaAngleRightSolid size={24} />
        </button>
      ) : null}
    </div>
  );
}
