"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  orders: { id: string }[];
  seller: { id: string } | null;
  Image: { url: string } | null;
};

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/admin/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load user");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting user...");
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted", { id: toastId });
      router.push("/admin/dashboard/users");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete user", { id: toastId });
    } finally {
      setConfirmOpen(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading user...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-500">User not found.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage User</h1>

      <div className="bg-white shadow rounded-md p-4 flex gap-4 items-center">
        {user.Image?.url && (
          <img
            src={user.Image.url}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-medium">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">
            Role: <span className="font-medium">{user.role}</span>
          </p>
          <p className="text-sm text-gray-500">
            Type: {user.seller ? "Seller" : "Customer"}
          </p>
          <p className="text-sm text-gray-500">Orders: {user.orders.length}</p>
          <p className="text-sm text-gray-500">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setConfirmOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete User
        </button>
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Deletion"
      >
        <p className="text-neutral-700 dark:text-neutral-200 mb-4">
          Are you sure you want to delete <strong>{user.name}</strong>? This
          action cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Confirm Delete
        </button>
      </Modal>
    </div>
  );
}
