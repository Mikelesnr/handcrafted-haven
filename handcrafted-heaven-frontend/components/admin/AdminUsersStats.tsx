// components/admin/AdminUsersStats.tsx
import { Users, Store, UserCheck, Shield, CheckCircle } from "lucide-react";

interface Props {
  stats: {
    totalUsers: number;
    totalSellers: number;
    totalCustomers: number;
    totalAdmins: number;
    verifiedUsers: number;
  };
}

export default function AdminUsersStats({ stats }: Props) {
  const verificationRate = stats.totalUsers > 0 
    ? ((stats.verifiedUsers / stats.totalUsers) * 100).toFixed(1)
    : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      {/* Total Customers */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Customers</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalCustomers}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Total Sellers */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Sellers</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalSellers}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Store className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Total Admins */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalAdmins}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Verified Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Verified</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.verifiedUsers}</p>
            <p className="text-xs text-gray-500">{verificationRate}% verified</p>
          </div>
          <div className="bg-emerald-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Total Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-full">
            <Users className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
