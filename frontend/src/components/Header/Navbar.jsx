import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/brand/logo.png";
import Input from "../common/Input";
import Button from "../common/Button";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import ProductCard, { ProductSelectionProvider } from "../common/ProductCard";
import GetQuoteModal from "../common/GetQuoteModal";
import { FiPhone } from "react-icons/fi";
import portfolio from "../../assets/images/brand/portfolio.png";
import custom from "../../assets/images/brand/custom-pricing.png";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const searchRef = useRef(null);

  const OpenMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 2) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearchLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/products/search?name=${query}`);
      setSearchResults(response.data.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="flex  w-full justify-between h-20 items-center">
          <Link to={'/'} className="">
            <img src={logo} alt="" className="sm:w-[250px] w-auto" loading="eager" fetchpriority="high" />
          </Link>
          <div className="w-lg sm:relative  search-container" ref={searchRef}>
            <Input
              placeholder={"Search For Products"}
              className={"rounded-full p-2 w-full border bg-white border-gray-300 shadow-xs"}
              value={searchQuery}
              onChange={handleSearch}
            />
            {showResults && (
              <div className="absolute z-50 mt-1 left-0 w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {isSearchLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#213554]"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <ProductSelectionProvider>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 p-4">
                      {searchResults.map((product) => (
                        <div 
                          key={product._id}
                          onClick={handleResultClick}
                          className="h-full w-full"
                        >
                          <ProductCard 
                            data={product} 
                            disableSelection={true}
                            size="compact"
                          />
                        </div>
                      ))}
                    </div>
                  </ProductSelectionProvider>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center justify-end gap-2">
              {/* Our Portfolio Button */}
              <Link to="/portfolio" className="flex items-start gap-1 bg-white  rounded-lg px-4 py-3   transition-all cursor-pointer">
                <img src={portfolio} width={40} height={40} alt="" />
                <div className="flex flex-col">
                  <span className="font-bold text-[#213554] text-sm leading-tight">Our Portfolio</span>
                  <span className="text-xs text-gray-500 mt-0.5">Check For Ideas</span>
                </div>
              </Link>
              
              {/* Custom Pricing Button */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex items-start gap-1 bg-white  rounded-lg px-4 py-3   transition-all cursor-pointer"
              >
                <img src={custom} width={40} height={40} alt="" />
                <div className="flex flex-col">
                  <span className="font-bold text-[#213554] text-sm leading-tight">Custom</span>
                  <span className="text-xs text-gray-500 mt-0.5">Pricing</span>
                </div>
              </button>
              
              {/* Phone Button */}
              <Button
                className="bg-[#EE334B] text-white hover:bg-[#EE334B]/90 rounded-lg px-4 py-2"
                label="888-276-1239"
                Icons={<FiPhone size={18} />}
              />
            </div>
          </div>

          <div className="block sm:hidden cursor-pointer   px-1.5 py-1.5 rounded-sm">
          
            <button  onClick={OpenMenu} class="text-right cursor-pointer" aria-label="Mobile Menu Toggle Button"><span class="block h-[3px] w-[32px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[24px] bg-[#555555] mb-[4px] ml-auto"></span><span class="block h-[3px] w-[16px] bg-[#555555] ml-auto"></span></button>
            
          </div>
        </div>

       
      </div>
      <BottomNav Menu={menu} OpenMenu={OpenMenu} />
      
      {/* Request Quote Modal */}
      <GetQuoteModal 
        isModalOpen={isQuoteModalOpen} 
        setIsModalOpen={setIsQuoteModalOpen}
        closeModal={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;