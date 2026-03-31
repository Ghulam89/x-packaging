"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/shared/ui/Button";
import { apiBase } from "@/lib/api";
import { FaStar } from "react-icons/fa";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onReviewAdded: () => Promise<void>;
};

type ReviewForm = {
  name: string;
  position: string;
  review: string;
  rating: number;
};

const initialForm: ReviewForm = {
  name: "",
  position: "",
  review: "",
  rating: 5,
};

export default function AddReviews({ isModalOpen, setIsModalOpen, onReviewAdded }: Props) {
  const [form, setForm] = useState<ReviewForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isModalOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setForm(initialForm);
  };

  const submitToApi = async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    return res.ok;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const okLower = await submitToApi(`${apiBase}/rating/create`);
      const okUpper = okLower ? true : await submitToApi(`${apiBase}/Rating/create`);
      if (!okUpper) {
        throw new Error("Unable to submit review");
      }
      await onReviewAdded();
      closeModal();
    } catch {
      setError("Review submit nahi hua. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#213554]">Write a Review</h3>
          <button
            onClick={closeModal}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#213554]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-[#213554] mb-1 block">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#EE334B]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#213554] mb-1 block">Position</label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#EE334B]"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#213554] mb-2 block">Rating *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                  className="text-2xl"
                  aria-label={`Set rating ${star}`}
                >
                  <FaStar color={star <= form.rating ? "#f0ad4e" : "#e4e5e9"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#213554] mb-1 block">Review *</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#EE334B] resize-none"
              placeholder="Write your experience"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button
            type="submit"
            label={submitting ? "Submitting..." : "Submit Review"}
            disabled={submitting}
            className="w-full bg-[#4440E6] text-white hover:bg-[#3730a3] py-3 rounded-lg"
          />
        </form>
      </div>
    </div>
  );
}
