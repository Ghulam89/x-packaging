"use client";
import React, { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteOrigin } from "@/lib/api";
import type { Blog } from "@/types";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

type Props = {
  blog: Blog;
  compact?: boolean;
  className?: string;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const stripHtml = (html?: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
};

const BlogCard = memo(({ blog, compact = false, className = "" }: Props) => {
  const img = blog.image ? `${siteOrigin}/${String(blog.image).replace(/^\//, "")}` : "";
  const previewLength = compact ? 80 : 100;
  const previewText = useMemo(() => {
    const text = (blog as any).shortDescription || stripHtml(blog.content);
    return text.length > previewLength ? text.slice(0, previewLength) + "..." : text;
  }, [blog, previewLength]);

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#EE334B]/20 flex flex-col transform hover:-translate-y-2 ${className}`}
    >
      <div
        className={`w-full overflow-hidden relative ${
          compact ? "h-40" : "h-28 min-[380px]:h-32 sm:h-44 md:h-64"
        }`}
      >
        {img ? (
          <Image
            src={img}
            alt={(blog as any).imageAltText || blog.title || ""}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-300">Blog</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <span
            className={`inline-block font-bold text-white bg-[#EE334B] rounded-full shadow-lg uppercase tracking-wider ${
              compact
                ? "text-[10px] px-3 py-1"
                : "text-[8px] min-[380px]:text-[9px] px-2 py-0.5 sm:text-xs sm:px-4 sm:py-1.5"
            }`}
          >
            Knowledge Base
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-grow ${compact ? "p-4" : "p-2.5 sm:p-6 md:p-8"}`}>
        {(blog as any).createdAt && (
          <div
            className={`flex items-center text-gray-400 font-bold uppercase tracking-widest ${
              compact ? "text-[10px] mb-2" : "text-[8px] min-[380px]:text-[9px] sm:text-xs mb-1.5 sm:mb-3"
            }`}
          >
            <FaCalendarAlt className="text-[#EE334B] mr-1 shrink-0 sm:mr-2 text-[10px] sm:text-xs" />
            <span className="leading-tight">{formatDate((blog as any).createdAt)}</span>
          </div>
        )}

        <h3
          className={`font-bold text-[#213554] line-clamp-2 group-hover:text-[#EE334B] transition-colors duration-300 leading-snug sm:leading-tight mb-1.5 sm:mb-3 ${
            compact ? "text-base" : "text-[11px] min-[380px]:text-xs sm:text-lg md:text-xl lg:text-2xl"
          }`}
        >
          {blog.title}
        </h3>

        <p
          className={`text-gray-600 line-clamp-2 sm:line-clamp-3 flex-grow mb-2 sm:mb-4 ${
            compact ? "text-xs leading-relaxed" : "text-[10px] min-[380px]:text-[11px] sm:text-sm md:text-base leading-snug sm:leading-relaxed"
          }`}
        >
          {previewText}
        </p>

        <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-50">
          <span
            className={`text-[#EE334B] font-bold uppercase tracking-wider group-hover:gap-2 gap-1 transition-all duration-300 inline-flex items-center ${
              compact ? "text-[11px]" : "text-[8px] min-[380px]:text-[9px] sm:text-xs md:text-sm"
            }`}
          >
            Continue Reading
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
});

BlogCard.displayName = "BlogCard";
export default BlogCard;
