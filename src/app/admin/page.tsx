"use client";

import { useState, useEffect, useCallback } from "react";
import AdminStatsCard from "@/components/AdminStatsCard";
import Link from "next/link";

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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">
          Dashboard Overview
        </h1>
        <p className="text-on-surface-variant mt-1 font-[family-name:var(--font-body)]">
          Real-time platform metrics and system health
        </p>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <AdminStatsCard
          title="Total Users"
          value={loading ? "..." : stats?.totalUsers ?? 0}
          icon="groups"
          trend={`${stats?.newUsersThisMonth ?? 0} new this month`}
          trendDirection="up"
          color="primary"
        />
        <AdminStatsCard
          title="Car Owners"
          value={loading ? "..." : stats?.carOwners ?? 0}
          icon="directions_car"
          trend={`${stats?.activeUsers ?? 0} active`}
          trendDirection="up"
          color="secondary"
        />
        <AdminStatsCard
          title="Garage Owners"
          value={loading ? "..." : stats?.garageOwners ?? 0}
          icon="warehouse"
          trend={`${stats?.approvedParkings ?? 0} listings`}
          trendDirection="up"
          color="tertiary"
        />
        <AdminStatsCard
          title="Total Revenue"
          value={loading ? "..." : `৳${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          icon="payments"
          trend={`${stats?.totalPayments ?? 0} transactions`}
          trendDirection="up"
          color="primary"
        />
      </section>

      {/* Secondary KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <AdminStatsCard
          title="Active Bookings"
          value={loading ? "..." : stats?.confirmedBookings ?? 0}
          icon="calendar_month"
          trend={`${stats?.cancelledBookings ?? 0} cancelled`}
          trendDirection="neutral"
          color="primary"
        />
        <AdminStatsCard
          title="Pending Listings"
          value={loading ? "..." : stats?.pendingParkings ?? 0}
          icon="inventory_2"
          trend="Needs review"
          trendDirection="neutral"
          color="tertiary"
        />
        <AdminStatsCard
          title="Pending NID"
          value={loading ? "..." : stats?.pendingNid ?? 0}
          icon="badge"
          trend="Verification queue"
          trendDirection="neutral"
          color="secondary"
        />
        <AdminStatsCard
          title="Open Requests"
          value={loading ? "..." : stats?.openServiceRequests ?? 0}
          icon="build"
          trend="Service requests"
          trendDirection="neutral"
          color="error"
        />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* User Growth Chart */}
        <section className="lg:col-span-2 glass-card rounded-3xl p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-bold font-[family-name:var(--font-headline)]">Platform Overview</h4>
              <p className="text-slate-400 text-sm">User distribution across roles</p>
            </div>
          </div>

          {/* Visual Chart */}
          <div className="h-64 relative flex items-end gap-3 overflow-hidden px-2">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-b border-white w-full h-0"></div>
              ))}
            </div>
            {[
              { label: "Car Owners", val: stats?.carOwners ?? 0, color: "from-secondary/40 to-secondary" },
              { label: "Garage Owners", val: stats?.garageOwners ?? 0, color: "from-tertiary/40 to-tertiary" },
              { label: "Active", val: stats?.activeUsers ?? 0, color: "from-primary/40 to-primary" },
              { label: "Suspended", val: stats?.suspendedUsers ?? 0, color: "from-error/40 to-error" },
              { label: "Bookings", val: stats?.totalBookings ?? 0, color: "from-primary/40 to-primary" },
              { label: "Pending NID", val: stats?.pendingNid ?? 0, color: "from-tertiary/40 to-tertiary" },
            ].map((bar, i) => {
              const maxVal = Math.max(
                stats?.carOwners ?? 1,
                stats?.garageOwners ?? 1,
                stats?.activeUsers ?? 1,
                stats?.totalBookings ?? 1,
                stats?.pendingNid ?? 1,
                stats?.suspendedUsers ?? 1
              );
              const height = maxVal > 0 ? Math.max((bar.val / maxVal) * 100, 8) : 8;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-bold text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.val}
                  </div>
                  <div
                    className={`w-full bg-gradient-to-t ${bar.color} rounded-t-lg transition-all duration-700 group-hover:opacity-90`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 px-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Car Owners</span>
            <span>Garage</span>
            <span>Active</span>
            <span>Suspended</span>
            <span>Bookings</span>
            <span>NID</span>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 font-[family-name:var(--font-headline)]">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "person_add", label: "Add User", href: "/admin/car-owners", color: "text-primary" },
                { icon: "inventory_2", label: "Review Listings", href: "/admin/listings", color: "text-secondary" },
                { icon: "badge", label: "Verify NID", href: "/admin/car-owners", color: "text-tertiary" },
                { icon: "assessment", label: "View Reports", href: "/admin/reports", color: "text-primary" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                >
                  <span className={`material-symbols-outlined ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="glass-card rounded-3xl p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-4 font-[family-name:var(--font-headline)]">
              System Health
            </h4>
            <div className="space-y-4">
              {[
                { label: "Database", status: "Connected", color: "bg-green-500" },
                { label: "API Endpoints", status: "All Active", color: "bg-green-500" },
                { label: "Auth System", status: "Operational", color: "bg-green-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color} animate-pulse`}></span>
                    <span className="text-xs font-bold text-on-surface">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Recent Activity */}
      <section className="glass-card rounded-3xl p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold font-[family-name:var(--font-headline)]">Quick Navigation</h4>
            <p className="text-slate-400 text-sm">Jump to any management section</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Car Owners", icon: "directions_car", href: "/admin/car-owners", color: "text-secondary" },
            { label: "Garage Owners", icon: "warehouse", href: "/admin/garage-owners", color: "text-tertiary" },
            { label: "Bookings", icon: "calendar_month", href: "/admin/bookings", color: "text-primary" },
            { label: "Payments", icon: "payments", href: "/admin/payments", color: "text-secondary" },
            { label: "Services", icon: "build", href: "/admin/service-requests", color: "text-error" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-all group"
            >
              <span className={`material-symbols-outlined text-3xl ${link.color} group-hover:scale-110 transition-transform`}>
                {link.icon}
              </span>
              <span className="text-xs font-bold text-on-surface">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
