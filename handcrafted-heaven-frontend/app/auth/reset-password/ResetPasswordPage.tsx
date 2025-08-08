"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const name = searchParams.get("name");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, {
        confirmPassword,
        password,
      });
      router.push(`/auth/success?name=${encodeURIComponent(name || "")}`);
    } catch {
      setError("Password reset failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
        🔐 Reset Your Password
      </h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
      >
        Reset Password
      </button>
    </form>
  );
}
