"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "SELLER" | "BUYER" | "ADMIN" | "CUSTOMER";
  emailVerified: boolean;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: any) => Promise<void>;
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
    // Show a loading toast that will be updated later
    const loadingToastId = toast.loading("Logging in...");
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

      // Update the loading toast to a success message
      toast.success("Login successful! Redirecting...", { id: loadingToastId });

      // Original routing logic is maintained
      switch (filteredUser.role) {
        case "SELLER":
          router.push("/seller/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "BUYER":
        case "CUSTOMER":
          router.push("/products");
          break;
      }
    } catch (err) {
      // If the API call fails, update the toast to an error message
      toast.error("Login failed. Please check your credentials.", {
        id: loadingToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: any) => {
    // Show a loading toast that will be updated later
    const loadingToastId = toast.loading("Registering...");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
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

      // Update the loading toast to a success message
      toast.success("✅ Account created! Check your email for verification.", {
        id: loadingToastId,
      });

      // Redirect based on the newly registered user's role
      switch (filteredUser.role) {
        case "SELLER":
          router.push("/seller/dashboard");
          break;
        case "ADMIN":
          // Admin accounts should not be created from the frontend, but we handle the redirect just in case
          router.push("/admin/dashboard");
          break;
        case "BUYER":
        case "CUSTOMER":
          router.push("/verify-email");
          break;
      }
    } catch (err) {
      // If the API call fails, update the toast to an error message
      toast.error("⚠️ Registration failed. Please try again.", {
        id: loadingToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Show a loading toast for the logout process
    const loadingToastId = toast.loading("Logging out...");

    try {
      await api.post("/auth/logout");
      setUser(null);

      // Update the toast to a success message
      toast.success("You have been logged out.", { id: loadingToastId });

      // Original routing logic is maintained
      router.replace("/");
      router.refresh();
    } catch (err) {
      // If logout fails for any reason, update the toast with an error
      toast.error("Logout failed. Please try again.", { id: loadingToastId });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
