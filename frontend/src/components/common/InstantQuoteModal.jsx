import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstantQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal, categoryData }) => {


  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // phoneNumber: Yup.string()
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .min(10, "Must be at least 10 digits")
    //   .required("Phone number is required"),
    // message: Yup.string().required("Message is required"),
    // image: Yup.mixed()
    //   .required("Image is required")
    //   .test(
    //     "fileSize",
    //     "File too large (max 5MB)",
    //     (value) => value && value.size <= 5 * 1024 * 1024
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported file format",
    //     (value) =>
    //       value &&
    //       ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"].includes(
    //         value.type
    //       )
    //   ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      categoryName: "",
      message: "",
      image: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("categoryName", values.categoryName || "");
        formData.append("message", values.message);
        formData.append("image", values.image);
        formData.append("pageUrl", window.location.href);

        const response = await axios.post(`${BaseUrl}/instantQuote/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if(response?.data?.status==="success"){
        //  toast.success(response?.data?.message)
         navigate('/thank-your-page')
        }else{
          toast.error(response?.data?.message)
        }

        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data?.message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Auto-fill category name when modal opens and categoryData is available
  useEffect(() => {
    if (isModalOpen && categoryData?.title) {
      formik.setFieldValue('categoryName', categoryData.title);
    } else if (!isModalOpen) {
      // Reset category name when modal closes
      formik.setFieldValue('categoryName', '');
    }
  }, [isModalOpen, categoryData?.title]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className={"rounded-2xl max-w-[40%]"}>
      <div className="overflow-y-auto max-h-[90vh]">
        {/* Professional White Background */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Decorative Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#213554] via-[#EE334B] to-[#213554]"></div>

          {/* Close Button - Top Right */}
          <button
            onClick={() => {
              formik.resetForm();
              setIsModalOpen(false);
            }}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            aria-label="Close modal"
          >
            <MdClose size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Content Container */}
          <div className="relative z-10 p-5 sm:p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-3 font-serif tracking-tight">
                Get an Instant Quote
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We're honored you found your way to Custom Packaging. This is our thank you.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Category Name Field - Full Width */}
              <div className="w-full">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Apparel and Fashion Boxes"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                  className={`w-full px-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed ${
                    formik.touched.categoryName && formik.errors.categoryName
                      ? "border-red-400"
                      : ""
                  }`}
                />
                {formik.touched.categoryName && formik.errors.categoryName && (
                  <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{formik.errors.categoryName}</span>
                  </div>
                )}
              </div>

              {/* Name & Email - Side by Side */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Name Field */}
                <div className="w-full">
                  <label className="block text-[#213554] text-sm font-semibold mb-2">
                    Name <span className="text-[#EE334B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span>
                      <span>{formik.errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="w-full">
                  <label className="block text-[#213554] text-sm font-semibold mb-2">
                    Email <span className="text-[#EE334B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3.5 pr-12 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-400"
                          : ""
                      }`}
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span>
                      <span>{formik.errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone Number Field */}
              <div className="w-full">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-400"
                      : ""
                  }`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{formik.errors.phoneNumber}</span>
                  </div>
                )}
              </div>
              </div>

              

              {/* Message Field */}
              <div className="w-full">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We'll promptly provide you with a quote"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#213554] placeholder:text-gray-400 focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 resize-none ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-400"
                      : ""
                  }`}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{formik.errors.message}</span>
                  </div>
                )}
              </div>

              {/* File Upload Field */}
              <div className="w-full">
                <label className="block text-[#213554] text-sm font-semibold mb-2">
                  Upload Image
                  <span className="text-gray-500 text-xs font-normal ml-2">
                    (Max Size 5MB, Allowed: png, pdf, jpg, jpeg, webp)
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    onBlur={formik.handleBlur}
                    accept=".png,.pdf,.jpg,.jpeg,.webp"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#EE334B] file:text-white hover:file:bg-[#EE334B]/90 file:cursor-pointer file:transition-all file:duration-300 file:shadow-sm hover:file:shadow-md focus:outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
                  />
                  {formik.values.image && (
                    <div className="mt-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm flex items-center gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{formik.values.image.name}</span>
                      </p>
                    </div>
                  )}
                </div>
                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{formik.errors.image}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  label={formik.isSubmitting ? "Submitting..." : "Get Instant Quote"}
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="w-full py-4 px-6 text-lg font-bold"
                  variant="primary"
                  size="lg"
                  Icons={formik.isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : null}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InstantQuoteModal;