// components/seller/ProductHeader.tsx
import { Plus } from "lucide-react";

interface Props {
  onAddClick: () => void;
}

export default function ProductHeader({ onAddClick }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
          <p className="text-gray-600">Manage your handcrafted items</p>
        </div>
        <button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </div>
  );
}
