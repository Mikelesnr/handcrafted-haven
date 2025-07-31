"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await api.post("/auth/resend-verification");
      toast.success("Verification email resent successfully!");
    } catch (err) {
      toast.error("Failed to resend verification email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500 to-white px-6">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-white">
          Verify Your Email
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          We’ve sent a verification link to your email. Please check your inbox
          and follow the instructions to activate your account.
        </p>
        <button
          onClick={handleResend}
          disabled={isSending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          {isSending ? "Resending..." : "Resend Email"}
        </button>
      </div>
    </div>
  );
}
