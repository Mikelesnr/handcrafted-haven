"use client";

import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "@/components/order/useCart";
import { Product } from "@/lib/types";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useCart();

  const avgRating = product.reviews.length
    ? (
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : "No ratings";

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      },
    });

    toast.success(`Added "${product.title}" to cart`);
  };

  return (
    <>
      <div className="bg-neutral-50 dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col text-neutral-900 dark:text-neutral-100">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-t-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold font-heading">
              {product.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-yellow-500">⭐ {avgRating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full overflow-hidden relative">
              <Image
                src={product.seller.imageUrl}
                alt="Seller Avatar"
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
              {product.seller.bio}
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-secondary text-white text-center py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-secondary/90 hover:shadow-md hover:font-semibold"
            >
              View Product
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white text-center py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:font-semibold"
            >
              Add to Cart
            </button>
          </div>
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
};

export default ProductCard;
