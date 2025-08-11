// components/admin/AdminProductsGrid.tsx
import { useState } from "react";
import { Product } from "@/lib/types";
import AdminProductCard from "./AdminProductCard";
import { Trash2 } from "lucide-react";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onBulkDelete: (ids: number[]) => void;
}

export default function AdminProductsGrid({ products, onDelete, onBulkDelete }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0) {
      onBulkDelete(selectedProducts);
      setSelectedProducts([]);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3a2 2 0 01-2 2H5a2 2 0 01-2-2h3m6 0v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">
          No products match your current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Bulk Actions Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Select all ({products.length})
              </span>
            </label>
            
            {selectedProducts.length > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                {selectedProducts.length} selected
              </span>
            )}
          </div>

          {selectedProducts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedProducts.length})
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={() => handleSelectProduct(product.id)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
