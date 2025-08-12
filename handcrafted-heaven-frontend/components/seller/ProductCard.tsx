// components/seller/ProductCard.tsx
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="text-xs text-gray-500 mb-4">
          Category: {product.category.name}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm flex items-center justify-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm flex items-center justify-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
