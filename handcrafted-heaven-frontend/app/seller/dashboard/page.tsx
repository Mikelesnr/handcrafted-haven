"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Seller } from "@/lib/types";
import { toast } from "react-hot-toast";

export default function SellerDashboardPage() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);

  useEffect(() => {
    api
      .get("/sellers/me")
      .then((res) => {
        setSeller(res.data);
        setProfileExists(true);
      })
      .catch((err) => {
        if (
          err instanceof Error &&
          typeof (err as any).response?.status === "number" &&
          (err as any).response.status === 404
        ) {
          setProfileExists(false);
        } else {
          toast.error("Failed to load seller profile");
          console.error("Seller fetch error:", err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || profileExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profileExists) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-gray-700">
        <h1 className="text-2xl font-bold mb-4">No Seller Profile Found</h1>
        <p className="mb-6">
          You need to create a seller profile before accessing your dashboard.
        </p>
        <Link
          href="/seller/dashboard/profile"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  if (!seller) {
    return null; // satisfies TypeScript narrowing
  }

  const products = seller.products ?? [];
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-4xl mx-auto py-6 text-gray-800">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={seller.imageUrl}
          alt="Seller profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{seller.user.name}</h1>
          <p className="text-gray-600">{seller.bio}</p>
          <p className="text-sm text-gray-500">
            Email: {seller.user.email} •{" "}
            {seller.user.isEmailVerified ? "Verified ✅" : "Unverified ❌"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Your Products</h2>
          <p className="text-gray-600">Total: {products.length}</p>
          <p className="text-gray-600">Categories: {categories.join(", ")}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Latest Product</h2>
          {products.length > 0 ? (
            <div>
              <p className="font-medium">{products[0].title}</p>
              <p className="text-sm text-gray-500">{products[0].category}</p>
            </div>
          ) : (
            <p className="text-gray-500">No products yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
