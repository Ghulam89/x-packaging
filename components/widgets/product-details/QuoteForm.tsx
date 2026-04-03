"use client";
import React, { useState, memo, useCallback, useMemo, useEffect } from "react";
import Input from "@/components/shared/ui/Input";
import Select from "@/components/shared/ui/Select";
import Textarea from "@/components/shared/ui/Textarea";
import Button from "@/components/shared/ui/Button";
import { apiBase } from "@/lib/api";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  product: Product | null;
};

function createEmptyFormState() {
  return {
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    boxStyle: "",
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
    stock: "Stock",
    color: "Colors",
    printingSides: "Inside",
    quantity: "",
    addons: "",
    image: null as File | null,
    message: "",
    pageUrl: "",
  };
}

const QuoteForm = memo(({ product }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState(createEmptyFormState);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, pageUrl: window.location.href }));
  }, []);

  const isValid = useMemo(() => {
    return (
      formData.boxStyle &&
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.quantity &&
      formData.name &&
      formData.email
    );
  }, [
    formData.boxStyle,
    formData.length,
    formData.width,
    formData.depth,
    formData.quantity,
    formData.name,
    formData.email,
  ]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            formDataToSend.append(key, value as any);
          }
        });

        const response = await fetch(`${apiBase}/requestQuote/create`, {
          method: "POST",
          body: formDataToSend,
        });

        const result = await response.json();

        if (result.status === "success") {
          setSuccess(true);
          setFormData({
            ...createEmptyFormState(),
            pageUrl: window.location.href,
          });
          router.push("/thank-you-page");
        } else {
          setError(result.message || "Something went wrong. Please try again.");
        }
      } catch (err) {
        setError("Failed to send request. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 [&>*]:min-w-0">
        <Input
          label="Name"
          star="*"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className=" rounded-lg"
          placeholder="Name"
          required
        />
        <Input
          label="Email"
          star="*"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className=" rounded-lg"
          placeholder="Email"
          required
        />
        <div className="col-span-2 sm:col-span-1 min-w-0">
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            className=" rounded-lg"
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 [&>*]:min-w-0">
        <Input
          label="Box Style"
          star="*"
          name="boxStyle"
          value={formData.boxStyle}
             className=" rounded-lg"
          onChange={handleChange}
          placeholder="Box Style"
          required
        />
        <Input
          label="Length"
          star="*"
          name="length"
          type="number"
          value={formData.length}
             className=" rounded-lg"
          onChange={handleChange}
          placeholder="Length"
          required
        />
        <Input
          label="Width"
          star="*"
          name="width"
          type="number"
          value={formData.width}
             className=" rounded-lg"
          onChange={handleChange}
          placeholder="Width"
          required
        />
        <Input
          label="Depth"
          star="*"
          name="depth"
          type="number"
          value={formData.depth}
             className=" rounded-lg"
          onChange={handleChange}
          placeholder="Depth"
          required
        />
        <Select
          label="Unit"
          name="unit"
          value={formData.unit}
             className=" rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="Inches">Inches</option>
          <option value="mm">mm</option>
          <option value="cm">cm</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 [&>*]:min-w-0">
        <Select
          label="Stock"
          name="stock"
          value={formData.stock}
             className=" rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="Stock">Stock</option>
          <option value="12pt Cardboard">12pt Cardboard</option>
          <option value="14pt Cardboard">14pt Cardboard</option>
          <option value="16pt Cardboard">16pt Cardboard</option>
          <option value="White SBS">White SBS</option>
          <option value="Corrugated">Corrugated</option>
          <option value="Rigid">Rigid</option>
          <option value="Kraft">Kraft</option>
        </Select>
        <Select
          label="Colors"
          name="color"
          value={formData.color}
             className=" rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="Colors">Colors</option>
          <option value="Plain">Plain (No Printing)</option>
          <option value="1 Color">1 Color</option>
          <option value="2 Color">2 Color</option>
          <option value="Full Color">4 Color (CMYK)</option>
        </Select>
        <Select
          label="Printing"
          name="printingSides"
          value={formData.printingSides}
             className=" rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="Inside">Inside</option>
          <option value="Outside">Outside</option>
          <option value="Both">Both Sides</option>
        </Select>
        <Input
          label="Quantity"
          star="*"
          name="quantity"
          type="number"
             className=" rounded-lg"  
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 [&>*]:min-w-0">
        <div className="flex flex-col w-full min-w-0">
          <label className="text-sm mb-3 font-semibold text-[#213554]">
            Upload Design <span className="text-red-500">*</span>
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#EE334B] transition-colors cursor-pointer bg-gray-50">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".png,.pdf,.jpg,.jpeg,.webp"
            />
            <div className="space-y-1">
              <svg
                className="mx-auto h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-xs text-gray-600">
                {formData.image
                  ? formData.image.name
                  : "Click to upload design"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full min-w-0">
          <Textarea
            label="Description"
            name="message"
            star="*"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your requirements..."
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        label={isLoading ? "Sending..." : "Get a Free Quote"}
        className={`w-full py-4 text-lg font-bold ${
          !isValid || isLoading ? "opacity-50" : ""
        }`}
        disabled={!isValid || isLoading}
      />
    </form>
  );
});

QuoteForm.displayName = "QuoteForm";
export default QuoteForm;
