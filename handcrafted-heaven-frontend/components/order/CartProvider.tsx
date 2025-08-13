"use client";

import React, { createContext, useReducer, useMemo } from "react";
import { CartItem, CartState, CartAction } from "./cartTypes";

// Create a context for the cart with a null default value.
export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalAmount: number;
} | null>(null);

// The reducer function handles state changes based on dispatched actions.
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

// The main provider component that wraps the application.
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Calculate the total amount with useMemo to optimize performance.
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
