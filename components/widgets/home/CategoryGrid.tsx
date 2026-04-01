"use client";
import { siteOrigin } from "@/lib/api";
import type { Product } from "@/types";
import ProductCard from "@/components/entities/product/ui/ProductCard";

export default function CategoryGrid({ products = [] as Product[] }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="mx-auto w-[95%] sm:max-w-8xl py-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">
          Popular Products
        </h2>
        <p className="text-gray-600 mt-2">
          Best-sellers chosen by customers across categories
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => {
          const img =
            p.images && p.images[0]?.url ? `${siteOrigin}/${p.images[0].url}` : "";
          return (
            <ProductCard
              key={p._id}
              href={`/product/${p.slug}`}
              title={p.name || p.slug}
              imageSrc={img}
              imageAlt={p.name || p.slug}
              variant="grid"
              cardClassName="hover:shadow-sm"
              subtitle="View details"
            />
          );
        })}
      </div>
    </section>
  );
}
