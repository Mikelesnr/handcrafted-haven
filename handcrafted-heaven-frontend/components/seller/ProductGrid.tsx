// components/seller/ProductGrid.tsx
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductGrid({ products, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">
          Your Products ({products.length})
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No products found. Add your first product to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
