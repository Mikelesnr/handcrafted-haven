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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    "Ceramics",
    "Woodwork", 
    "Textiles",
    "Glasswork",
    "Metalcraft",
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchAllProducts = async () => {
    try {
      const allProducts: Product[] = [];
      let page = 1;
      let hasMorePages = true;

      // Fetch all products by pagination since /products?limit=1000 might not work
      while (hasMorePages && page <= 10) { // Safety limit of 10 pages
        try {
          const response = await api.get(`/products?page=${page}`);
          const pageProducts = response.data.data || [];
          
          if (pageProducts.length === 0) {
            hasMorePages = false;
          } else {
            allProducts.push(...pageProducts);
            page++;
            
            // Check if we've reached the last page
            if (response.data.currentPage >= response.data.totalPages) {
              hasMorePages = false;
            }
          }
        } catch (pageError) {
          console.error(`Error fetching page ${page}:`, pageError);
          hasMorePages = false;
        }
      }

      setProducts(allProducts);
      console.log(`Fetched ${allProducts.length} products total`);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Using fallback method...");
      
      // Fallback: try to get just the first page
      try {
        const response = await api.get("/products");
        setProducts(response.data.data || []);
        toast.success("Loaded available products");
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        toast.error("Unable to load products");
      }
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
          product.seller?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.seller?.bio?.toLowerCase().includes(searchTerm.toLowerCase())
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
      console.error("Delete error:", error);
      toast.error("Failed to delete product. You may not have permission.");
    }
  };

  const handleBulkDelete = async (productIds: number[]) => {
    if (!confirm(`Are you sure you want to delete ${productIds.length} products?`)) return;

    const results = {
      success: 0,
      failed: 0
    };

    try {
      // Delete products one by one and track results
      for (const id of productIds) {
        try {
          await api.delete(`/products/${id}`);
          results.success++;
        } catch (error) {
          console.error(`Failed to delete product ${id}:`, error);
          results.failed++;
        }
      }

      if (results.success > 0) {
        toast.success(`${results.success} products deleted successfully!`);
        // Refresh the products list
        await fetchAllProducts();
      }
      
      if (results.failed > 0) {
        toast.error(`Failed to delete ${results.failed} products`);
      }
      
    } catch (error) {
      toast.error("Bulk delete operation failed");
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
