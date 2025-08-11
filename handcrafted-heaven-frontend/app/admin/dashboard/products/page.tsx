"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { Product } from "@/lib/types";
import AdminProductsHeader from "@/components/admin/AdminProductsHeader";
import AdminProductsFilter from "@/components/admin/AdminProductsFilter";
import AdminProductsGrid from "@/components/admin/AdminProductsGrid";
import AdminProductsStats from "@/components/admin/AdminProductsStats";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Ceramics",
    "Woodwork", 
    "Textiles",
    "Glasswork",
    "Metalcraft",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products?limit=1000"); // Get all products
      setProducts(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.seller?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${productId}`);
      toast.success("Product deleted successfully!");
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete error:", error);
    }
  };

  const handleBulkDelete = async (productIds: number[]) => {
    if (!confirm(`Are you sure you want to delete ${productIds.length} products?`)) return;

    try {
      await Promise.all(
        productIds.map((id) => api.delete(`/products/${id}`))
      );
      toast.success(`${productIds.length} products deleted successfully!`);
      setProducts(products.filter((p) => !productIds.includes(p.id)));
    } catch (error) {
      toast.error("Failed to delete products");
      console.error("Bulk delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <AdminProductsHeader totalProducts={products.length} />
        
        <AdminProductsStats 
          products={products} 
          categories={categories}
        />
        
        <AdminProductsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
        />
        
        <AdminProductsGrid
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onBulkDelete={handleBulkDelete}
        />
      </div>
    </div>
  );
}
