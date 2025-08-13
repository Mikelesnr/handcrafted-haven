// src/types/cartTypes.ts

// Defines the structure of a single item in the cart.
export type CartItem = {
  productId: number;
  title: string;
  price: number;
  quantity: number;
};

// Defines the overall state of the shopping cart.
export type CartState = {
  items: CartItem[];
};

// Defines all possible actions that can be dispatched to the cart reducer.
export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" };
