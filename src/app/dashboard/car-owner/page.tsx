"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/DashboardLayout";
import { getLoggedInUser } from "@/lib/auth";

type DashboardStats = {
  totalRequests: number;
  assignedRequests: number;
  activeRequests: number;
  completedRequests: number;
};

export default function CarOwnerDashboard() {
  const user = getLoggedInUser();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || "";

    const loadStats = async () => {
      try {
        const response = await fetch("/api/dashboard/car-owner/service-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const payload = (await response.json().catch(() => ({}))) as { stats?: DashboardStats };
        if (response.ok && payload.stats) {
          setStats(payload.stats);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, []);

  return (
    <ProtectedPage requiredRole="car_owner">
      <DashboardLayout requiredRole="car_owner">
        <main className="p-8">
          <h1 className="text-4xl font-bold text-on-surface mb-8">
            Welcome, {user?.name}! 🚗
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">My Bookings</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Wallet Balance</h3>
              <p className="text-3xl font-bold text-secondary">BDT 0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Service Requests</h3>
              <p className="text-3xl font-bold text-tertiary">{loading ? "..." : String(stats?.totalRequests ?? 0)}</p>
            </div>
          </div>

          <div className="mt-8 glass-panel p-6 rounded-2xl border border-outline-variant/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-on-surface">Track Service Status and Chat</h3>
              <p className="text-on-surface-variant mt-1">
                Assigned: {loading ? "..." : String(stats?.assignedRequests ?? 0)} • Active: {loading ? "..." : String(stats?.activeRequests ?? 0)} • Completed: {loading ? "..." : String(stats?.completedRequests ?? 0)}
              </p>
            </div>
            <Link
              href="/dashboard/car-owner/service-requests"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary"
            >
              Open Service Requests
            </Link>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedPage>
  );
}
