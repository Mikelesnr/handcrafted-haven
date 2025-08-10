"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import ProductHeader from "@/components/seller/ProductHeader";
import ProductSearch from "@/components/seller/ProductSearch";
import ProductForm from "@/components/seller/ProductForm";
import ProductGrid from "@/components/seller/ProductGrid";
import { Product } from "@/lib/types";
import Link from "next/link";
import { AxiosError } from "axios";

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const categories = [
    "Ceramics",
    "Woodwork",
    "Textiles",
    "Glasswork",
    "Metalcraft",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/sellers/me");
        setProducts(response.data.products ?? []);
        setSellerId(response.data.id);
        setProfileExists(true);
      } catch (error: unknown) {
        const axiosErr = error as AxiosError;
        if (axiosErr.response?.status === 404) {
          setProfileExists(false);
        } else {
          toast.error("Failed to fetch seller data");
          console.error("Fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
    });
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sellerId,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success("Product updated successfully!");
      } else {
        await api.post("/products", productData);
        toast.success("Product added successfully!");
      }

      setShowAddForm(false);
      resetForm();
      const updated = await api.get("/sellers/me");
      setProducts(updated.data.products ?? []);
    } catch (error: unknown) {
      toast.error("Failed to save product");
      console.error(error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${productId}`);
      toast.success("Product deleted successfully!");
      const updated = await api.get("/sellers/me");
      setProducts(updated.data.products ?? []);
    } catch (error: unknown) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || profileExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profileExists) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-gray-700">
        <h1 className="text-2xl font-bold mb-4">No Seller Profile Found</h1>
        <p className="mb-6">
          You need to create a seller profile before adding products.
        </p>
        <Link
          href="/seller/dashboard/profile"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <div className="max-w-6xl mx-auto">
        <ProductHeader
          onAddClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
        />

        <ProductSearch value={searchTerm} onChange={setSearchTerm} />

        {showAddForm && (
          <ProductForm
            formData={formData}
            categories={categories}
            editingProduct={editingProduct}
            onChange={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowAddForm(false);
              resetForm();
            }}
          />
        )}

        <ProductGrid
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
