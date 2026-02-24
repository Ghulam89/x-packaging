import React, { useState, useEffect, useCallback, memo } from "react";
import ProductCard, { ProductSelectionProvider } from "../common/ProductCard";
import { Link } from "react-router-dom";
import CardSlider from "../common/CardSlider";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useIntersectionObserver } from "../../utils/useIntersectionObserver";
import { FaAngleRight } from "../../components/Icon";

const Category = ({ serverData }) => {
  const [products, setProducts] = useState(serverData || []);
  const [loading, setLoading] = useState(!(serverData?.length > 0));

  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    triggerOnce: true,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BaseUrl}/products/getAll?page=1&perPage=8`
      );

      if (response?.data?.status === "success") {
        setProducts(response.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Category products fetch error:", error?.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (serverData?.length > 0) {
      setProducts(serverData);
      setLoading(false);
      return;
    }

   
    if (isIntersecting) {
      fetchProducts();
    }
  }, [serverData, isIntersecting, fetchProducts]);

  return (
    <section ref={elementRef} className="bg-[#f7f7f7] pt-10">
      <div className="sm:max-w-8xl w-[95%] mx-auto">

        
        <div className="text-left mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Signature Packaging Styles
          </h2>

          <p className="text-gray-600 text-base sm:text-lg">
            Explore our range of premium packaging shapes and styles.
            <Link
              to="/products"
              className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center hover:opacity-80 transition"
            >
              View all
              <FaAngleRight className="ml-1" size={15} />
            </Link>
          </p>
        </div>

       
        {loading ? (
          <div className="py-2">
            <CardSlider
              top={40}
              items={Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-[85vw] sm:w-[280px] flex-shrink-0 px-2 sm:px-2">
                  <div className="bg-[#F9F9F9] rounded-3xl border border-gray-200 animate-pulse">
                    <div className="h-[250px] bg-gray-200 rounded-2xl m-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
                  </div>
                </div>
              ))}
            />
          </div>
        ) : (
          <ProductSelectionProvider>
            <CardSlider
              top={40}
              items={products.map((item) => (
                <div
                  key={item._id}
                  className="w-[85vw] sm:w-[285px] flex-shrink-0 px-2 sm:px-2"
                >
                  <ProductCard
                    data={item}
                    disableSelection
                  />
                </div>
              ))}
            />
          </ProductSelectionProvider>
        )}
      </div>
    </section>
  );
};

export default memo(Category);