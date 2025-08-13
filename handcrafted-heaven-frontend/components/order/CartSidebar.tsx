"use client";

import React, { useState } from "react";
import { useCart } from "@/components/order/useCart";
import CheckoutForm from "./CheckoutForm";
import PaymentSimulator from "./PaymentSimulator";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CartSidebar: React.FC = () => {
  const { state, dispatch, totalAmount } = useCart();
  const [orderId, setOrderId] = useState<number | null>(null);
  const { user } = useAuth();

  return (
    <aside className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg h-full max-h-[90vh] flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100">
          Your Cart
        </h2>
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Clear
        </button>
      </div>
      {state.items.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 italic flex-grow">
          No items in cart.
        </p>
      ) : (
        <ul className="space-y-4 flex-grow overflow-y-auto pr-2">
          {state.items.map((item) => (
            <li
              key={item.productId}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-700 shadow-sm"
            >
              <div className="flex flex-col flex-grow">
                <strong className="text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </strong>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          productId: item.productId,
                          quantity: Math.max(1, item.quantity - 1),
                        },
                      })
                    }
                    className="text-gray-400 hover:text-red-500 transition disabled:text-gray-300"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <span className="mx-2 text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        },
                      })
                    }
                    className="text-gray-400 hover:text-green-500 transition"
                    aria-label="Increase quantity"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                  <span className="ml-auto text-sm text-neutral-600 dark:text-neutral-300">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: { productId: item.productId },
                  })
                }
                className="ml-4 text-red-500 hover:text-red-700 transition"
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="flex justify-between items-center text-xl font-bold text-neutral-900 dark:text-neutral-100">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </p>
        {!orderId ? (
          // Check if user exists and pass the converted ID to CheckoutForm
          user ? (
            <CheckoutForm
              buyerId={Number(user.id)}
              onOrderCreated={setOrderId}
            />
          ) : (
            <p className="text-center text-neutral-500 dark:text-neutral-400 mt-4">
              Please log in to proceed to checkout.
            </p>
          )
        ) : (
          // Pass the missing totalAmount prop to PaymentSimulator
          <PaymentSimulator orderId={orderId} totalAmount={totalAmount} />
        )}
      </div>
    </aside>
  );
};

export default CartSidebar;
