// components/admin/AdminUsersHeader.tsx
import { Users, UserPlus } from "lucide-react";

interface Props {
  totalUsers: number;
}

export default function AdminUsersHeader({ totalUsers }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">
              Manage all users and their permissions
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-blue-600">
            <UserPlus className="w-5 h-5" />
            <span className="text-2xl font-bold">{totalUsers}</span>
          </div>
          <p className="text-sm text-gray-500">Total Users</p>
        </div>
      </div>
    </div>
  );
}