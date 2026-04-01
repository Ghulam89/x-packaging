"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/ui/Input";
import Button from "@/components/shared/ui/Button";
import { apiBase } from "@/lib/api";
import type { CartItem, CheckoutForm } from "@/types";
import {
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiLockLine,
  RiShoppingBagLine,
} from "react-icons/ri";

const CART_STORAGE_KEY = "cartItems";

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    note: "",
    acceptTerms: false,
  });

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + toNumber(item.price) * Math.max(1, toNumber(item.quantity)),
        0
      ),
    [cartItems]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const checked =
      "checked" in e.target ? (e.target as HTMLInputElement).checked : undefined;
    const type = "type" in e.target ? e.target.type : "text";
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.acceptTerms || isProcessing) return;
    setIsProcessing(true);

    const checkoutPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      companyName: formData.companyName,
      note: formData.note,
      delivery: {
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        addressLine1: formData.address1,
        addressLine2: formData.address2,
      },
      productIds: cartItems.map((item) => item._id),
      totalBill: subtotal.toFixed(2),
      userId:
        typeof window !== "undefined" ? localStorage.getItem("userId") || null : null,
    };

    try {
      const response = await fetch(`${apiBase}/checkout/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            typeof window !== "undefined"
              ? `Bearer ${localStorage.getItem("token") || ""}`
              : "",
        },
        body: JSON.stringify(checkoutPayload),
      });

      if (response.ok) {
        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems([]);
        router.push("/");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center">
              <RiShoppingBagLine className="w-12 h-12 text-[#213554]/40" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#213554] mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Please add items to your cart before checkout.</p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <RiArrowLeftLine className="w-5 h-5" />
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto py-8 sm:py-12 px-4">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[#213554] hover:text-[#EE334B] font-medium mb-4 transition-colors"
          >
            <RiArrowLeftLine className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-2 flex items-center gap-3">
            <RiLockLine className="w-8 h-8 text-[#EE334B]" />
            Checkout
          </h1>
          <p className="text-gray-600">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h4 className="text-xl font-bold text-[#213554] mb-6 flex items-center gap-2">
                  <RiCheckboxCircleLine className="w-6 h-6 text-[#EE334B]" />
                  Billing Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-1">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" star="*" required />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" star="*" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Company Name (optional)" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Country / Region" name="country" value={formData.country} onChange={handleInputChange} placeholder="Select Country" star="*" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Street address" name="address1" value={formData.address1} onChange={handleInputChange} placeholder="House number and street name" star="*" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input name="address2" value={formData.address2} onChange={handleInputChange} placeholder="Apartment, suite, unit, etc. (optional)" />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="Town / City" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" star="*" required />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="State" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" star="*" required />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="ZIP Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP Code" star="*" required />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" star="*" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" star="*" required />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h4 className="text-lg font-bold text-[#213554] mb-4">Order Notes (Optional)</h4>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full bg-white border-2 border-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-8">
                <h4 className="text-xl font-bold text-[#213554] mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                  <RiShoppingBagLine className="w-6 h-6 text-[#EE334B]" />
                  Order Summary
                </h4>

                <div className="space-y-4 mb-6">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={item._id || String(index)} className="flex justify-between items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#213554] line-clamp-2">{item.title || item.name || "Product"}</p>
                          <p className="text-xs text-gray-500 mt-1">Qty: {Math.max(1, toNumber(item.quantity))}</p>
                        </div>
                        <p className="text-sm font-semibold text-[#EE334B] whitespace-nowrap">
                          ${(toNumber(item.price) * Math.max(1, toNumber(item.quantity))).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Subtotal</span>
                      <span className="text-lg font-semibold text-[#213554]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t-2 border-[#213554]">
                      <span className="text-lg font-bold text-[#213554]">Total</span>
                      <span className="text-2xl font-bold text-[#EE334B]">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  Your personal data will be used to process your order and support your experience throughout this website.
                </p>

                <div className="flex items-start mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="terms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 w-5 h-5 text-[#EE334B] border-gray-300 rounded focus:ring-2 focus:ring-[#EE334B] cursor-pointer"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    I have read and agree to the website{" "}
                    <Link href="/terms-and-conditions" className="text-[#EE334B] hover:underline font-medium">
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  type="submit"
                  label={isProcessing ? "Processing..." : "Place Order"}
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-[#7249A4] to-[#EE334B] hover:from-[#7249A4]/90 hover:to-[#EE334B]/90 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
