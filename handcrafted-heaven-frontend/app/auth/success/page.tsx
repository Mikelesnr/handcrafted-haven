"use client";
import { useModalStore } from "@/context/ModalContext";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const { openModal } = useModalStore();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-green-400 to-white">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
          {name ? `${name}! 👏` : "✅ Password Reset Successful"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          Your password has been updated. You're ready to log back in and get
          going.
        </p>
        <button
          onClick={() => openModal("login")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
