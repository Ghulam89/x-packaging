import React, { useState, useEffect } from 'react'
import ProductCard, { ProductSelectionProvider } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px', // Start loading 100px before component is visible
    triggerOnce: true
  });

  useEffect(() => {
    // Only fetch products when component is about to be visible
    if (!isIntersecting) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products using getAll API without category filter
        const response = await axios.get(`${BaseUrl}/products/getAll?page=1&perPage=8`);
        
        if (response?.data?.status === 'success' && response?.data?.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isIntersecting]);

  return (
    <div ref={elementRef} className=' bg-[#f7f7f7] pt-12'>
      <div className=' sm:max-w-8xl w-[95%] mx-auto'>
        <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
          <h2 className=' text-left'>Top Packaging Styles</h2>

          <p className=' border-l  border-gray-300 pl-3 '>We cover all your packaging needs. Can't find yours?</p>
          <Link to="" className=" uppercase">
            <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
          </Link>
        </div>
        {loading ? (
          <div className="py-2">
            <CardSlider
              top={40}
              items={Array(8).fill(null).map((_, index) => (
                <div key={index} className="w-[85vw] sm:w-[365px] flex-shrink-0 px-2 sm:px-2">
                  <div 
                    className="group text-gray-700 bg-[#F9F9F9] rounded-3xl flex font-bold flex-col gap-0.5 items-center border border-gray-200 animate-pulse"
                  >
                    <div className="p-4 relative overflow-hidden rounded-3xl w-full">
                      <div className="relative w-full h-[200px] sm:h-[300px] rounded-2xl overflow-hidden bg-gray-200"></div>
                    </div>
                    <div className="pb-3 w-3/4">
                      <div className="bg-gray-200 rounded h-4 w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        ) : (
          <ProductSelectionProvider>
            <CardSlider
              top={40}
              items={products?.map((item, index) => {
                return (
                  <div key={item._id || index} className="w-[85vw] sm:w-[365px] flex-shrink-0 px-2 sm:px-2">
                    <ProductCard data={item} disableSelection={true} />
                  </div>
                );
              })}
            />
          </ProductSelectionProvider>
        )}
      </div>

    </div>
  )
}

export default Category