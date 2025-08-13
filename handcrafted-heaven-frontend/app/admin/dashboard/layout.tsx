"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Home, PackageSearch, Users, Settings } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();
  const router = useRouter();

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

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return <DashboardLayout navItems={adminNavItems}>{children}</DashboardLayout>;
}
