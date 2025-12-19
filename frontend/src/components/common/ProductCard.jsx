import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { prefetchProduct } from "../../utils/prefetchUtils";

// Context for product selection
const ProductSelectionContext = createContext();

export const ProductSelectionProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  
  const toggleProduct = (productId) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <ProductSelectionContext.Provider value={{ selectedProducts, toggleProduct }}>
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (!context) {
    return { selectedProducts: new Set(), toggleProduct: () => {} };
  }
  return context;
};

const ProductCard = ({data, disableSelection = false}) => {
  const { selectedProducts, toggleProduct } = useProductSelection();
  const isSelected = selectedProducts.has(data?._id);

  const handleMouseEnter = () => {
    if (data?.slug) {
      prefetchProduct(data.slug);
    }
  };

  // Prefetch product data on mousedown (before click)
  const handleMouseDown = () => {
    if (data?.slug) {
      prefetchProduct(data.slug, true);
    }
  };

  const handleProductClick = (e) => {
    // Only handle selection if not disabled and click is not on the link
    if (!disableSelection && !e.target.closest('a')) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) {
        toggleProduct(data._id);
      }
    }
  };
  
  const cardContent = (
    <div className={`text-gray-700 bg-[#F9F9F9] hover:bg-white rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transform hover:-translate-y-1 h-full group ${isSelected && !disableSelection ? 'ring-2 ring-[#EE334B] shadow-lg' : ''}`}>
      <div className="p-4 relative overflow-hidden rounded-3xl w-full">
        {data?.images?.[0]?.url ? (
          <div className="relative w-full h-[300px] rounded-2xl overflow-hidden">
            <img 
              src={`${BaseUrl}/${data?.images?.[0]?.url}`} 
              alt={data?.name || 'Product'} 
              className="w-full h-full rounded-2xl object-cover" 
              loading="lazy"
            />
            {/* Gallery Hover Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            {/* Gallery Shine Effect - Sweeps across on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
          </div>
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center rounded-2xl relative overflow-hidden">
            <span className="text-4xl font-bold text-[#213554]/30 relative z-10">
              {data?.name?.charAt(0) || 'P'}
            </span>
            {/* Gallery Hover Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            {/* Gallery Shine Effect - Sweeps across on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
          </div>
        )}
      </div>
      <p className="pb-3 font-bold group-hover:text-[#EE334B] transition-colors duration-300 text-center px-2">{data?.name || 'Product Name'}</p>
    </div>
  );
  
  return (
    <>
      {disableSelection ? (
        // For related products - no selection, just navigation
        <Link 
          state={{ productSlug: data._id}} 
          to={`/${data?.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          className="block h-full"
        >
          {cardContent}
        </Link>
      ) : (
        // For category pages - with selection functionality
        <div 
          className={`transition-all duration-300 cursor-pointer h-full ${isSelected ? 'ring-2 ring-[#EE334B] rounded-3xl p-1' : ''}`}
          onClick={handleProductClick}
        >
          <Link 
            state={{ productSlug: data._id}} 
            to={`/${data?.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            className="block h-full"
            onClick={(e) => {
              // Allow navigation to work normally
              e.stopPropagation();
            }}
          >
            {cardContent}
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
