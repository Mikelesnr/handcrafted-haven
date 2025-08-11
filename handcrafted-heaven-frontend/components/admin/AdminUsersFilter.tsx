// components/admin/AdminUsersFilter.tsx
import { Search, Filter } from "lucide-react";

interface Props {
  searchTerm: string;
  roleFilter: string;
  onSearchChange: (term: string) => void;
  onRoleChange: (role: string) => void;
  filteredCount: number;
  totalCount: number;
}

export default function AdminUsersFilter({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleChange,
  filteredCount,
  totalCount,
}: Props) {
  const roles = [
    { value: "all", label: "All Roles" },
    { value: "CUSTOMER", label: "Customers" },
    { value: "SELLER", label: "Sellers" },
    { value: "ADMIN", label: "Admins" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => onRoleChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalCount}</span> users
        </div>
      </div>

      {/* Active Filters */}
      {(roleFilter !== "all" || searchTerm) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-gray-500">Active filters:</span>
          {roleFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Role: {roles.find(r => r.value === roleFilter)?.label}
              <button
                onClick={() => onRoleChange("all")}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Search: {searchTerm}
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
