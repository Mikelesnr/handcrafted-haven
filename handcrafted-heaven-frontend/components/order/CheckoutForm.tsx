// handcrafted-heaven-frontend/components/order/CheckoutForm.tsx
import React, { useState } from "react";
import api from "@/lib/api";
import { useCart } from "./useCart";

const CheckoutForm: React.FC<{
  buyerId: number;
  onOrderCreated: (orderId: number) => void;
}> = ({ buyerId, onOrderCreated }) => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/order", {
        buyerId,
        items: state.items.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      dispatch({ type: "CLEAR_CART" });
      onOrderCreated(res.data.id);
    } catch (err) {
      console.error("Order failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || state.items.length === 0}
      >
        {loading ? "Processing..." : "Submit Order"}
      </button>
    </div>
  );
};

export default CheckoutForm;
