"use client";
// app/admin/dashboard/page.tsx

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Users, Store, UserCheck } from "lucide-react";

type Stats = {
  totalUsers: number;
  totalSellers: number;
  totalCustomers: number;
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 p-4 bg-white shadow rounded-md">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api
      .get("/admin/stats/users")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {!stats ? (
        <p className="text-center text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            icon={<Users size={32} />}
          />
          <StatCard
            label="Total Sellers"
            value={stats.totalSellers}
            icon={<Store size={32} />}
          />
          <StatCard
            label="Total Customers"
            value={stats.totalCustomers}
            icon={<UserCheck size={32} />}
          />
        </div>
      )}
    </div>
  );
}
