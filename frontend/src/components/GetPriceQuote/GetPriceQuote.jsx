import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaBox, FaUser, FaRuler, FaLayerGroup, FaImage, FaCheck, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow } from 'swiper/modules';
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9 } from "../../assets";

// Gallery images - moved outside component to avoid dependency issues
const galleryImages = [
  { src: gallery1, alt: "Eco-friendly cosmetic packaging with botanical design" },
  { src: gallery2, alt: "Luxury wine bottle with embossed label" },
  { src: gallery5, alt: "Minimalist food packaging with clean typography" },
  { src: gallery9, alt: "Sustainable product box with recycled materials" },
  { src: gallery6, alt: "Colorful retail packaging with geometric patterns" },
  { src: gallery7, alt: "Elegent gift box with ribbon closure" },
  { src: gallery8, alt: "Modern tech product packaging with sleek design" },
  { src: gallery3, alt: "Vintage-inspired packaging with nostalgic elements" },
  { src: gallery4, alt: "Creative product container with unique shape" }
];

const GetPriceQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to ensure they show on first load
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = galleryImages.map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = img.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Still show gallery even if some images fail
      }
    };

    loadImages();
  }, []);

  const initialFormState = {
    productName: "",
    name: "",
    email: "",
    phoneNumber: "",
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
    stock: "Stock",
    printing: "Printing",
    quantity: "",
    image: null,
    message: "",
    pageUrl: typeof window !== "undefined" ? window.location.href : ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateForm = () => {
    return (
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.quantity &&
      formData.name &&
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phoneNumber
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
    if (!validateForm()) {
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
        setFormData(initialFormState);
        navigate('/thank-you-page');
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f7f7f7] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Easy to Design & Professional Results Gallery Section */}
      <section className='py-8 bg-white mb-8'>
        <div className="sm:max-w-full max-w-[95%] mx-auto">
          <div className='text-center mb-6'>
            <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-2'>
              Easy to Design & Professional Results
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 max-w-6xl mx-auto">
              Start creating your custom boxes effortlessly with our extensive library, featuring fully customizable layouts for promotional, mailer, and display boxes, plus industry-specific styles for cosmetics, hotels, apparel, and more. Need expert guidance? Our professional designers are ready to assist—so you can design with confidence and package your products in a box that stands out.
            </p>
          </div>
          
          <div className='max-w-8xl mx-auto py-8'>
            <style>{`
              .gallery-center-swiper .swiper-slide {
                transition: all 0.4s ease;
                opacity: 0.5;
                transform: scale(0.8);
              }
              .gallery-center-swiper .swiper-slide-active {
                opacity: 1;
                transform: scale(1.1);
                z-index: 10;
              }
              .gallery-center-swiper .swiper-slide-prev,
              .gallery-center-swiper .swiper-slide-next {
                opacity: 0.7;
                transform: scale(0.9);
              }
              .gallery-center-swiper .swiper-button-next,
              .gallery-center-swiper .swiper-button-prev {
                display: none !important;
              }
              .gallery-center-swiper .swiper-slide img {
                transition: all 0.4s ease;
              }
              .gallery-center-swiper .swiper-slide-active img {
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              }
              @media (max-width: 640px) {
                .gallery-center-swiper .swiper-slide {
                  transform: scale(0.9);
                }
                .gallery-center-swiper .swiper-slide-active {
                  transform: scale(1.05);
                }
              }
            `}</style>
            {imagesLoaded && (
              <Swiper
                modules={[Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: true,
                }}
                navigation={false}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={galleryImages.length > 5}
                spaceBetween={30}
                className="gallery-center-swiper"
                onSwiper={(swiper) => {
                  // Force update to ensure images render
                  setTimeout(() => {
                    swiper.update();
                  }, 100);
                }}
              >
                {galleryImages.map((img, index) => (
                  <SwiperSlide 
                    key={index}
                    style={{ width: 'auto', maxWidth: '500px' }}
                  >
                    <div className="block group relative mx-auto overflow-hidden rounded-[15px]">
                      <div className="relative overflow-hidden rounded-[15px] shadow-lg transition-all duration-300">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="swiper-lazy rounded-[15px] w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                          loading={index < 3 ? "eager" : "lazy"}
                          onLoad={() => {
                            // Ensure image is visible after load
                            const swiper = document.querySelector('.gallery-center-swiper')?.swiper;
                            if (swiper) {
                              swiper.update();
                            }
                          }}
                        />
                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[15px]"></div>
                        {/* Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-[15px]"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {!imagesLoaded && (
              <div className="flex justify-center items-center h-[450px]">
                <div className="animate-pulse text-gray-400">Loading gallery...</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Side - Form */}
        <div className=" w-12/12 mx-auto">
        <div className="bg-[#ffffff] rounded-tr-[30px] sm:rounded-tr-[50px] overflow-hidden">
          {/* Red Header Banner */}
          <div className="bg-[#EE334B] text-white rounded-tr-full py-3 sm:py-4 px-4 sm:px-6 text-center">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase">GET CUSTOM QUOTE</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Product Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <FaBox className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Product Information</label>
              </div>
              <Input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="bg-gray-100 border-gray-300"
              />
            </div>

            {/* Select Sizes */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FaRuler className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Select Sizes</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <Input
                  name="length"
                  type="number"
                  value={formData.length}
                  onChange={handleChange}
                  placeholder="Length"
                  required
                  className="bg-gray-100 border-gray-300"
                />
                <Input
                  name="width"
                  type="number"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Width"
                  required
                  className="bg-gray-100 border-gray-300"
                />
                <Input
                  name="depth"
                  type="number"
                  value={formData.depth}
                  onChange={handleChange}
                  placeholder="Depth"
                  required
                  className="bg-gray-100 border-gray-300"
                />
                <Select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Inches</option>
                  <option>mm</option>
                  <option>cm</option>
                </Select>
              </div>
            </div>

            {/* Choose Materials */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaLayerGroup className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Choose Materials</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <Select
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Stock</option>
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
                <Select
                  name="printing"
                  value={formData.printing}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Printing</option>
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
                <Input
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  required
                  className="bg-gray-100 border-gray-300"
                />
              </div>
            </div>

            {/* Upload Artwork */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 mb-2">
                <FaImage className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Upload Artwork</label>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-left bg-white">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden text-left"
                  id="file-upload"
                  accept=".png,.pdf,.jpg,.jpeg,.webp"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button type="button" className="px-3 sm:px-4 py-2 bg-gray-200 rounded text-xs sm:text-sm hover:bg-gray-300 whitespace-nowrap">
                    Choose File
                  </button>
                  <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left break-all">
                    {formData.image ? formData.image.name : "No file chosen"}
                  </span>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Personal Information</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className="bg-gray-100 border-gray-300"
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID*"
                  required
                  className="bg-gray-100 border-gray-300"
                />
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Contact Number*"
                  required
                  className="bg-gray-100 border-gray-300"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaInfoCircle className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Additional Information</label>
              </div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Message..."
                className="bg-gray-100 border-gray-300"
              />
            </div>

            {/* Submit Button with reCAPTCHA */}
            <div className=" flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              {/* reCAPTCHA */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="recaptcha" 
                    className="w-4 h-4 sm:w-5 sm:h-5 border-gray-400 rounded cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="recaptcha" className="text-xs sm:text-sm text-gray-700 cursor-pointer">
                    I'm not a robot
                  </label>
                </div>
                <div className="flex flex-col items-start sm:items-center ml-6 sm:ml-0">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2" fill="none"/>
                      <path d="M12 6v6l4 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="font-semibold">reCAPTCHA</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500">
                    Privacy - Terms
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              {isLoading ? (
                <button
                  type="submit"
                  disabled={true}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-300 text-white text-sm sm:text-base font-bold rounded-lg cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
                >
                  Processing...
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateForm()}
                  className={`px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-lg text-white whitespace-nowrap transition-colors w-full sm:w-auto ${
                    !validateForm() 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-[#EE334B] hover:bg-[#d6283f] cursor-pointer'
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
        </div>

        {/* Right Side - Content */}
        <div className="bg-[#f7f7f7] p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Watermark Background - Right Side */}
          <div className="hidden md:flex absolute -top-32 sm:-top-32 bottom-0 -right-8 sm:-right-16 items-center justify-end pr-4 sm:pr-8 pointer-events-none">
            <h6
              className="text-[40px] sm:text-[60px] lg:text-[100px] font-bold text-gray-300 opacity-20 select-none" 
              style={{ 
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(0deg)'
              }}
            >
              Custom Quote
            </h6>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 lg:mb-6 leading-tight">
              Custom Boxes, Designed for Your Brand, Made for Your Needs - Without the Hassle.
            </h3>
            
            <p className="text-gray-600 mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
              Ensuring the perfect fit, protection, branding, and presentation for your custom boxes is effortless with our comprehensive support.
            </p>
            
            <p className="text-gray-600 mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
              Get expert guidance, access a vast design library, and find the right size by sending your product. We assist in selecting the best materials, printing techniques, finishes, laminations, and add-ons—tailored to your packaging needs and purpose, without the hassle.
            </p>
            
            <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Still, There's More!
            </h4>
            
            <ul className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <li className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-3 sm:p-4">
                <FaCheckCircle className="text-[#EE334B] text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">New look for your brand</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-3 sm:p-4">
                <FaCheckCircle className="text-[#EE334B] text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Perfect fit to your products</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-3 sm:p-4">
                <FaCheckCircle className="text-[#EE334B] text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Perfect fit to your purpose</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-3 sm:p-4 sm:h-14">
                <FaCheckCircle className="text-[#EE334B] text-lg sm:text-xl mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">All with convenience quick</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPriceQuote;