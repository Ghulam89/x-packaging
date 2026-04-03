"use client";

import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

type Variant = "carousel" | "grid" | "compact";

type Props = {
  href: string;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: Variant;
  className?: string;
  cardClassName?: string;
  subtitle?: string;
  priority?: boolean;
};

const ProductCard = memo(function ProductCard({
  href,
  title,
  imageSrc,
  imageAlt,
  variant = "grid",
  className = "",
  cardClassName = "",
  subtitle,
  priority = false,
}: Props) {
  const isCarousel = variant === "carousel";
  const isCompact = variant === "compact";

  const imageHeightClass = isCarousel
    ? "h-[7.75rem] min-[380px]:h-36 sm:h-44 md:h-[230px]"
    : isCompact
      ? "h-32"
      : "h-40";
  const outerRadiusClass = isCarousel ? "rounded-2xl sm:rounded-3xl" : "rounded-2xl";
  const imageRadiusClass = isCarousel ? "rounded-xl sm:rounded-2xl" : "rounded-xl";
  const paddingClass = isCarousel ? "p-2 sm:p-3 md:p-4" : "p-3";

  const wrapperClass = isCarousel
    ? `text-gray-700 bg-[#F9F9F9] hover:bg-white ${outerRadiusClass} flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-1 w-full group`
    : `group border ${outerRadiusClass} ${paddingClass} hover:shadow-lg bg-white transition-all duration-300`;

  const titleClass = isCarousel
    ? "text-[11px] min-[400px]:text-xs sm:text-sm pb-1.5 sm:pb-3 font-bold group-hover:text-[#EE334B] transition-colors duration-300 text-center px-1 sm:px-2 line-clamp-2 wrap-break-word"
    : "mt-2 font-semibold text-sm text-[#213554] text-center group-hover:text-[#EE334B] transition-colors duration-300";

  return (
    <Link href={href as any} className={`block h-full w-full ${className}`}>
      <div className={`${wrapperClass} ${cardClassName}`}>
        {isCarousel ? (
          <div className={`${paddingClass} relative overflow-hidden ${outerRadiusClass} w-full`}>
            <div className={`relative w-full ${imageHeightClass} ${imageRadiusClass} overflow-hidden`}>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  sizes="(max-width: 480px) 46vw, (max-width: 768px) 40vw, 285px"
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${imageRadiusClass}`}
                  priority={priority}
                />
              ) : (
                <div
                  className={`w-full h-full bg-linear-to-br from-[#213554]/10 to-[#EE334B]/10 ${imageRadiusClass}`}
                />
              )}
              <div
                className={`absolute inset-0 bg-linear-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${imageRadiusClass}`}
              />
              <div
                className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none ${imageRadiusClass}`}
              />
            </div>
          </div>
        ) : (
          <div className={`relative w-full ${imageHeightClass} ${imageRadiusClass} bg-gray-50 overflow-hidden`}>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                sizes={isCompact ? "128px" : "(max-width: 768px) 50vw, 25vw"}
                className="object-contain"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>
        )}

        <div>
          <div className={titleClass}>{title}</div>
          {!isCarousel && subtitle ? <div className="text-xs text-gray-500 text-center">{subtitle}</div> : null}
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
