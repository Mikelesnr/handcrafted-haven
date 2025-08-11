// components/admin/AdminProductCard.tsx
import { Product } from "@/lib/types";
import Image from "next/image";
import { Trash2, User, Calendar, DollarSign } from "lucide-react";

interface Props {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (id: number) => void;
}

export default function AdminProductCard({ product, isSelected, onSelect, onDelete }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const avgRating = product.reviews?.length
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "0";

  // Handle missing/default image
  const imageUrl = product.imageUrl || "/api/placeholder/300/200";
  
  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
    }`}>
      {/* Selection Checkbox */}
      <div className="p-3 bg-gray-50 border-b">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">Select</span>
        </label>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-40 bg-gray-200">
        <Image
          src={imageUrl}
          alt={product.title || 'Product image'}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/api/placeholder/300/200";
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category || 'Uncategorized'}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
            {product.title || 'Untitled Product'}
          </h3>
          {product.reviews && product.reviews.length > 0 && (
            <div className="flex items-center gap-1 text-yellow-500">
              <span className="text-xs">⭐</span>
              <span className="text-xs">{avgRating}</span>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description || 'No description available'}
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 mb-3">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-lg font-bold text-green-600">
            ${product.price || '0.00'}
          </span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-gray-400" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-900 truncate">
              {product.seller?.user?.name || 'Unknown Seller'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {product.seller?.user?.email || 'No email'}
            </p>
          </div>
        </div>

        {/* Date Added */}
        {product.createdAt && (
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              Added {formatDate(product.createdAt)}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

