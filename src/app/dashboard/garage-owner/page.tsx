"use client";

import { useEffect, useMemo, useState } from "react";
import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/DashboardLayout";
import { getLoggedInUser } from "@/lib/auth";

type GarageStats = {
  totalParkings: number;
  totalBookings: number;
  activeBookings: number;
  pendingBookings: number;
  totalRevenue: number;
};

export default function GarageOwnerDashboard() {
  const user = getLoggedInUser();
  const [stats, setStats] = useState<GarageStats>({
    totalParkings: 0,
    totalBookings: 0,
    activeBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/garage-owner/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { stats?: GarageStats; error?: string };
        if (response.ok && payload.stats) {
          setStats(payload.stats);
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const formattedRevenue = useMemo(
    () => `BDT ${stats.totalRevenue.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    [stats.totalRevenue]
  );

  return (
    <ProtectedPage requiredRole="garage_owner">
      <DashboardLayout requiredRole="garage_owner">
        <main className="p-8">
          <h1 className="text-4xl font-bold text-on-surface mb-8">
            Welcome, {user?.name}! 🏢
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">My Parkings</h3>
              <p className="text-3xl font-bold text-primary">{loading ? "..." : stats.totalParkings}</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-secondary">{loading ? "..." : stats.totalBookings}</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-tertiary">{loading ? "..." : formattedRevenue}</p>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedPage>
  );
}
