"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/components/order/useCart";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/common/Modal";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import StarRating from "ash-star-ratting";
import Image from "next/image";

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ isOpen, onClose, product }: Props) => {
  const { dispatch } = useCart();
  const { user } = useAuth();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  if (!product) return null;

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
    onClose();
  };

  const handleSubmitReview = async () => {
    const toastId = toast.loading("Submitting your review...");

    try {
      const res = await api.post("/reviews", {
        rating,
        comment,
        productId: product.id,
      });

      if (res.status !== 201) throw new Error("Review failed");

      toast.success("Thanks for your feedback!", { id: toastId });
      setShowRatingModal(false);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Review error:", err);
      toast.error("Failed to submit review.", { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Product Content */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold font-heading">
                {product.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-yellow-500 text-lg">⭐ {avgRating}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={product.seller.imageUrl}
                    alt="Seller"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
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
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:font-semibold"
              >
                Add to Cart
              </button>

              {user?.role === "CUSTOMER" && (
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="w-full bg-yellow-100 text-yellow-800 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-yellow-200 hover:shadow-md hover:font-semibold"
                >
                  Rate Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate this Product"
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Your Rating
          </label>
          <StarRating
            defaultValue={rating}
            onChange={(value) => setRating(value)}
            className="text-yellow-500"
          />
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={handleSubmitReview}
            className="w-full bg-primary text-white py-2 rounded text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:font-semibold"
          >
            Submit Review
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductModal;
