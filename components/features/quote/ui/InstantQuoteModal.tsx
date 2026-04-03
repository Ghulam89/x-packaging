"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { apiBase } from "@/lib/api";
import Button from "@/components/shared/ui/Button";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type CategoryData = {
  title?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categoryData?: CategoryData | null;
};

export default function InstantQuoteModal({ isOpen, onClose, categoryData = null }: Props) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && categoryData?.title) {
      setCategoryName(categoryData.title);
    } else if (!isOpen) {
      setCategoryName("");
    }
  }, [isOpen, categoryData?.title]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const reset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setImage(null);
    setError(null);
    if (!categoryData?.title) setCategoryName("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !emailValid) {
      setError("Please enter your name and a valid email.");
      return;
    }
    if (image && image.size > MAX_FILE_SIZE) {
      setError("File too large (max 5MB).");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phoneNumber", phoneNumber.trim());
      formData.append("categoryName", categoryName.trim());
      formData.append("message", message.trim());
      if (typeof window !== "undefined") {
        formData.append("pageUrl", window.location.href);
      }
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${apiBase}/instantQuote/create`, {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as {
        status?: string;
        message?: string;
      } | null;

      if (response.ok && data?.status === "success") {
        reset();
        onClose();
        router.push("/thank-you-page");
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/50 p-3 sm:p-6 overflow-y-auto"
      onMouseDown={handleOverlayMouseDown}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Get an instant quote"
        className="relative mx-auto mt-6 sm:mt-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#213554] via-[#EE334B] to-[#213554]" />
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Close modal"
        >
          <MdClose size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="relative z-10 p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-3 font-serif tracking-tight">
              Get an Instant Quote
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We&apos;re honored you found your way to Custom Packaging. This is our thank you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full">
              <label className="block text-[#213554] text-sm font-semibold mb-2">Category Name</label>
              <input
                type="text"
                name="categoryName"
                placeholder="Category"
                value={categoryName}
                readOnly
                disabled
                className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="w-full sm:col-span-1">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Name <span className="text-[#EE334B]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
                />
              </div>
              <div className="w-full sm:col-span-1">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Email <span className="text-[#EE334B]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
                />
              </div>
              <div className="w-full sm:col-span-1">
                <label className="block text-[#213554] text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-[#213554] text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We will promptly provide you with a quote"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 resize-none"
              />
            </div>

            <div className="w-full">
              <label className="block text-[#213554] text-sm font-semibold mb-2">
                Upload Image
                <span className="text-gray-500 text-xs font-normal ml-2">
                  (Max Size 5MB, Allowed: png, pdf, jpg, jpeg, webp)
                </span>
              </label>
              <input
                type="file"
                name="image"
                accept=".png,.pdf,.jpg,.jpeg,.webp"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#EE334B] file:text-white hover:file:bg-[#EE334B]/90 file:cursor-pointer file:transition-all file:duration-300 file:shadow-sm hover:file:shadow-md focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
              />
              {image ? (
                <div className="mt-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-700 text-sm flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{image.name}</span>
                  </p>
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="pt-2">
              <Button
                type="submit"
                label={isSubmitting ? "Submitting..." : "Get Instant Quote"}
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-lg font-bold bg-[#213554] hover:opacity-95 text-white"
                size="lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
