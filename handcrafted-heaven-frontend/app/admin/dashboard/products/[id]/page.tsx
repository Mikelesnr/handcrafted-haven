"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import { Product } from "@/lib/types";
import { ArrowLeft, Trash2, Star, Calendar, DollarSign, User, Tag } from "lucide-react";

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        toast.error("Product not found");
        router.push("/admin/dashboard/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (!product) return;
    
    setDeleting(true);
    const toastId = toast.loading("Deleting product...");
    
    try {
      await api.delete(`/products/${product.id}`);
      toast.success("Product deleted successfully", { id: toastId });
      router.push("/admin/dashboard/products");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product", { id: toastId });
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link 
          href="/admin/dashboard/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const averageRating = product.reviews?.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link 
          href="/admin/dashboard/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Delete Product
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder-product.jpg"}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {product.category.name}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.seller?.user?.name || "Unknown Seller"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.seller?.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Summary */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviews</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">
                    ({product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="mb-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
            <Trash2 className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Delete Product</h4>
              <p className="text-sm text-red-600 dark:text-red-300">
                This action cannot be undone. This will permanently delete the product and all associated data.
              </p>
            </div>
          </div>
          
          <p className="text-neutral-700 dark:text-neutral-200">
            Are you sure you want to delete <strong>"{product.title}"</strong>?
          </p>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 px-4 rounded font-medium transition-colors mb-2"
        >
          {deleting ? "Deleting..." : "Yes, Delete Product"}
        </button>
      </Modal>
    </div>
  );
}
