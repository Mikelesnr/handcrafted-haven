// components/common/ProductCard.tsx
"use client";

import { useState } from "react";
import ProductModal from "./ProductModal";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [showModal, setShowModal] = useState(false);

  const avgRating = product.reviews.length
    ? (
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : "No ratings";

  return (
    <>
      <div className="bg-neutral-50 dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col text-neutral-900 dark:text-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center text-sm mt-1">
              <span className="font-bold text-primary">${product.price}</span>
              <span className="text-yellow-500">⭐ {avgRating}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={product.seller.imageUrl}
                alt="Seller Avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
                {product.seller.bio}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 w-full bg-secondary text-white text-center py-2 px-4 rounded hover:bg-secondary/90 text-sm"
          >
            View Product
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
