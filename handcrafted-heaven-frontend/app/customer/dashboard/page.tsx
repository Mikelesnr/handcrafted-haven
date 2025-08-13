"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get<Order[]>("/orders/me");
        setOrders(res.data);
      } catch (err) {
        setError("Could not load your orders.");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven&apos;t placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-md">
              <div className="font-semibold">Order #{order.id}</div>
              <div className="text-sm text-gray-600">
                {order.items.length} item(s) — {order.status}
              </div>
              <div className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
