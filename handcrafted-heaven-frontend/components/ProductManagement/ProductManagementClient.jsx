'use client';
import { useEffect, useMemo, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

export default function ProductManagementClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (err) {
        if (mounted) setError(err.message || "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => (mounted = false);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (filterCategory === "all") return products;
    return products.filter(p => (p.category || "Uncategorized") === filterCategory);
  }, [products, filterCategory]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const previousProducts = [...products];
    setProducts(products.filter(p => p.id !== id)); // optimistic update
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch (error) {
      alert("Delete failed, restoring product.");
      setProducts(previousProducts);
    }
  };

  return (
    <section>
      <ProductFilter
        categories={categories}
        current={filterCategory}
        onChange={setFilterCategory}
      />
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <ProductList products={filteredProducts} onDelete={handleDelete} />
      )}
    </section>
  );
}

