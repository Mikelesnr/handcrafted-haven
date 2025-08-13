"use client";

import React, { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useCart } from "./useCart";

type PaymentMethod = "card" | "mobileMoney";
type PaymentStatus = "IDLE" | "PROCESSING" | "SUCCESS";

const successfulCards = ["1111222233334444", "4444333322221111"];
const successfulMobileNumbers = ["+263771111111", "+263772222222"];

const PaymentSimulator: React.FC<{
  orderId: number;
  totalAmount: number;
}> = ({ orderId }) => {
  const { dispatch } = useCart();
  const [status, setStatus] = useState<PaymentStatus>("IDLE");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [paymentDetail, setPaymentDetail] = useState("");

  const handleSimulatePayment = async () => {
    setStatus("PROCESSING");
    const loadingToastId = toast.loading("Processing payment...");

    let isSuccess = false;
    let transactionId = "";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (paymentMethod === "card") {
      if (successfulCards.includes(paymentDetail)) {
        isSuccess = true;
        transactionId = `CARD-${Date.now()}`;
      } else {
        toast.error("Insufficient funds, please try another card.", {
          id: loadingToastId,
        });
      }
    } else if (paymentMethod === "mobileMoney") {
      if (successfulMobileNumbers.includes(paymentDetail)) {
        isSuccess = true;
        transactionId = `MM-${Date.now()}`;
      } else {
        toast.error("Please check your number and try again.", {
          id: loadingToastId,
        });
      }
    }

    if (isSuccess) {
      try {
        await api.post("/payments", {
          orderId,
          method: paymentMethod,
          status: "COMPLETED",
          transactionId,
        });

        dispatch({ type: "CLEAR_CART" });

        toast.success(`🎉 Payment for order #${orderId} completed!`, {
          id: loadingToastId,
        });
        setStatus("SUCCESS");
      } catch (err) {
        console.error("Failed to record payment on backend", err);
        toast.error("An error occurred. Please contact support.", {
          id: loadingToastId,
        });
        setStatus("IDLE");
      }
    } else {
      setStatus("IDLE");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="p-4 text-center bg-green-100 text-green-800 rounded-lg shadow-inner">
        <p className="text-xl font-bold">🎉 Thank you for your purchase!</p>
        <p className="mt-2">Your payment has been successfully processed.</p>
        <p>
          Order ID: <strong>#{orderId}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-neutral-100 rounded-lg shadow-inner text-neutral-900">
      <h3 className="text-lg font-semibold mb-2">Simulate Payment</h3>

      <div className="flex gap-4 mb-4">
        <label className="flex items-center cursor-pointer hover:font-semibold transition">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => {
              setPaymentMethod("card");
              setPaymentDetail("");
            }}
            className="mr-2 accent-blue-500"
          />
          Card
        </label>
        <label className="flex items-center cursor-pointer hover:font-semibold transition">
          <input
            type="radio"
            name="paymentMethod"
            value="mobileMoney"
            checked={paymentMethod === "mobileMoney"}
            onChange={() => {
              setPaymentMethod("mobileMoney");
              setPaymentDetail("");
            }}
            className="mr-2 accent-yellow-500"
          />
          Mobile Money
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-neutral-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={paymentDetail}
            onChange={(e) => setPaymentDetail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition"
            placeholder="e.g., 1111222233334444"
          />
        </div>
      )}

      {paymentMethod === "mobileMoney" && (
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-neutral-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={paymentDetail}
            onChange={(e) => setPaymentDetail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:shadow-md transition"
            placeholder="e.g., +263771111111"
          />
        </div>
      )}

      <button
        onClick={handleSimulatePayment}
        disabled={status === "PROCESSING" || !paymentDetail}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-md hover:font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "PROCESSING" && (
          <Loader2 className="h-5 w-5 animate-spin" />
        )}
        {status === "PROCESSING" ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentSimulator;
