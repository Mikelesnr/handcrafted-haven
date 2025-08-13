"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Home, Settings } from "lucide-react";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();
  const router = useRouter();

  const customerNavItems = [
    {
      label: "Home",
      href: "/customer/dashboard",
      icon: <Home size={18} />,
    },
    {
      label: "Account Settings",
      href: "/customer/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];

  useEffect(() => {
    if (!loading && (!user || user.role !== "CUSTOMER")) {
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

  if (!user || user.role !== "CUSTOMER") {
    return null;
  }

  return (
    <DashboardLayout navItems={customerNavItems}>{children}</DashboardLayout>
  );
}
