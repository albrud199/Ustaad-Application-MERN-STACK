// src/components/ProtectedPage.tsx
"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth";

interface ProtectedPageProps {
  children: ReactNode;
  requiredRole?: "car_owner" | "garage_owner" | "admin" | undefined;
}

export function ProtectedPage({ 
  children, 
  requiredRole 
}: ProtectedPageProps) {
  const router = useRouter();
  const user = getLoggedInUser();

  useEffect(() => {
    // ===== CHECK IF USER EXISTS =====
    if (!user) {
      router.push("/login");
      return;
    }

    // ===== CHECK IF ROLE MATCHES =====
    if (requiredRole && user.role !== requiredRole) {
      router.push("/dashboard");
      return;
    }
  }, [user, router, requiredRole]);

  // ===== IF NO USER, SHOW LOADING =====
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-primary text-5xl animate-spin">
            lock
          </span>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // ===== RENDER PROTECTED CONTENT =====
  return <>{children}</>;
}