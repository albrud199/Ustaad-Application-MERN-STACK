// src/components/ProtectedPage.tsx
"use client";

import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, type LoggedInUser } from "@/lib/auth";

interface ProtectedPageProps {
  children: ReactNode;
  requiredRole?: "car_owner" | "garage_owner" | "repairshop_owner" | "admin" | undefined;
}

export function ProtectedPage({ 
  children, 
  requiredRole 
}: ProtectedPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentUser = getLoggedInUser();

    // ===== CHECK IF USER EXISTS =====
    if (!currentUser) {
      router.push("/login");
      setIsReady(true);
      return;
    }

    // ===== CHECK IF ROLE MATCHES =====
    if (requiredRole && currentUser.role !== requiredRole) {
      router.push("/dashboard");
      setIsReady(true);
      return;
    }

    setUser(currentUser);
    setIsReady(true);
  }, [router, requiredRole]);

  // Keep initial server/client markup identical to prevent hydration mismatch.
  if (!isReady || !user) return null;

  // ===== RENDER PROTECTED CONTENT =====
  return <>{children}</>;
}