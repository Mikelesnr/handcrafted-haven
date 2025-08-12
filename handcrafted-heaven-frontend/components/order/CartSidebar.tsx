// handcrafted-heaven-frontend/components/order/CartSidebar.tsx
import React from "react";
import { useCart } from "./useCart";

const CartSidebar: React.FC = () => {
  const { state, dispatch, totalAmount } = useCart();

  return (
    <aside className="cart-sidebar">
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.productId}>
              <strong>{item.title}</strong> — ${item.price} × {item.quantity}
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: { productId: item.productId },
                  })
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${totalAmount.toFixed(2)}</p>
    </aside>
  );
};

export default CartSidebar;
