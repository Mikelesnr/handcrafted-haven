"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "SELLER" | "BUYER" | "ADMIN";
  emailVerified: boolean;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔄 Hydrate user from /user/me on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // not logged in or token expired
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const fullUser = res.data.user;

      const filteredUser: User = {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role,
        emailVerified: fullUser.emailVerified,
        profileImage: fullUser.profileImage,
      };

      setUser(filteredUser);

      switch (filteredUser.role) {
        case "SELLER":
          router.push("/seller/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/customer/dashboard");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.replace("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
