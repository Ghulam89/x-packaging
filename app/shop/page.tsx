"use client";
import React, { Suspense, useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import Banner from "@/components/shared/marketing/Banner";
import ProductCard from "@/components/entities/product/ui/ProductCard";
import Button from "@/components/shared/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { siteOrigin } from "@/lib/api";

/** Same-origin `/api/*` routes (Next catch-all → Express). Avoids browser CORS / unreachable `apiBase` hosts. */
const API = "/api";

async function readJsonBody<T>(res: Response): Promise<T | null> {
  try {
    const text = await res.text();
    if (!text.trim()) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

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
        const res = await fetch(`${API}/brands/getAll?all=true`, { cache: "no-store" });
        const data = await readJsonBody<{ status?: string; data?: unknown }>(res);
        if (data?.status === "success" && Array.isArray(data.data)) {
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
        const res = await fetch(`${API}/category/getAll?page=1&perPage=100`, { cache: "no-store" });
        const data = await readJsonBody<{ status?: string; data?: unknown }>(res);
        if (data?.status === "success" && Array.isArray(data.data)) {
          setCategories(data.data);
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
      let url = `${API}/products/getAll?page=${page}&perPage=${perPage}`;

      if (selectedBrandId) url += `&brandId=${selectedBrandId}`;
      if (selectedCategoryId) url += `&categoryId=${selectedCategoryId}`;

      const response = await fetch(url, { cache: "no-store" });
      const data = await readJsonBody<{
        status?: string;
        data?: unknown;
        pagination?: { page?: number; totalPages?: number };
      }>(response);

      if (data?.status === "success") {
        const list = Array.isArray(data.data) ? data.data : [];
        if (loadMore) {
          setProducts((prev) => [...prev, ...list]);
        } else {
          setProducts(list);
        }

        setCurrentPage(data?.pagination?.page ?? page);
        setTotalPages(data?.pagination?.totalPages ?? 1);
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
          <h3 className="flex text-black items-center gap-2 font-semibold mb-4">
            <MdFilterList className="text-[#EE334B]" size={20} /> Filters
          </h3>

          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-medium text-black mb-2">Brands</h4>
            {brands.map((b) => (
              <label key={(b as any)._id} className="flex mb-1 text-gray-800 gap-2">
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
            <h4 className="font-medium text-black mb-2">Categories</h4>
            {categories.map((c) => (
              <label key={(c as any)._id} className="flex mb-1 text-gray-800 gap-2">
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
        <div className="w-3/4 min-w-0">
          {loading ? (
            <p>Loading...</p>
          ) : productsError ? (
            <p className="text-red-600">Could not load products. Please refresh or try again later.</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No products match the current filters.</p>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
                {products.map((p: any) => {
                  const raw = p?.images?.[0]?.url;
                  const img = raw
                    ? `${siteOrigin}/${String(raw).replace(/^\//, "")}`
                    : "";
                  return (
                    <ProductCard
                      key={p._id}
                      href={`/product/${p.slug}`}
                      title={p.name || p.slug}
                      imageSrc={img}
                      imageAlt={p.name || p.slug}
                      variant="carousel"
                    />
                  );
                })}
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
