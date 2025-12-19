import React, { useState, useEffect } from 'react'
import ProductCard, { ProductSelectionProvider } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className=' my-12'>
      <div className=' sm:max-w-8xl w-[95%] mx-auto'>
        <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
          <h2 className=' text-left'>Top Packaging Styles</h2>

          <p className=' border-l  border-gray-300 pl-3 '>We cover all your packaging needs. Can't find yours?</p>
          <Link to="" className=" uppercase">
            <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <ProductSelectionProvider>
            <CardSlider
              top={40}
              items={products?.map((item, index) => {
                return (
                  <div key={item._id || index} className="w-[390px] flex-shrink-0 px-2">
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