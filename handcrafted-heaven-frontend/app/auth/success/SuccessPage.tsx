"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const name = params.get("name");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
        ✅ Success!
      </h2>
      <p className="text-neutral-700 dark:text-neutral-300 text-lg">
        {name
          ? `${name}, your password was successfully reset.`
          : "Your password was successfully reset."}
      </p>
    </div>
  );
}
