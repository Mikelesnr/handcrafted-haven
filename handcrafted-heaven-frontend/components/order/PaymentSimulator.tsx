//  handcrafted-heaven-frontend/components/order/PaymentSimulator.tsx
import React, { useState } from "react";
import api from "@/lib/api";

const PaymentSimulator: React.FC<{ orderId: number }> = ({ orderId }) => {
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  const simulatePayment = async () => {
    setStatus("processing");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
      await api.post("/payment", {
        orderId,
        method: "mobileMoney",
        status: "COMPLETED",
        transactionId: "DUMMY-" + Date.now(),
      });
      setStatus("done");
    } catch (err) {
      console.error("Payment failed", err);
      setStatus("idle");
    }
  };

  return (
    <div>
      {status === "done" ? (
        <p>✅ Payment completed!</p>
      ) : (
        <button onClick={simulatePayment} disabled={status === "processing"}>
          {status === "processing" ? "Processing..." : "Simulate Payment"}
        </button>
      )}
    </div>
  );
};

export default PaymentSimulator;
