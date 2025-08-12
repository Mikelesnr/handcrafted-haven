"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/components/admin/ProductTable";
import { Product } from "@/lib/types";
import api from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);

  // ✅ Fetch categories from correct route
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<{ categories: { name: string }[] }>(
          "/products/categories"
        );
        setCategories(res.data.categories.map((c) => c.name));
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch filtered products
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get<{
          data: Product[];
          totalPages: number;
        }>(`/products/filter?category=${categoryFilter}&page=${page}`);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching filtered products", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [categoryFilter, page]);

  // ✅ Type-safe delete
  const handleDelete = async (productId: number | string) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p.id !== Number(productId)));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="category" className="text-sm font-medium">
          Filter by Category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1); // Reset page on filter change
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading products...</p>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} />
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
