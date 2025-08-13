"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types";
import api from "@/lib/api";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const cachedProducts = localStorage.getItem("homeProducts");
      const cacheTimestamp = localStorage.getItem("homeProductsTimestamp");
      const fourHours = 4 * 60 * 60 * 1000;

      if (
        cachedProducts &&
        cacheTimestamp &&
        Date.now() - parseInt(cacheTimestamp, 10) < fourHours
      ) {
        console.log("Using cached home products.");
        try {
          const parsed = JSON.parse(cachedProducts) as Product[];
          setProducts(parsed);
        } catch (err) {
          console.warn("Failed to parse cached products", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Fetching fresh home products from API.");
        try {
          const res = await api.get<Product[]>("/products/home");
          const fetchedProducts = res.data;

          if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
            localStorage.setItem(
              "homeProducts",
              JSON.stringify(fetchedProducts)
            );
            localStorage.setItem(
              "homeProductsTimestamp",
              Date.now().toString()
            );
          }
        } catch (err) {
          console.error("Failed to fetch featured products.", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="my-12">
      {loading ? (
        <div className="text-center text-gray-500 mb-4">
          Fetching featured products...
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
