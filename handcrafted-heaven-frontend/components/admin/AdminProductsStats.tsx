// components/admin/AdminProductsStats.tsx
import { Product } from "@/lib/types";

interface Props {
  products: Product[];
  categories: string[];
}

export default function AdminProductsStats({ products, categories }: Props) {
  const getCategoryStats = () => {
    return categories.map((category) => ({
      name: category,
      count: products.filter((p) => p.category === category).length,
    }));
  };

  const categoryStats = getCategoryStats();
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Value */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-green-600">
              ${totalValue.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <span className="text-green-600 text-xl">💰</span>
          </div>
        </div>
      </div>

      {/* Average Price */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Price</p>
            <p className="text-2xl font-bold text-blue-600">
              ${averagePrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <span className="text-blue-600 text-xl">📊</span>
          </div>
        </div>
      </div>

      {/* Top Category */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Top Category</p>
            <p className="text-lg font-bold text-purple-600">
              {categoryStats.sort((a, b) => b.count - a.count)[0]?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {categoryStats.sort((a, b) => b.count - a.count)[0]?.count || 0} products
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <span className="text-purple-600 text-xl">🏆</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-3">Categories</p>
        <div className="space-y-2">
          {categoryStats.slice(0, 3).map((stat) => (
            <div key={stat.name} className="flex justify-between text-sm">
              <span className="text-gray-600">{stat.name}</span>
              <span className="font-semibold text-gray-900">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
