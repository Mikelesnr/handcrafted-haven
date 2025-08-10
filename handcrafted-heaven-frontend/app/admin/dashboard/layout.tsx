"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Home, PackageSearch, Users, Settings } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminNavItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home size={18} />,
    },
    {
      label: "Products",
      href: "/admin/dashboard/products",
      icon: <PackageSearch size={18} />,
    },
    {
      label: "Users",
      href: "/admin/dashboard/users",
      icon: <Users size={18} />,
    },
    {
      label: "Settings",
      href: "/admin/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];

  return <DashboardLayout navItems={adminNavItems}>{children}</DashboardLayout>;
}
