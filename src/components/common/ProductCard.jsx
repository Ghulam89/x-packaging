import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ image, title, unit, delivery }) => {
  return (
    <Link
      to="#"
      className="block w-56 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 overflow-hidden hover:scale-105"
    >
    
      <div className="relative group">
        <img
          src={
            image ||
            "https://www.halfpricepackaging.com/_ipx/f_webp&fit_cover&s_336x336/https://www.halfpricepackaging.com/storage/product_uploads/makeup-boxes.jpg"
          }
          alt={title || "Product Image"}
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-900 truncate">
          {title || "Makeup Boxes"}
        </h5>

    
        <Link
          to="/product-detail"
          className=" flex items-center gap-2   mt-2  text-[#EE334B] text-sm font-medium rounded-lg transition"
        >
          Read More <FaArrowRightLong />
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;
