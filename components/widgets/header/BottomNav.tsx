"use client";
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { FaAngleDown, FaAngleRight, FaBed, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterest, FaYoutube } from "react-icons/fa";
import { MdOutdoorGrill } from "react-icons/md";
import { TbToolsKitchen3 } from "react-icons/tb";
import Link from "next/link";
import { LiaAngleRightSolid } from "react-icons/lia";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";
import { apiBase, siteOrigin } from "@/lib/api";
import { ASSETS } from "@/lib/assets";
import { FaXTwitter } from "react-icons/fa6";

// Add animations to document head
if (typeof document !== 'undefined' && !document.getElementById('bottomnav-animations')) {
    const style = document.createElement('style');
    style.id = 'bottomnav-animations';
    style.textContent = `
        @keyframes slideDown {
            0% { transform: translateY(-10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        .animate-slideDown {
            animation: slideDown 0.3s ease-out;
        }
        .animate-slideInLeft {
            animation: slideInLeft 0.3s ease-out;
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Cache for brands data
const BRANDS_CACHE_KEY = 'brands_cache';
const BRANDS_CACHE_TIMESTAMP = 'brands_cache_timestamp';
const CACHE_DURATION = 30 * 60 * 1000;

// Get cached brands data
const getCachedBrands = () => {
  try {
    const cached = localStorage.getItem(BRANDS_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
};

// Save brands data to cache
const saveBrandsToCache = (data: any[]) => {
  try {
    localStorage.setItem(BRANDS_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(BRANDS_CACHE_TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error('Error saving cache:', error);
  }
};

// Map category names to icons (case-insensitive)
const CATEGORY_ICON_MAP = Object.freeze({
  "box by industry": <FaBed />,
  "shapes & styles": <MdOutdoorGrill />,
  "materials": <TbToolsKitchen3 />,
  "boxes by material": <TbToolsKitchen3 />,
  "sticker labels & others": <TbToolsKitchen3 />,
});

const getCategoryIcon = (categoryName = "") => {
  const key = String(categoryName).toLowerCase();
  return (CATEGORY_ICON_MAP as Record<string, React.ReactNode>)[key] || <FaBed />;
};

const transformBrandsData = (brandsData: any[]) => {
  if (!Array.isArray(brandsData)) {
    return [];
  }
  return brandsData.map((brand) => ({
    category: brand?.name || "",
    slug: brand?.slug || "",
    icon: getCategoryIcon(brand?.name),
    menu:
      Array.isArray(brand?.midcategories)
        ? brand.midcategories.map((midcat: any) => ({
            title: midcat?.title || "",
            icon:
              typeof midcat?.icon === "string" && midcat.icon.startsWith("http")
                ? midcat.icon
                : `${siteOrigin}/${String(midcat?.icon || "").replace(/^\//, "")}`,
            slug: midcat?.slug || "",
          }))
        : [],
  }));
};

const normalizeBrands = (res: any) => {
  if (!res) return null;
  const a = res.data ?? res;
  if (Array.isArray(a)) return a;
  if (a && Array.isArray(a.data)) return a.data;
  if (a && a.data && Array.isArray(a.data.data)) return a.data.data;
  return null;
};

const BottomNav = ({ Menu, OpenMenu, initialBrands = [] }: { Menu: boolean; OpenMenu?: (open?: boolean) => void; initialBrands?: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const safeOpenMenu = useCallback((v?: boolean) => {
    if (typeof OpenMenu === "function") OpenMenu(v ?? false);
  }, [OpenMenu]);

  const displayCategories = useMemo(
    () => (Array.isArray(categories) && categories.length > 0 ? categories : []),
    [categories]
  );

  // Use SSR-provided brands for first paint
  useEffect(() => {
    if (Array.isArray(initialBrands) && initialBrands.length > 0) {
      saveBrandsToCache(initialBrands);
      setCategories(transformBrandsData(initialBrands) as any);
      setLoading(false);
    }
  }, [initialBrands]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (Menu) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [Menu]);

  useEffect(() => {
    const cachedData = getCachedBrands();
    if (cachedData) {
      setCategories(transformBrandsData(cachedData) as any);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${apiBase}/brands/getAll`, { cache: "no-store" });
        const json = await res.json();
        const raw = normalizeBrands(json);
        if (Array.isArray(raw)) {
          saveBrandsToCache(raw);
          setCategories(transformBrandsData(raw) as any);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCategoryHover = useCallback((category: { category: string; slug?: string; menu?: any[] }) => {
    setHoveredCategory(category as any);
    setSelectedCategory((category as any)?.menu ?? null);
  }, []);

  const handleCategoryLeave = useCallback(() => {
    setHoveredCategory(null);
    setSelectedCategory(null);
  }, []);

  const CategorySkeleton = () => (
    <div className="flex gap-7 items-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-6 w-32 bg-gray-200 animate-pulse rounded"
        ></div>
      ))}
    </div>
  );

  return (
    <div className="relative shadow-md" onMouseLeave={handleCategoryLeave}>
     
      <div className="hidden sm:block pb-1 bg-gradient-to-r from-white via-gray-50/30 to-white border-b border-gray-100">
        <div className="flex justify-between items-center sm:max-w-8xl max-w-[95%] mx-auto">
        <ul className="flex gap-5 items-center">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-[#213554] hover:text-[#EE334B] transition-all duration-300 rounded-lg hover:bg-[#EE334B]/5 relative group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE334B] to-[#213554] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          {displayCategories.map((category, index) => {
        
            const isBoxByIndustry = (category as any).category?.toLowerCase().includes('box by industry') || (category as any).category?.toLowerCase().includes('box by industry');
            return (
              <li
                key={(category as any)?.slug || (category as any)?.category || index}
                className="relative"
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={(category as any).menu?.length > 0 ? undefined : handleCategoryLeave}
              >
                <Link
                  href={`/${(category as any)?.slug || (category as any)?.category}`}
                  className="flex relative cursor-pointer group items-center gap-1 px-3 py-2.5 text-sm font-semibold text-[#213554] hover:text-[#EE334B] transition-all duration-300 rounded-lg hover:bg-[#EE334B]/5"
                  onClick={() => handleCategoryLeave()}
                >
                  <span className="relative z-10">{isBoxByIndustry ? 'box by industry' : (category as any).category}</span>
                  {(category as any).menu?.length > 0 && (
                    <FaAngleDown className="ml-1 group-hover:rotate-180 transition-transform duration-300" size={14} />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE334B] to-[#213554] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            );
          })}
          
          <li>
            <Link
              href="/shop"
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-[#213554] hover:text-[#EE334B] transition-all duration-300 rounded-lg hover:bg-[#EE334B]/5 relative group"
            >
              <span className="relative z-10">Portfolio</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE334B] to-[#213554] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-[#213554] hover:text-[#EE334B] transition-all duration-300 rounded-lg hover:bg-[#EE334B]/5 relative group"
            >
              <span className="relative z-10">Client Spotlights</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE334B] to-[#213554] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-[#213554] hover:text-[#EE334B] transition-all duration-300 rounded-lg hover:bg-[#EE334B]/5 relative group"
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EE334B] to-[#213554] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>
         <div className=" flex gap-2 items-center">
          {/* Left Side: Social Media Icons with About US */}
         <div className="flex items-center space-x-2">
            <a href="#" aria-label="Facebook" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaFacebookF size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Twitter" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaXTwitter size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Instagram" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaInstagram size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Pinterest" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaPinterest size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="YouTube" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaYoutube size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaLinkedinIn size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            {/* Red Separator */}
            <div className="h-8 w-0.5 mx-2"></div>
            {/* About US */}
            {/* <Link to="/about-us" className="text-[#213554] font-semibold text-lg sm:text-2xl" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
              About US
            </Link> */}
          </div>
        {/* Global Operations - Right Side */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-700 font-medium">Local Globally:</span>
          <div className="flex items-center space-x-0.5">
            <Image src={ASSETS.flags.usa} alt="USA" width={28} height={28} className="w-7 h-7 object-center" />
            <Image src={ASSETS.flags.uk} alt="UK" width={28} height={28} className="w-7 h-7 object-center" />
            <Image src={ASSETS.flags.canada} alt="Canada" width={28} height={28} className="w-7 h-7 object-center" />
            <Image src={ASSETS.flags.australia} alt="Australia" width={28} height={28} className="w-7 h-7 object-center" />
            <Image src={ASSETS.flags.uae} alt="UAE" width={28} height={28} className="w-7 h-7 object-center" />
            <Image src={ASSETS.flags.china} alt="China" width={28} height={28} className="w-7 h-7 object-center" />
           
          </div>
        </div>
         </div>
        </div>

        {/* Dropdown Menu */}
        {hoveredCategory && selectedCategory && (
          <div
            className="absolute top-full left-0 w-full z-50 animate-fadeIn"
            onMouseEnter={() => handleCategoryHover(hoveredCategory)}
            onMouseLeave={handleCategoryLeave}
          >
            {/* Invisible bridge area to prevent cursor loss - overlaps with menu */}
            <div className="h-3 w-full absolute top-0 left-0 -mt-3 bg-transparent pointer-events-auto"></div>
            <div className="mx-8 pt-3">
              <div className="max-w-8xl mx-auto shadow-2xl rounded-2xl bg-white/90 backdrop-blur-lg backdrop-saturate-150 border border-gray-200 justify-between p-6 flex gap-6 animate-slideDown">
                <div className="w-9/12 grid grid-cols-5 gap-4">
                  {(selectedCategory as any).map((submenu: { slug?: string; title?: string; icon?: string }, index: number) => (
                    <Link
                      key={(submenu as any)?.slug || (submenu as any)?.title || index}
                      href={`/category/${(submenu as any).slug || (submenu as any).title}`} 
                      className="text-gray-700 flex font-bold flex-col gap-2 items-center transition-all duration-300 group hover:scale-105"
                      onClick={() => handleCategoryLeave()} 
                    >
                      <div className="h-56 w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:border-[#213554]/30 relative">
                        <Image
                          src={(submenu as any)?.icon}
                          alt={(submenu as any).title}
                          width={400}
                          height={224}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                       
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                       
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                      </div>
                      <p className="pt-2 text-sm text-center text-[#213554] group-hover:text-[#EE334B] transition-colors duration-300">{submenu.title}</p>
                    </Link>
                  ))}
                </div>

                <div className="w-3/12 border-l border-gray-200 pl-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#213554] mb-1">Explore Categories</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] rounded-full"></div>
                  </div>
                  <ul className="flex flex-col ">
                    {(selectedCategory as any)?.map((item: { slug?: string; title?: string }, index: number) => (
                      <li key={(item as any)?.slug || (item as any)?.title || index}>
                        <Link
                          href={`/category/${(item as any)?.slug || (item as any)?.title}`}
                          className="font-semibold flex items-center justify-between py-2 px-3 rounded-lg text-[#213554] hover:bg-[#EE334B]/10 hover:text-[#EE334B] transition-all duration-300 group"
                          onClick={() => handleCategoryLeave()}
                        >
                          <span>{item?.title}</span>
                          <LiaAngleRightSolid size={16} className="text-[#EE334B] group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </li>
                    ))}

                    {hoveredCategory && (
                      <li className="mt-4">
                        <Link 
                          href={`/${(hoveredCategory as any)?.slug || (hoveredCategory as any)?.category}`}
                          onClick={() => handleCategoryLeave()}
                        >
                          <Button label={`View all ${(hoveredCategory as any)?.category || 'Categories'}`} className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white w-full">
                            
                          </Button>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden ${Menu ? "block" : "hidden"} bg-black/60 backdrop-blur-sm fixed z-[10000] inset-0 animate-fadeIn`}
        onClick={() => safeOpenMenu(false)}
      >
        <div 
          className="bg-gradient-to-br from-white to-gray-50 md:w-96 w-80 h-full overflow-y-auto shadow-2xl animate-slideInLeft"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <div>
              <Image src={ASSETS.logo} alt="Logo" width={144} height={40} className="w-36" />
            </div>
            <div className="cursor-pointer">
              <div className="bg-gradient-to-r from-[#EE334B] to-[#213554] w-10 h-10 rounded-full flex justify-center items-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg">
                <svg
                  onClick={() => safeOpenMenu(false)}
                  width={20}
                  aria-hidden="true"
                  color="white"
                  role="presentation"
                  className="text-white"
                  fill="white"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <ul className="flex flex-col p-4 gap-1">
            <li>
              <Link
                href="/"
                className="block px-4 py-3 font-semibold text-[#213554] hover:text-[#EE334B] hover:bg-[#EE334B]/10 rounded-lg transition-all duration-300"
                onClick={() => safeOpenMenu(false)}
              >
                Home
              </Link>
            </li>
            {displayCategories.map((category: { slug?: string; category?: string }, index: number) => (
              <li key={(category as any)?.slug || (category as any)?.category || index}>
                <Link
                  href={`/${(category as any)?.slug || (category as any)?.category}`}
                  className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left text-[#213554] hover:text-[#EE334B] hover:bg-[#EE334B]/10 rounded-lg transition-all duration-300"
                  onClick={() => safeOpenMenu(false)}
                >
                  <span>{(category as any)?.category}</span>
                </Link>
                {(category as any)?.menu?.length > 0 && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {(category as any)?.menu.map((submenu: { slug?: string; title?: string }, subIndex: number) => (
                      <li key={(submenu as any)?.slug || (submenu as any)?.title || subIndex}>
                        <Link
                          href={`/category/${(submenu as any)?.slug || (submenu as any)?.title}`}
                          className="block px-4 py-2 text-gray-700 hover:text-[#EE334B] hover:bg-[#EE334B]/5 rounded-lg transition-all duration-300 text-sm"
                          onClick={() => safeOpenMenu(false)}
                        >
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-1 pt-1 border-t border-gray-200">
              <Link
                href="/shop"
                className="block px-4 py-3 font-semibold text-center text-[#EE334B] hover:text-white hover:bg-[#EE334B] rounded-lg transition-all duration-300"
                onClick={() => safeOpenMenu(false)}
              >
                View all
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block px-4 py-3 font-semibold text-[#213554] hover:text-[#EE334B] hover:bg-[#EE334B]/10 rounded-lg transition-all duration-300"
                onClick={() => safeOpenMenu(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="block px-4 py-3 font-semibold text-[#213554] hover:text-[#EE334B] hover:bg-[#EE334B]/10 rounded-lg transition-all duration-300"
                onClick={() => safeOpenMenu(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="block px-4 py-3 font-semibold text-[#213554] hover:text-[#EE334B] hover:bg-[#EE334B]/10 rounded-lg transition-all duration-300"
                onClick={() => safeOpenMenu(false)}
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

export default memo(BottomNav);
