"use client";

import { useState, useEffect, useCallback } from "react";
import AdminStatsCard from "@/components/AdminStatsCard";

interface Stats {
  totalUsers: number;
  carOwners: number;
  garageOwners: number;
  activeUsers: number;
  suspendedUsers: number;
  pendingNid: number;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalParkings: number;
  pendingParkings: number;
  approvedParkings: number;
  totalPayments: number;
  totalRevenue: number;
  openServiceRequests: number;
  newUsersThisMonth: number;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) setStats(await res.json());
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const exportCSV = () => {
    if (!stats) return;
    const rows = [
      ["Metric", "Value"],
      ["Total Users", String(stats.totalUsers)],
      ["Car Owners", String(stats.carOwners)],
      ["Garage Owners", String(stats.garageOwners)],
      ["Active Users", String(stats.activeUsers)],
      ["Suspended Users", String(stats.suspendedUsers)],
      ["Pending NID", String(stats.pendingNid)],
      ["Total Bookings", String(stats.totalBookings)],
      ["Confirmed Bookings", String(stats.confirmedBookings)],
      ["Cancelled Bookings", String(stats.cancelledBookings)],
      ["Total Listings", String(stats.totalParkings)],
      ["Pending Listings", String(stats.pendingParkings)],
      ["Approved Listings", String(stats.approvedParkings)],
      ["Total Payments", String(stats.totalPayments)],
      ["Total Revenue (BDT)", String(stats.totalRevenue)],
      ["Open Service Requests", String(stats.openServiceRequests)],
      ["New Users This Month", String(stats.newUsersThisMonth)],
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ustaad-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Reports & Analytics</h1>
          <p className="text-on-surface-variant mt-1">Platform performance overview and data exports</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all text-sm">
          <span className="material-symbols-outlined text-lg">download</span>
          Export CSV
        </button>
      </div>

      {/* User Analytics */}
      <section>
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-4 text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">groups</span> User Analytics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatsCard title="Total Users" value={loading ? "..." : stats?.totalUsers ?? 0} icon="groups" color="primary" />
          <AdminStatsCard title="Car Owners" value={loading ? "..." : stats?.carOwners ?? 0} icon="directions_car" color="secondary" />
          <AdminStatsCard title="Garage Owners" value={loading ? "..." : stats?.garageOwners ?? 0} icon="warehouse" color="tertiary" />
          <AdminStatsCard title="New This Month" value={loading ? "..." : stats?.newUsersThisMonth ?? 0} icon="person_add" trend="Monthly growth" trendDirection="up" color="primary" />
        </div>
      </section>

      {/* User Status Breakdown */}
      <section className="glass-card rounded-3xl p-6 lg:p-8">
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-6">User Status Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Active Users", val: stats?.activeUsers ?? 0, total: stats?.totalUsers ?? 1, color: "bg-green-500" },
            { label: "Suspended", val: stats?.suspendedUsers ?? 0, total: stats?.totalUsers ?? 1, color: "bg-yellow-500" },
            { label: "Pending NID", val: stats?.pendingNid ?? 0, total: stats?.totalUsers ?? 1, color: "bg-primary" },
          ].map((item) => {
            const pct = item.total > 0 ? Math.round((item.val / item.total) * 100) : 0;
            return (
              <div key={item.label} className="bg-surface-container-highest p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <span className="text-xl font-extrabold text-on-surface font-[family-name:var(--font-headline)]">{loading ? "..." : item.val}</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-bold">{pct}% of total</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking & Revenue */}
      <section>
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-4 text-secondary flex items-center gap-2">
          <span className="material-symbols-outlined">payments</span> Revenue & Bookings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatsCard title="Total Revenue" value={loading ? "..." : `৳${(stats?.totalRevenue ?? 0).toLocaleString()}`} icon="account_balance" color="primary" />
          <AdminStatsCard title="Total Bookings" value={loading ? "..." : stats?.totalBookings ?? 0} icon="calendar_month" color="secondary" />
          <AdminStatsCard title="Confirmed" value={loading ? "..." : stats?.confirmedBookings ?? 0} icon="check_circle" color="primary" />
          <AdminStatsCard title="Cancelled" value={loading ? "..." : stats?.cancelledBookings ?? 0} icon="cancel" color="error" />
        </div>
      </section>

      {/* Listings & Services */}
      <section>
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-4 text-tertiary flex items-center gap-2">
          <span className="material-symbols-outlined">local_parking</span> Listings & Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatsCard title="Total Listings" value={loading ? "..." : stats?.totalParkings ?? 0} icon="inventory_2" color="tertiary" />
          <AdminStatsCard title="Approved" value={loading ? "..." : stats?.approvedParkings ?? 0} icon="verified" color="primary" />
          <AdminStatsCard title="Pending Review" value={loading ? "..." : stats?.pendingParkings ?? 0} icon="pending" color="secondary" />
          <AdminStatsCard title="Open Requests" value={loading ? "..." : stats?.openServiceRequests ?? 0} icon="build" color="error" />
        </div>
      </section>
    </div>
  );
}
