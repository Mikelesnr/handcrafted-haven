"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifiedPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-400 to-white px-6">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-white">
          {name ? `Welcome, ${name}! 🎉` : "Email Verified Successfully 🎉"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          Your email has been verified. You&apos;re all set to explore the
          platform.
        </p>
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
