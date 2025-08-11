"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AdminUsersHeader from "@/components/admin/AdminUsersHeader";
import AdminUsersStats from "@/components/admin/AdminUsersStats";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminUsersFilter from "@/components/admin/AdminUsersFilter";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isEmailVerified: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const getUserStats = () => {
    const totalUsers = users.length;
    const totalSellers = users.filter((u) => u.role === "SELLER").length;
    const totalCustomers = users.filter((u) => u.role === "CUSTOMER").length;
    const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
    const verifiedUsers = users.filter((u) => u.isEmailVerified).length;

    return {
      totalUsers,
      totalSellers,
      totalCustomers,
      totalAdmins,
      verifiedUsers,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = getUserStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <AdminUsersHeader totalUsers={users.length} />
        
        <AdminUsersStats stats={stats} />
        
        <AdminUsersFilter
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          onSearchChange={setSearchTerm}
          onRoleChange={setRoleFilter}
          filteredCount={filteredUsers.length}
          totalCount={users.length}
        />
        
        <AdminUsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
