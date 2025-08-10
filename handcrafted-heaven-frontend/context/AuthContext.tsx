"use client";
// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
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

  useEffect(() => {
    // Optional: add session check later
    setLoading(false);
  }, []);

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
