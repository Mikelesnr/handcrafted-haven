"use client";
// handcrafted-heaven-frontend/components/order/CartProvider.tsx
import React, { createContext, useReducer, useMemo } from "react";
import { CartItem, CartState, CartAction } from "@/components/order/cartTypes";

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalAmount: number;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item: CartItem) => item.productId === action.payload.productId
      );
      if (existing) {
        return {
          items: state.items.map(
            (item: CartItem): CartItem =>
              item.productId === action.payload.productId
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item: CartItem) => item.productId !== action.payload.productId
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        items: state.items.map(
          (item: CartItem): CartItem =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
        ),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const totalAmount = useMemo(() => {
    return state.items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
