"use client";

import NebulaBackground from "@/components/NebulaBackground";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.userType === "garage-owner") {
      router.replace("/dashboard/garage-owner");
    } else {
      router.replace("/dashboard/car-owner");
    }
  }, [router]);

  return (
    <>
      <NebulaBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="glass-card rounded-3xl border border-outline-variant/20 p-10 text-center max-w-lg">
          <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">
            Redirecting to your dashboard…
          </h1>
          <p className="text-on-surface-variant">
            We detected your role and are forwarding you to the correct dashboard section.
          </p>
        </div>
      </main>
    </>
  );
}
