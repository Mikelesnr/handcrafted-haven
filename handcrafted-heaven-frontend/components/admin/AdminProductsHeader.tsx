// components/admin/AdminProductsHeader.tsx
import { Package, TrendingUp } from "lucide-react";

interface Props {
  totalProducts: number;
}

export default function AdminProductsHeader({ totalProducts }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">
              Manage all products across the platform
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-2xl font-bold">{totalProducts}</span>
          </div>
          <p className="text-sm text-gray-500">Total Products</p>
        </div>
      </div>
    </div>
  );
}
