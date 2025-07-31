"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  type PasswordResetErrorResponse = {
    error: string;
    suggestion?: string;
    supportLink?: string;
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/request-password-reset", { email });
      toast.success("✅ Reset link sent! Check your inbox.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as PasswordResetErrorResponse;

        if (error.response.status === 404 && data.error) {
          toast.error(`${data.error} ${data.suggestion || ""}`);
        } else {
          toast.error("⚠️ Something went wrong with the request.");
        }
      } else {
        toast.error("⚠️ Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center pt-24 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-white">
          Forgot Password
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
