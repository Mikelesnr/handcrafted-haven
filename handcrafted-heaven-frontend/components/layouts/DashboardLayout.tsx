"use client";

import { LogOut, Home, Package, User, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "/seller/dashboard", icon: <Home size={18} /> },
  {
    label: "Products",
    href: "/seller/dashboard/products",
    icon: <Package size={18} />,
  },
  {
    label: "Profile",
    href: "/seller/dashboard/profile",
    icon: <User size={18} />,
  },
  {
    label: "Settings",
    href: "/seller/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
  navItems?: NavItem[];
};

export default function DashboardLayout({
  children,
  navItems,
}: DashboardLayoutProps) {
  const { user, logout, loading } = useAuth(); // ✅ Direct from context

  const roleLabels: Record<string, string> = {
    SELLER: "Seller",
    BUYER: "Buyer",
    ADMIN: "Admin",
  };

  const itemsToRender = navItems ?? defaultNavItems;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <div className="text-xl font-bold text-gray-800">
          {loading
            ? "Loading Dashboard..."
            : user?.role
            ? `${roleLabels[user.role] ?? user.role} Dashboard`
            : "Dashboard"}
        </div>
        {!loading && user?.name && (
          <div className="text-sm text-gray-600">Welcome, {user.name}</div>
        )}

        <nav className="space-y-4">
          {itemsToRender.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 mt-10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
