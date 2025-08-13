"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Seller, Product } from "@/lib/types";
import { toast } from "react-hot-toast";
import Image from "next/image";

// AxiosError is removed, as it's not needed and we don't import axios directly.
// The rest of the logic remains the same, using your provided 'api' module.

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
        // We can check for the 404 status without importing AxiosError
        if (err.response?.status === 404) {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!profileExists) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-gray-700 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">No Seller Profile Found</h1>
        <p className="mb-6">
          You need to create a seller profile before accessing your dashboard.
        </p>
        <Link
          href="/seller/dashboard/profile"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  if (!seller) {
    return null;
  }

  const products: Product[] = seller.products ?? [];
  const hasProducts = products.length > 0;

  return (
    <div className="max-w-4xl mx-auto py-6 text-gray-800 antialiased font-sans">
      {/* Seller Profile Header */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-md">
        <Image
          src={seller.imageUrl || "/profile.jpeg"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
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

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Products</h2>
          <span className="text-gray-500 font-semibold">
            {products.length} total
          </span>
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-indigo-600 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No products found.
            </h2>
            <p className="mt-2 text-gray-500">
              You haven&apos;t added any products to your store yet.
            </p>
            <Link
              href="/seller/dashboard/products/create"
              className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
