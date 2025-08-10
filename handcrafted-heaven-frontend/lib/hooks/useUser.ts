"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { AxiosError } from "axios";

type User = {
  role: "SELLER" | "BUYER" | "ADMIN";
  name: string;
  email?: string;
  profileImage?: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Prevent running during SSR or static build
    if (typeof window === "undefined") return;

    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (error: unknown) {
        const axiosErr = error as AxiosError;
        if (axiosErr.response?.status === 401) {
          setUser(null); // Not logged in
        } else {
          if (process.env.NODE_ENV === "development") {
            console.error("Unexpected error fetching user:", error);
          }
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
