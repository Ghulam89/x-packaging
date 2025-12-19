import React, { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
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
                  <Input
                    label="Box Style"
                    star={"*"}
                    name="boxStyle"
                    value={formData.boxStyle}
                    onChange={handleChange}
                    placeholder="e.g., Mailer Box, Tuck Top"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      label="Length"
                      star={"*"}
                      name="length"
                      type="number"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                    <span className="absolute right-4 top-[38px] text-gray-500 text-sm">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      label="Width"
                      star={"*"}
                      name="width"
                      type="number"
                      value={formData.width}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                    <span className="absolute right-4 top-[38px] text-gray-500 text-sm">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      label="Depth"
                      star={"*"}
                      name="depth"
                      type="number"
                      value={formData.depth}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                    <span className="absolute right-4 top-[38px] text-gray-500 text-sm">{formData.unit}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Select
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option>Inches</option>
                    <option>mm</option>
                    <option>cm</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Input
                    label="Quantity"
                    star={"*"}
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 1000"
                    required
                  />
                </div>
              </div>

              {/* Material & Printing Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Select
                    label="Material Stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Select Material"
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
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select
                    label="Printing Colors"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Select Color Options"
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
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select
                    label="Add-Ons"
                    name="addons"
                    value={formData.addons}
                    onChange={handleChange}
                    placeholder="Select Add-Ons"
                  >
                    <option>Select Add-Ons</option>
                    <option>Foiling</option>
                    <option>Spot UV</option>
                    <option>Embossing</option>
                    <option>Debossing</option>
                    <option>Handles</option>
                    <option>Inserts</option>
                    <option>Windows</option>
                  </Select>
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
                  <Textarea
                    label="Additional Details"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your design preferences, special requirements, or any other details..."
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep1()}
                  label="Next Step"
                  rIcons={<FaArrowRight />}
                  className={!validateStep1() ? 'bg-gray-300 cursor-not-allowed' : ''}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input
                    label="Full Name"
                    star={"*"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    label="Email Address"
                    star={"*"}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

             

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  label="Previous"
                  Icons={<FaArrowLeft />}
                />
                {isLoading ? (
                  <Button
                    type="submit"
                    disabled={true}
                    label="Processing..."
                    className="bg-gray-300 cursor-not-allowed"
                  />
                ) : (
                  <Button
                    type="submit"
                    disabled={!validateStep2()}
                    label="Submit Quote Request"
                    rIcons={<FaArrowRight />}
                    className={!validateStep2() ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'}
                  />
                )}
              </div>
            </div>
          )}
        </form>

        
      </div>

    </div>
  );
};

export default GetPriceQuote;