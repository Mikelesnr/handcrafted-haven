"use client";

import { Product } from "@/lib/types";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ isOpen, onClose, product }: Props) {
  if (!product) return null;

  const avgRating = product.reviews.length
    ? (
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : "No ratings";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <Dialog.Panel className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh] p-6">
        <div className="w-full h-64 relative mb-4">
          <Image
            src={product.imageUrl}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
          {product.description}
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-primary">${product.price}</span>
            <span className="text-yellow-500">⭐ {avgRating}</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Category: {product.category}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Image
            src={product.seller.imageUrl}
            alt="Seller"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {product.seller.bio}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <ul className="mt-2 space-y-2">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="text-sm text-neutral-700 dark:text-neutral-300 border-b pb-2"
              >
                <strong>⭐ {review.rating}</strong> – {review.comment}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90"
        >
          Close
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
