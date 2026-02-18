"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  type User,
  DEFAULT_USER,
  getStoredUser,
  storeUser,
  clearUser,
} from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (email: string, _password: string) => {
      const u: User = { ...DEFAULT_USER, email };
      storeUser(u);
      setUser(u);
      router.push("/dashboard");
    },
    [router],
  );

  const signup = useCallback(
    (name: string, email: string, _password: string, experience: User["experience"]) => {
      const u: User = { name, email, experience };
      storeUser(u);
      setUser(u);
      router.push("/dashboard");
    },
    [router],
  );

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
    router.push("/login");
  }, [router]);

  return { user, isLoading, login, signup, logout };
}
