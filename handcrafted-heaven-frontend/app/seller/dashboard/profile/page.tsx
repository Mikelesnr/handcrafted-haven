"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Seller } from "@/lib/types";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export default function SellerProfilePage() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await api.get("/sellers/me");
        setSeller(res.data);
        setFormData({
          bio: res.data.bio ?? "",
          imageUrl: res.data.imageUrl ?? "",
        });
      } catch (error: unknown) {
        const axiosErr = error as AxiosError;
        if (axiosErr.response?.status !== 404) {
          toast.error("Error loading seller profile");
          console.error("Seller fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, []);

  const handleSubmit = async () => {
    try {
      if (seller) {
        await api.put(`/sellers/${seller.id}`, {
          bio: formData.bio,
          imageUrl: formData.imageUrl,
        });
        toast.success("Profile updated!");
      } else {
        await api.post("/sellers", {
          bio: formData.bio,
          imageUrl: formData.imageUrl,
        });
        toast.success("Profile created!");
      }
    } catch (error: unknown) {
      console.error("Save failed:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleDelete = async () => {
    if (!seller) return;

    try {
      await api.delete(`/sellers/${seller.id}`);
      setSeller(null);
      setFormData({ bio: "", imageUrl: "" });
      toast.success("Profile deleted");
    } catch (error: unknown) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">
        {seller ? "Edit Seller Profile" : "Create Your Seller Profile"}
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-1 block w-full border rounded-md p-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image URL
          </label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {seller ? "Update Profile" : "Create Profile"}
          </button>

          {seller && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
