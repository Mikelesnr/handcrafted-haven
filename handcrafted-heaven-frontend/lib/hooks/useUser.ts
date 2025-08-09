"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

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
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          // Not logged in
          setUser(null);
        } else {
          console.error("Unexpected error fetching user:", err);
          setUser(null); // Fallback to null for safety
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
