"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type MouseEvent } from "react";
import { apiBase } from "@/lib/api";
import { ASSETS } from "@/lib/assets";
import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import Textarea from "@/components/shared/ui/Textarea";
import type { QuoteCategory, QuoteFormState } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  category?: QuoteCategory | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function GetQuoteModal({ isOpen, onClose, category = null }: Props) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const initialFormState = useMemo<QuoteFormState>(
    () => ({
      name: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      boxStyle: category?.title || "",
      length: "",
      width: "",
      depth: "",
      unit: "Inches",
      stock: "Stock",
      colors: "Colors",
      printingSides: "Inside",
      quantity: "",
      addOns: "",
      image: null,
      description: "",
      pageUrl: "",
    }),
    [category?.title]
  );

  const [formData, setFormData] = useState<QuoteFormState>(initialFormState);

  useEffect(() => {
    setFormData(initialFormState);
    setStep(1);
    setSubmitMsg({ type: null, message: "" });
  }, [initialFormState, isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({ ...prev, pageUrl: window.location.href }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validateStep1 = () =>
    Boolean(
      formData.boxStyle &&
        formData.length &&
        formData.width &&
        formData.depth &&
        formData.unit &&
        formData.stock &&
        formData.colors &&
        formData.printingSides &&
        formData.quantity
    );

  const validateStep2 = () => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return Boolean(formData.name && formData.email && emailIsValid);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, files } = target;

    if (files && files[0]) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setSubmitMsg({
          type: "error",
          message: "File size exceeds 5MB limit. Please choose a smaller file.",
        });
        return;
      }
      setSubmitMsg({ type: null, message: "" });
      setFormData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setSubmitMsg({
        type: "error",
        message: "File size exceeds 5MB limit. Please choose a smaller file.",
      });
      return;
    }

    setSubmitMsg({ type: null, message: "" });
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const nextStep = () => {
    if (!validateStep1()) {
      setSubmitMsg({ type: "error", message: "Please fill all required Product Specification fields." });
      return;
    }
    setSubmitMsg({ type: null, message: "" });
    setStep(2);
  };

  const prevStep = () => {
    setSubmitMsg({ type: null, message: "" });
    setStep(1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep2()) {
      setSubmitMsg({ type: "error", message: "Please provide valid contact details." });
      return;
    }

    setIsLoading(true);
    setSubmitMsg({ type: null, message: "" });

    try {
      const payload = new FormData();
      (Object.keys(formData) as (keyof QuoteFormState)[]).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      const response = await fetch(`${apiBase}/requestQuote/create`, {
        method: "POST",
        body: payload,
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.status === "success") {
        setSubmitMsg({
          type: "success",
          message: data?.message || "Quote request submitted successfully.",
        });
        setFormData(initialFormState);
        setStep(1);
        window.setTimeout(() => onClose(), 600);
      } else {
        setSubmitMsg({ type: "error", message: data?.message || "Submission failed. Please try again." });
      }
    } catch (error) {
      const message = (error as { message?: string })?.message || "Something went wrong. Please try again.";
      setSubmitMsg({ type: "error", message });
    } finally {
      setIsLoading(false);
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
        aria-label="Request a quote"
        className="mx-auto mt-6 sm:mt-8 w-full max-w-6xl rounded-2xl bg-white shadow-xl"
      >
        <div className="bg-linear-to-br from-[#F9F9F9] to-white p-4 sm:p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="hidden h-[70vh] overflow-hidden rounded-xl shadow-lg lg:block md:w-5/12 lg:w-4/12">
              <video autoPlay muted playsInline loop className="h-full w-full object-cover">
                <source src={ASSETS.videos.about} type="video/mp4" />
              </video>
            </div>
            <div className="flex w-full flex-col md:w-12/12 lg:w-8/12">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#213554]">Request A Quote</h2>
                <button
                  type="button"
                  aria-label="Close modal"
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#EE334B]"
                  onClick={onClose}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div>
                    <h6 className="mb-5 text-xl font-bold text-[#213554]">Product Specification</h6>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <Input label="Box Style" star="*" name="boxStyle" value={formData.boxStyle} onChange={handleChange} required />
                  <Input label="Size (Length)" star="*" name="length" value={formData.length} onChange={handleChange} required />
                  <Input label="Size (Width)" star="*" name="width" value={formData.width} onChange={handleChange} required />
                  <Input label="Size (Depth)" star="*" name="depth" value={formData.depth} onChange={handleChange} required />
                  <div className="w-full">
                    <label className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">
                      Unit <span className="text-[#EE334B]">*</span>
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm"
                      required
                    >
                      <option>Inches</option>
                      <option>mm</option>
                      <option>cm</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">
                      Stock <span className="text-[#EE334B]">*</span>
                    </label>
                    <select
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm"
                      required
                    >
                      <option>Stock</option>
                      <option>12pt Cardboard</option>
                      <option>14pt Cardboard</option>
                      <option>16pt Cardboard</option>
                      <option>18pt Cardboard</option>
                      <option>20pt Cardboard</option>
                      <option>22pt Cardboard</option>
                      <option>24pt Cardboard</option>
                      <option>White SBS C1S C25</option>
                      <option>Corrugated</option>
                      <option>Rigid</option>
                      <option>Kraft</option>
                      <option>Linen</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">
                      Colors <span className="text-[#EE334B]">*</span>
                    </label>
                    <select
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm"
                      required
                    >
                      <option value="Colors">Colors</option>
                      <option value="Plain (No Printing)">Plain (No Printing)</option>
                      <option value="1 Color">1 Color</option>
                      <option value="2 Color">2 Color</option>
                      <option value="3 Color">3 Color</option>
                      <option value="4 Color">4 Color</option>
                      <option value="4/1 Color">4/1 Color</option>
                      <option value="4/2 Color">4/2 Color</option>
                      <option value="4/3 Color">4/3 Color</option>
                      <option value="4/4 Color">4/4 Color</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">
                      Printing Sides <span className="text-[#EE334B]">*</span>
                    </label>
                    <select
                      name="printingSides"
                      value={formData.printingSides}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm"
                      required
                    >
                      <option value="Inside">Inside</option>
                      <option value="Outside">Outside</option>
                      <option value="Both (Inside & Outside)">Both (Inside & Outside)</option>
                    </select>
                  </div>

                  <Input label="Quantity" star="*" name="quantity" value={formData.quantity} onChange={handleChange} required />

                  <div className="w-full">
                    <label className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">Add-Ons</label>
                    <select
                      name="addOns"
                      value={formData.addOns}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="Foiling">Foiling</option>
                      <option value="Spot UV">Spot UV</option>
                      <option value="Embossing">Embossing</option>
                      <option value="Debossing">Debossing</option>
                      <option value="handles">Handles</option>
                      <option value="Inserts">Inserts</option>
                      <option value="Windows">Windows</option>
                    </select>
                  </div>
                </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="design_upload" className="mb-1 block pb-1.5 text-sm font-semibold text-[#213554]">
                      Upload Your Design <span className="text-[#EE334B]">*</span>
                    </label>
                    <div
                      className="flex min-h-[120px] cursor-pointer flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center transition-all"
                      onDrop={handleFileDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        name="image"
                        id="design_upload"
                        onChange={handleChange}
                        className="hidden"
                        accept=".png,.pdf,.jpg,.jpeg,.webp"
                      />
                      <label htmlFor="design_upload" className="cursor-pointer">
                        <p className="text-sm font-semibold text-[#213554]">
                          {formData.image ? formData.image.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500">Max Size: 5MB | Allowed: PNG, PDF, JPG, JPEG, WEBP</p>
                      </label>
                    </div>
                  </div>

                  <Textarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us size, material, finishing, add-ons, and design preferences."
                  />
                </div>

                    <div className="mt-7 flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    label="Next Step"
                    disabled={!validateStep1()}
                    className="bg-linear-to-r from-[#7249A4] to-[#EE334B] text-white"
                  />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h6 className="mb-5 text-xl font-bold text-[#213554]">Personal Information</h6>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="Name" star="*" name="name" value={formData.name} onChange={handleChange} required />
                  <Input label="Email" star="*" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                  <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button type="button" onClick={prevStep} label="Previous" className="bg-gray-500 text-white hover:bg-gray-600" />
                  <Button
                    type="submit"
                    label={isLoading ? "Sending..." : "Submit Quote"}
                    disabled={!validateStep2() || isLoading}
                    className="bg-linear-to-r from-[#7249A4] to-[#EE334B] text-white"
                  />
                    </div>
                  </div>
                )}

                {submitMsg.type ? (
                  <p className={`mt-4 text-sm ${submitMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {submitMsg.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
