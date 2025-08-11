"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
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
      // Try the admin users endpoint first
      let response;
      try {
        response = await api.get("/admin/users");
        setUsers(response.data.data || response.data || []);
      } catch (adminError) {
        console.log("Admin users endpoint not available, trying alternatives...");
        
        // Fallback: try to get current user info and create mock data
        try {
          const userResponse = await api.get("/users/me");
          const currentUser = userResponse.data;
          
          // Create a mock user list with current user
          const mockUsers = [
            {
              ...currentUser,
              id: currentUser.id.toString(),
              createdAt: new Date().toISOString(),
              isEmailVerified: currentUser.isEmailVerified || false
            }
          ];
          
          setUsers(mockUsers);
          toast.info("Showing limited user data - full admin endpoint not available");
          
        } catch (fallbackError) {
          console.error("All user fetch methods failed:", fallbackError);
          toast.error("Unable to load user data");
          setUsers([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
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
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
        
        {/* Show warning if limited data */}
        {users.length <= 1 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Admin user management endpoint is not fully configured. Showing limited data.
                  <br />
                  <span className="font-medium">Backend needs to implement:</span> GET /admin/users
                </p>
              </div>
            </div>
          </div>
        )}
        
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
