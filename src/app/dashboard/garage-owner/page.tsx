"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";

interface GarageStats {
  totalBookings: number;
  occupancy: number;
  revenue: number;
  availableSpots: number;
}

export default function GarageOwnerDashboard() {
  const [stats, setStats] = useState<GarageStats>({
    totalBookings: 0,
    occupancy: 0,
    revenue: 0,
    availableSpots: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch garage stats from API
    // fetch("/api/dashboard/garage-owner")
    setLoading(false);
  }, []);

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-headline)]">
            Garage Operations 🏢
          </h1>
          <p className="text-on-surface-variant">Manage your parking facility</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="list"
            color="primary"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancy}%`}
            icon="pie_chart"
            color="secondary"
          />
          <StatCard
            title="Today's Revenue"
            value={`$${stats.revenue}`}
            icon="attach_money"
            color="tertiary"
          />
          <StatCard
            title="Available Spots"
            value={stats.availableSpots}
            icon="local_parking"
            color="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-headline)]">Recent Bookings</h3>
            <p className="text-on-surface-variant text-center py-8">No bookings yet</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-headline)]">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add</span>
                Add Parking Spot
              </button>
              <button className="w-full px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">assessment</span>
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary/10 text-tertiary",
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <p className="text-on-surface-variant text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold font-[family-name:var(--font-headline)]">{value}</p>
    </div>
  );
}