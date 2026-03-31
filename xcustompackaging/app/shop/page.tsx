"use client";
import React, { Suspense, useState, useEffect } from "react";
import { MdClose, MdFilterList } from "react-icons/md";
import Banner from "@/components/shared/marketing/Banner";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import Button from "@/components/shared/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
const ShopContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(12);

  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [productsError, setProductsError] = useState(false);

  const selectedBrandId = searchParams.get("brandId");
  const selectedCategoryId = searchParams.get("categoryId");

  // Update URL params (Next.js way)
  const updateParams = (paramsObj: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]) {
        params.set(key, paramsObj[key]);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  // Fetch Brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brands/getAll?all=true");
        const data = await res.json();
        if (data?.status === "success") {
          setBrands(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/getAll?page=1&perPage=100");
        const data = await res.json();
        if (data?.status === "success") {
          setCategories(data.data);
        }
        if (data?.status === "success") {
          setCategories(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFilters(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  const fetchProducts = async (page = 1, loadMore = false) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      let url = `/products/getAll?page=${page}&perPage=${perPage}`;

      if (selectedBrandId) url += `&brandId=${selectedBrandId}`;
      if (selectedCategoryId) url += `&categoryId=${selectedCategoryId}`;

      const response = await fetch(url);
      const data = await response.json();
      const res = { data };

      if (res?.data?.status === "success") {
        if (loadMore) {
          setProducts((prev) => [...prev, ...(res.data.data as any[])]);
        } else {
          setProducts(res.data.data);
        }

        setCurrentPage(res?.data?.pagination?.page || page);
        setTotalPages(res?.data?.pagination?.totalPages || 1);
        setProductsError(false);
      } else {
        setProductsError(true);
      }
    } catch (err) {
      console.error(err);
      setProductsError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    fetchProducts(1);
  }, [selectedBrandId, selectedCategoryId]);

  // Filters
  const handleBrandChange = (id: string) => {
    updateParams({
      brandId: id === selectedBrandId ? null : id,
    });
  };

  const handleCategoryChange = (id: string) => {
    updateParams({
      categoryId: id === selectedCategoryId ? null : id,
    });
  };

  const clearFilters = () => {
    router.push("?");
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, true);
    }
  };

  return (
    <>
      <Banner title="Catalogue" subTitle="Catalogue" />

      <div className="container mx-auto px-4 py-10 flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 shadow rounded sticky top-4">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <MdFilterList /> Filters
          </h3>

          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Brands</h4>
            {brands.map((b) => (
              <label key={(b as any)._id} className="flex gap-2">
                <input
                  type="radio"
                  checked={selectedBrandId === (b as any)._id}
                  onChange={() => handleBrandChange((b as any)._id)}
                />
                {(b as any).name}
              </label>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            {categories.map((c) => (
              <label key={(c as any)._id} className="flex gap-2">
                <input
                  type="radio"
                  checked={selectedCategoryId === (c as any)._id}
                  onChange={() => handleCategoryChange((c as any)._id)}
                />
                {(c as any).title || (c as any).name}
              </label>
            ))}
          </div>

          <button onClick={clearFilters} className="mt-4 text-red-500">
            Clear Filters
          </button>
        </div>

        {/* Products */}
        <div className="w-3/4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="grid grid-cols-3 gap-6">
                {/* {products.map((item) => (
                  <ProductCard key={(item as any)._id} product={item as any} />

                ))} */}
              </div>

              {currentPage < totalPages && (
                <div className="text-center mt-6">
                  <Button
                    label={loadingMore ? "Loading..." : "Load More"}
                    onClick={handleLoadMore}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-10">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default Page;
