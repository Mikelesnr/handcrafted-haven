// handcrafted-heaven-frontend/components/order/cartTypes.ts
// Define types for cart items, state, and actions
export type CartItem = {
  productId: number;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" };
