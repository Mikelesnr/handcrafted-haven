"use client";

import { Package, DollarSign, Tag, TrendingUp } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductStatsProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductStats({ products, loading = false }: ProductStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalProducts = products.length;
  const categories = [...new Set(products.map(p => p.category.name))];
  const totalCategories = categories.length;
  
  const averagePrice = products.length > 0 
    ? products.reduce((sum, product) => sum + product.price, 0) / products.length 
    : 0;

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: <Package className="h-6 w-6 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      label: "Categories",
      value: totalCategories.toString(),
      icon: <Tag className="h-6 w-6 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      label: "Average Price",
      value: `$${averagePrice.toFixed(2)}`,
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      label: "Total Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
