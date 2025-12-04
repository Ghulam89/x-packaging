import React, { useState } from "react";
import { FaAngleDown, FaAngleRight, FaBed } from "react-icons/fa";
import { MdOutdoorGrill } from "react-icons/md";
import { TbToolsKitchen3 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import logo from '../../assets/images/brand/logo.png';
import Button from "../common/Button";

const BottomNav = ({ Menu, OpenMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      category: "Box by industry",
      icon: <FaBed />,
      menu: [
        {
          title: "Cosmetics",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
        },
        {
          title: "Candle",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
        },
        {
          title: "Bakery",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
        },
        {
          title: "CBD",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
        },
        {
          title: "Sustainable Packaging",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
        },
      ],
    },
    {
      category: "Shapes & styles",
      icon: <MdOutdoorGrill />,
      menu: [
        {
          title: "Cosmetics",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
        },
        {
          title: "Candle",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
        },
        {
          title: "Bakery",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
        },
        {
          title: "CBD",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
        },
        {
          title: "Sustainable Packaging",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
        },
      ],
    },
    {
      category: "Materials",
      icon: <TbToolsKitchen3 />,
      menu: [
        {
          title: "Cosmetics",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
        },
        {
          title: "Candle",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
        },
        {
          title: "Bakery",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
        },
        {
          title: "CBD",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
        },
        {
          title: "Sustainable Packaging",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
        },
      ],
    },
    {
      category: "Sticker labels & others",
      icon: <TbToolsKitchen3 />,
      menu: [
        {
          title: "Cosmetics",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cosmetics.png",
        },
        {
          title: "Candle",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/candle.png",
        },
        {
          title: "Bakery",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/bakery.png",
        },
        {
          title: "CBD",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/cbd.png",
        },
        {
          title: "Sustainable Packaging",
          icon: "https://www.halfpricepackaging.com/_ipx/f_webp&s_500x345/https://www.halfpricepackaging.com/storage/cat_uploads/sustainable%20packaging.png",
        },
      ],
    },
  ];

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setSelectedCategory(category.menu);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    setSelectedCategory(null);
  };

  return (
    <div className="relative">
      {/* Desktop Menu */}
      <div className="hidden sm:block py-2">
        <ul className="flex gap-7 items-center max-w-7xl mx-auto px-4">
          <Link
            to="#"
            className="flex items-center gap-1 py-2.5 text-sm font-semibold transition-colors"
          >
            Home
          </Link>
          {categories.map((category, index) => (
            <Link
              to={`/category/${category?.category}`}
              key={index}
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={handleCategoryLeave}
              className="flex relative cursor-pointer group items-center gap-1 py-2.5 text-sm font-semibold transition-colors"
            >
              {category.category}
              {category.menu?.length > 0 && (
                <FaAngleDown className="ml-1" size={15} />
              )}
            </Link>
          ))}
          <Link
            to="#"
            className="flex items-center gap-1 py-2.5 text-sm font-semibold transition-colors"
          >
            About Us
          </Link>
          <Link
            to="#"
            className="flex items-center gap-1 py-2.5 text-sm font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </ul>

        {/* Dropdown Menu */}
        {hoveredCategory && selectedCategory && (
          <div
            className="absolute top-12 pt-2.5 bg-white left-0 w-full z-50"
            onMouseEnter={() => handleCategoryHover(hoveredCategory)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 justify-between py-3 flex gap-3">
                {selectedCategory.map((submenu, index) => (
                  <Link
                    key={index}
                    to={`/sub-category/${submenu.title}`}
                    className="text-gray-700 w-5/12 flex font-bold flex-col gap-0.5 items-center transition-colors"
                  >
                    <div className="h-44 w-44 bg-[#F9F9F9] rounded-3xl">
                      <img
                        src={submenu?.icon}
                        alt=""
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    </div>
                    <p className="pt-2 font-bold">{submenu.title}</p>
                  </Link>
                ))}

                <div className="w-6/12 border-l border-gray-200 pl-5">
                  <ul className="flex flex-col gap-1.5">
                    {selectedCategory?.map((item, index) => (
                      <Link
                        to={"#"}
                        key={index}
                        className="font-bold flex items-center justify-between"
                      >
                        {item?.title}
                        <LiaAngleRightSolid size={15} color="#EE334B" />
                      </Link>
                    ))}

                    <Link className="mt-5">
                      <Button
                        className="bg-[#213554] text-white"
                        label={"View all Industries"}
                      />
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        
        className={`sm:hidden ${Menu ? "block" : "hidden"} bg-[rgba(0,0,0,0.5)]   fixed  inset-0 left-0     z-40  right-0 top-0 w-full`}
      >
        <div className=" bg-white md:w-96  w-80 h-full  overflow-y-auto">
         <div className=" p-3 w-fy border-b flex justify-between  items-center border-gray-200">
          <div>
          <img src={logo} alt=""   className=" w-36" />
          </div>
          <div className=" cursor-pointer">
          <div className="  bg-[#EE334B] w-8 h-8   rounded-full flex justify-center items-center">
          <svg
              onClick={()=>OpenMenu(false)}
              width={20}
              aria-hidden="true"
              color="white"
              role="presentation"
              className=" text-white"
              fill="white"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path>
            </svg>
            
          </div>
          </div>
          
         </div>
        <ul className="flex flex-col p-4">
          <li>
            <Link
              to="/"
              className="font-semibold transition-colors"
              onClick={OpenMenu}
            >
              Home
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to="#"
                className="flex items-center gap-1 py-2.5 font-semibold transition-colors"
                onClick={OpenMenu}
              >
                {category.category}
              </Link>
              {category.menu?.length > 0 && (
                <ul className="pl-4">
                  {category.menu.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={`/sub-category/${submenu.title}`}
                        className="text-gray-700 flex gap-0.5 items-center transition-colors"
                        onClick={OpenMenu}
                      >
                        {submenu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link
              to="/portfolio"
              className="font-semibold transition-colors"
              onClick={OpenMenu}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="font-semibold transition-colors"
              onClick={OpenMenu}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="hover:text-orange-500 transition-colors"
              onClick={OpenMenu}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="hover:text-orange-500 transition-colors"
              onClick={OpenMenu}
            >
              Contact us
            </Link>
          </li>
        </ul>

        </div>
      
      </div>
    </div>
  );
};

export default BottomNav;