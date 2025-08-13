// src/hooks/useCart.ts

import { useContext } from "react";
import { CartContext } from "@/components/order/CartProvider";

// Custom hook to access the CartContext.
export const useCart = () => {
  const context = useContext(CartContext);
  // Throw an error if the hook is used outside of a CartProvider.
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
