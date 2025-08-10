"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Home, Package, User, Settings } from "lucide-react";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const sellerNavItems = [
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

  // useEffect(() => {
  //   if (!loading && (!user || user.role !== "SELLER")) {
  //     router.replace("/");
  //   }
  // }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // if (!user || user.role !== "SELLER") {
  //   return null;
  // }

  return (
    <DashboardLayout navItems={sellerNavItems}>{children}</DashboardLayout>
  );
}
