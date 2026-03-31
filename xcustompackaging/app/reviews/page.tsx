"use client";

import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import Banner from "@/components/shared/marketing/Banner";
import Button from "@/components/shared/ui/Button";
import AddReviews from "@/components/features/reviews/ui/AddReviews";
import { apiBase } from "@/lib/api";
import type { ReviewItem } from "@/types";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const lowerRes = await fetch(`${apiBase}/rating/getAll`, { cache: "no-store" });
      if (lowerRes.ok) {
        const lowerJson = await lowerRes.json();
        const lowerData = Array.isArray(lowerJson?.data) ? lowerJson.data : [];
        setReviews(lowerData);
        return;
      }

      const upperRes = await fetch(`${apiBase}/Rating/getAll`, { cache: "no-store" });
      if (upperRes.ok) {
        const upperJson = await upperRes.json();
        const upperData = Array.isArray(upperJson?.data) ? upperJson.data : [];
        setReviews(upperData);
      }
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";
    const sum = reviews.reduce((acc, item) => acc + (Number(item.rating) || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <>
      <Banner title="Customer Reviews" subTitle="Reviews" />

      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
          {!!reviews.length && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200">
                <FaStar size={28} color="#f0ad4e" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{averageRating}</div>
                  <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#4440E6] uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customers Trust X-Custom Packaging
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Customers are really important to our business! If it weren&apos;t for them,
              it would have taken us a long time to succeed. We&apos;re grateful for all
              the customers who&apos;ve supported us and helped us sell more.
            </p>
          </div>

          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-[#4440E6]/10 via-[#EE334B]/10 to-[#4440E6]/10 rounded-2xl p-8 md:p-12 border border-[#4440E6]/20">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Share Your Experience With Us!
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Because we do a good job making sure they&apos;re happy. You can count on
                X-Custom Packaging to help you with your packaging needs.
              </p>
              <Button
                onClick={() => setOpenModal(true)}
                label="Write a Review"
                className="bg-[#4440E6] text-white hover:bg-[#3730a3] px-8 py-3 rounded-lg text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-lg font-semibold text-[#213554]">
              Loading reviews...
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews.map((item, index) => (
                <div
                  key={item._id || String(index)}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={20}
                        color={i < (Number(item.rating) || 0) ? "#f0ad4e" : "#e4e5e9"}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 italic leading-relaxed text-base line-clamp-4">
                      &quot;{item.review || ""}&quot;
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-lg mb-1">{item.name || "Anonymous"}</h5>
                    {item.position ? (
                      <p className="text-sm text-gray-500 font-medium">{item.position}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <FaStar size={48} color="#e4e5e9" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
              <Button
                onClick={() => setOpenModal(true)}
                label="Write the First Review"
                className="bg-[#4440E6] text-white hover:bg-[#3730a3] px-6 py-2 rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <AddReviews
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onReviewAdded={fetchReviews}
      />
    </>
  );
}
