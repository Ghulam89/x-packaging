 "use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet, apiBase } from "@/lib/api";
import type { Category } from "@/types";
import Button from "@/components/shared/ui/Button";
import GetQuoteModal from "@/components/features/quote/ui/GetQuoteModal";

const CategoryBoxes = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const r = await apiGet<Category[]>("/category/getAll?page=1&perPage=5");
      const list: Category[] = Array.isArray(r?.data) ? r.data : [];
      setCategories(list);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleRequestQuote = useCallback((category: Category | null) => {
    setSelectedCategory(category as any);
    setIsQuoteModalOpen(true);
  }, []);

  return (
    <>
      <div className="py-10 bg-white">
        <div className="sm:max-w-8xl w-[95%] mx-auto">
          
          {/* Header */}
          <div className="text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Customized Packaging for Every Industry
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              We recognize that each industry has distinct packaging requirements.
              <Link
                href="/categories"
                className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center hover:opacity-80 transition"
              >
                View all
                <span className="ml-1">›</span>
              </Link>
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
                  <div className="bg-gray-200 h-6 rounded mb-2" />
                  <div className="bg-gray-200 h-4 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
            
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="group flex flex-col items-center text-center"
                  >
                    <Link href={`/category/${category.slug}`}>
                      <div className="relative w-full sm:h-64 h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 group-hover:shadow-lg transition duration-300">
                        {(category as any).icon ? (
                          <Image
                            src={`${apiBase}/${(category as any).icon}`}
                            alt={category.title || ""}
                            width={300}
                            height={256}
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
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button  label="Get Instant Quote" className="bg-[#800020] text-white hover:bg-[#800020]/90 rounded-lg text-base font-semibold" onClick={() => setIsQuoteModalOpen(true)}>
                  
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <GetQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} category={selectedCategory} />
    </>
  );
};

export default memo(CategoryBoxes);
