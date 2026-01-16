import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import GetQuoteModal from '../common/GetQuoteModal';

const CategoryBoxes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Fetch top categories from API with iOS Safari compatible configuration
        const response = await axiosInstance.get(`${BaseUrl}/category/getAll?page=1&perPage=5`, {
          timeout: 15000, // 15 second timeout for iOS Safari
        });
        
        if (response?.data?.status === 'success' && response?.data?.data) {
          setCategories(response.data.data);
        } else {
          // Handle unexpected response format
          console.warn('Unexpected API response format:', response?.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Retry once for iOS Safari network issues
        if (error.code === 'ECONNABORTED' || !error.response) {
          try {
            const retryResponse = await axiosInstance.get(`${BaseUrl}/category/getAll?page=1&perPage=5`, {
              timeout: 20000, // Longer timeout on retry
            });
            if (retryResponse?.data?.status === 'success' && retryResponse?.data?.data) {
              setCategories(retryResponse.data.data);
              return;
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleRequestQuote = (category) => {
    setSelectedCategory(category);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <div className="pb-12 pt-6 bg-white">
        <div className="sm:max-w-8xl w-[95%] mx-auto">
          {/* Header Section - Always visible */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Custom Boxes for Every Industry
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Discover our custom boxes crafted for your industry. Perfectly designed to showcase, store, and ship products while elevating your brand identity.
            </p>
          </div>

          {/* Categories Grid - Loading or Content */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* Category Image */}
                    <div className="relative w-full rounded-2xl overflow-hidden mb-4 bg-gray-50 group-hover:shadow-lg transition-shadow duration-300">
                      <Link to={`/category/${category.slug}`}>
                        <img
                          src={category.image ? `${BaseUrl}/${category.image}` : `${BaseUrl}/images/placeholder.jpg`}
                          alt={category.imageAltText || category.title}
                          className="w-full sm:h-64 h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    {/* Category Title */}
                    <h3 className="font-bold text-lg text-gray-800 mb-3">
                      {category.title}
                    </h3>

                    {/* Request Quote Link */}
                    <button
                      onClick={() => handleRequestQuote(category)}
                      className="text-[#EE334B] font-semibold hover:underline transition-colors"
                    >
                      Request a Quote
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom Request A Quote Button */}
              <div className="flex justify-center mt-6">
                <Button
                  className="bg-[#800020] text-white hover:bg-[#800020]/90 rounded-lg px-8 py-3 text-base font-semibold"
                  label="Request A Quote"
                  onClick={() => setIsQuoteModalOpen(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Request Quote Modal */}
      <GetQuoteModal 
        isModalOpen={isQuoteModalOpen} 
        setIsModalOpen={setIsQuoteModalOpen}
        closeModal={() => setIsQuoteModalOpen(false)}
        categoryData={selectedCategory}
      />
    </>
  );
};

export default CategoryBoxes;

