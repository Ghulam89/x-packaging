import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaUpload, FaInfoCircle, FaBox, FaUser } from "react-icons/fa";

const GetPriceQuote = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialFormState = {
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
    image: null,
    message: "",
    pageUrl: typeof window !== "undefined" ? window.location.href : ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateStep1 = () => {
    return (
      formData.boxStyle &&
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.quantity
    );
  };

  const validateStep2 = () => {
    return (
      formData.name &&
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) {
      toast.error("Please fill all required fields with valid information");
      return;
    }
    
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

      if (response.data.status === 'success') {
        toast.success("Quote request submitted successfully!");
        setIsLoading(false);
        setStep(1);
        navigate('/thank-you-page');
        setFormData(initialFormState);
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      toast.error("Please fill all required fields in Product Specification");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="sm:max-w-8xl w-[95%] mx-auto">
      {/* Header Section */}
      <div className="text-center mb-10">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Get Your Custom Quote
        </h1>
       
        
      </div>

     

      <div className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
         {/* Progress Steps */}
      {/* <div className="flex items-center justify-center mb-10">
        <div className="flex items-center w-full max-w-md">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-200 text-gray-500'} transition-all duration-300`}>
            <span className="font-bold">1</span>
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'} transition-all duration-300`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-200 text-gray-500'} transition-all duration-300`}>
            <span className="font-bold">2</span>
          </div>
        </div>
      </div> */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
          <div className={`p-3 rounded-lg ${step === 1 ? 'bg-blue-100 text-gray-700' : 'bg-gray-100 text-gray-600'}`}>
            {step === 1 ? <FaBox size={24} /> : <FaUser size={24} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 ? "Product Specifications" : "Contact Information"}
            </h2>
            <p className="text-gray-600">
              {step === 1 ? "Tell us about your packaging needs" : "How can we reach you?"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              {/* Box Style & Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Box Style <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="boxStyle"
                    value={formData.boxStyle}
                    onChange={handleChange}
                    placeholder="e.g., Mailer Box, Tuck Top"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Length <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="length"
                      type="number"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white pr-12"
                      required
                    />
                    <span className="absolute right-3 top-3 text-gray-500">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Width <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="width"
                      type="number"
                      value={formData.width}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white pr-12"
                      required
                    />
                    <span className="absolute right-3 top-3 text-gray-500">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Depth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="depth"
                      type="number"
                      value={formData.depth}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white pr-12"
                      required
                    />
                    <span className="absolute right-3 top-3 text-gray-500">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white appearance-none"
                  >
                    <option>Inches</option>
                    <option>mm</option>
                    <option>cm</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Material & Printing Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Material Stock
                  </label>
                  <select
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white appearance-none"
                  >
                    <option>Select Material</option>
                    <option>12pt Cardboard</option>
                    <option>14pt Cardboard</option>
                    <option>16pt Cardboard</option>
                    <option>18pt Cardboard</option>
                    <option>20pt Cardboard</option>
                    <option>White SBS C1S C25</option>
                    <option>Corrugated</option>
                    <option>Rigid</option>
                    <option>Kraft</option>
                    <option>Linen</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Printing Colors
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white appearance-none"
                  >
                    <option>Select Color Options</option>
                    <option>Plain (No Printing)</option>
                    <option>1 Color</option>
                    <option>2 Color</option>
                    <option>3 Color</option>
                    <option>4 Color</option>
                    <option>4/1 Color</option>
                    <option>4/2 Color</option>
                    <option>4/3 Color</option>
                    <option>4/4 Color</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Add-Ons
                  </label>
                  <select
                    name="addons"
                    value={formData.addons}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white appearance-none"
                  >
                    <option>Select Add-Ons</option>
                    <option>Foiling</option>
                    <option>Spot UV</option>
                    <option>Embossing</option>
                    <option>Debossing</option>
                    <option>Handles</option>
                    <option>Inserts</option>
                    <option>Windows</option>
                  </select>
                </div>
              </div>

              {/* Design Upload & Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaUpload className="text-[#EE334B]" />
                      Upload Design (Max 5MB)
                    </div>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-blue-400 transition-colors duration-300 bg-white">
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="hidden"
                      id="file-upload"
                      accept=".png,.pdf,.jpg,.jpeg,.webp"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <FaUpload className="text-[#213554] text-2xl" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          Drop your files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, PDF, JPG, JPEG, WEBP
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                    placeholder="Tell us about your design preferences, special requirements, or any other details..."
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep1()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${!validateStep1()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#213554] to-[#213554] hover:from-red-600 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                >
                  Next Step
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  />
                </div>
              </div>

             

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <FaArrowLeft />
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={!validateStep2() || isLoading}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${!validateStep2() || isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Quote Request
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        
      </div>

    </div>
  );
};

export default GetPriceQuote;