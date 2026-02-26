import React, { useState, useEffect, useCallback, memo } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { BaseUrl } from "../../utils/BaseUrl";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import GetQuoteModal from "../common/GetQuoteModal";
import { FaAngleRight } from "../../components/Icon";

const CategoryBoxes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    let retryCount = 0;
    const maxRetries = 2;

    const attemptFetch = async (attemptNumber = 1) => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          `${BaseUrl}/category/getAll?page=1&perPage=5`,
          { timeout: 20000 }
        );

        if (response?.data?.status === "success" && response?.data?.data) {
          setCategories(response.data.data);
          return true;
        }

        return false;
      } catch (error) {
        if (
          attemptNumber < maxRetries &&
          (error.code === "ECONNABORTED" ||
            !error.response ||
            error.response?.status >= 500)
        ) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * attemptNumber)
          );
          return attemptFetch(attemptNumber + 1);
        }

        return false;
      }
    };

    const success = await attemptFetch();
    if (!success) setCategories([]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleRequestQuote = useCallback((category) => {
    setSelectedCategory(category);
    setIsQuoteModalOpen(true);
  }, []);

  return (
    <>
      <div className="py-10 bg-white">
        <div className="sm:max-w-8xl w-[95%] mx-auto">
          
          {/* Header */}
          <div className="text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Customized Packaging for Every Industry
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              We recognize that each industry has distinct packaging requirements.
              <Link
                to="/categories"
                className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center hover:opacity-80 transition"
              >
                View all
                <FaAngleRight className="ml-1" size={15} />
              </Link>
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
                  <div className="bg-gray-200 h-6 rounded mb-2" />
                  <div className="bg-gray-200 h-4 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
            
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="group flex flex-col items-center text-center"
                  >
                    <Link to={`/category/${category.slug}`}>
                      <div className="relative w-full sm:h-64 h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 group-hover:shadow-lg transition duration-300">
                        <img
                          src={
                            category.image
                              ? `${BaseUrl}/${category.image}`
                              : `${BaseUrl}/images/placeholder.jpg`
                          }
                          alt={category.imageAltText || category.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    </Link>

                    <h3 className="font-bold text-lg text-gray-800 mb-3">
                      {category.title}
                    </h3>

                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  className="bg-[#800020] text-white hover:bg-[#800020]/90 rounded-lg text-base font-semibold"
                  label="Get Instant Quote"
                  onClick={() => setIsQuoteModalOpen(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <GetQuoteModal
        isModalOpen={isQuoteModalOpen}
        setIsModalOpen={setIsQuoteModalOpen}
        closeModal={() => setIsQuoteModalOpen(false)}
        categoryData={selectedCategory}
      />
    </>
  );
};

export default memo(CategoryBoxes);
