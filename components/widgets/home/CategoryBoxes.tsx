"use client";
import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteOrigin } from "@/lib/api";
import type { Category } from "@/types";
import Button from "@/components/shared/ui/Button";
import GetQuoteModal from "@/components/features/quote/ui/GetQuoteModal";

function categoryTileSrc(category: Category): string {
  const path = category.icon || category.image;
  if (!path) return "";
  const s = String(path).trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return `${siteOrigin}/${s.replace(/^\//, "")}`;
}

function categoryTileAlt(category: Category): string {
  return category.iconAltText || category.imageAltText || category.title || "Category";
}

type Props = {
  initialCategories?: Category[];
};

const CategoryBoxes = ({ initialCategories = [] }: Props) => {
  const categories = initialCategories;
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleRequestQuote = useCallback((category: Category | null) => {
    setSelectedCategory(category);
    setIsQuoteModalOpen(true);
  }, []);

  return (
    <>
      <div className="py-10 bg-white">
        <div className="sm:max-w-8xl w-[95%] mx-auto">
          <div className="text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Customized Packaging for Every Industry
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              We recognize that each industry has distinct packaging requirements.
              <Link
                href="/box-by-industry"
                className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center hover:opacity-80 transition"
              >
                View all
                <span className="ml-1">›</span>
              </Link>
            </p>
          </div>

          {categories.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {categories.map((category, index) => {
                  const src = categoryTileSrc(category);
                  return (
                    <div
                      key={category._id}
                      className="group flex flex-col items-center text-center"
                    >
                      <Link href={`/category/${category.slug}`}>
                        <div className="relative w-full sm:h-64 h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 group-hover:shadow-lg transition duration-300">
                          {src ? (
                            <Image
                              src={src}
                              alt={categoryTileAlt(category)}
                              width={300}
                              height={256}
                              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 20vw"
                              loading="eager"
                              priority={index < 5}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>
                      </Link>

                      <h3 className="font-bold text-lg text-gray-800 mb-3">
                        {category.title}
                      </h3>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  label="Get Instant Quote"
                  className="bg-[#800020] text-white hover:bg-[#800020]/90 rounded-lg text-base font-semibold"
                  onClick={() => handleRequestQuote(null)}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        category={selectedCategory}
      />
    </>
  );
};

export default memo(CategoryBoxes);
