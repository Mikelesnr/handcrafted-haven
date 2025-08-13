"use client";
// File: handcrafted-heaven-frontend/components/order/CheckoutForm.tsx
import React, { useState } from "react";
import api from "@/lib/api";
import { useCart } from "./useCart";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CheckoutForm: React.FC<{
  buyerId: number;
  onOrderCreated: (orderId: number, totalAmount: number) => void;
}> = ({ buyerId, onOrderCreated }) => {
  const { state, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const loadingToastId = toast.loading("Submitting your order...");

    try {
      const orderPayload = {
        buyerId,
        items: state.items.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const res = await api.post("/orders", orderPayload);

      // Pass the order ID and the total amount to the parent component.
      // The cart is NOT cleared here.
      onOrderCreated(res.data.id, totalAmount);

      toast.success("Order submitted successfully! Proceed to payment.", {
        id: loadingToastId,
      });
    } catch (err) {
      console.error("Order failed", err);
      toast.error("Failed to submit order. Please try again.", {
        id: loadingToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-inner text-neutral-900 dark:text-neutral-100">
      <h3 className="text-xl font-semibold mb-4">Confirm Order</h3>
      <button
        onClick={handleCheckout}
        disabled={loading || state.items.length === 0}
        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 disabled:bg-neutral-400 transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {loading ? "Submitting Order..." : "Submit Order"}
      </button>
    </div>
  );
};

export default CheckoutForm;
