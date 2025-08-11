'use client';
import ProductItem from "./ProductItem";

export default function ProductList({ products, onDelete }) {
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onDelete={() => onDelete(product.id)} />
      ))}
    </div>
  );
}

