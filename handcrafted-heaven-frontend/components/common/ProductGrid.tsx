"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Paginate";
import { Product } from "@/lib/types";

interface Category {
  id: number;
  name: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetch function, preventing unnecessary re-creation
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Construct the URL with optional categoryId
      const categoryQuery =
        selectedCategoryId !== null ? `&categoryId=${selectedCategoryId}` : "";
      const res = await api.get(
        `/products?page=${currentPage}${categoryQuery}`
      );
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategoryId]);

  // Effect to fetch categories once on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        setCategories(res.data.categories); // Fix: Access the 'categories' key from the response
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Handle error by setting an empty array to prevent issues
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Effect to fetch products whenever the category or page changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Dependency array now includes the memoized fetchProducts function

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId =
      e.target.value === "all" ? null : parseInt(e.target.value, 10);
    setSelectedCategoryId(newCategoryId);
    setCurrentPage(1); // Always reset to the first page when a new filter is selected
  };

  // Conditionally render based on loading/error states
  if (loading) {
    return (
      <div className="text-center text-gray-500 my-8">Loading products...</div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 my-8">Error: {error}</p>;
  }

  return (
    <>
      <div className="flex justify-center my-8">
        <div className="relative inline-block w-64">
          <label htmlFor="category-select" className="sr-only">
            Filter by Category
          </label>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            value={
              selectedCategoryId === null
                ? "all"
                : selectedCategoryId.toString()
            }
            className="block w-full appearance-none bg-white text-neutral-900 border border-gray-300 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200"
          >
            <option value="all">All Products</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-neutral-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="my-12">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 my-8">No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
