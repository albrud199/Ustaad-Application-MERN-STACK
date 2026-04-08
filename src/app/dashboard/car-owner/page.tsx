"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

interface DashboardStats {
  activeBookings: number;
  vehicles: number;
  totalSpent: number;
  upcomingBookings: number;
}

export default function CarOwnerDashboard() {
  const [stats] = useState<DashboardStats>({
    activeBookings: 0,
    vehicles: 0,
    totalSpent: 0,
    upcomingBookings: 0,
  });

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-headline)]">
            Welcome Back! 👋
          </h1>
          <p className="text-on-surface-variant">Here's what's happening with your account</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Bookings"
            value={stats.activeBookings}
            icon="calendar_today"
            color="primary"
          />
          <StatCard
            title="Your Vehicles"
            value={stats.vehicles}
            icon="directions_car"
            color="secondary"
          />
          <StatCard
            title="Total Spent"
            value={`$${stats.totalSpent}`}
            icon="credit_card"
            color="tertiary"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcomingBookings}
            icon="schedule"
            color="primary"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-headline)]">Recent Bookings</h3>
            <p className="text-on-surface-variant text-center py-12">No recent bookings yet</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-headline)]">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-semibold">
                📍 Book Parking
              </button>
              <button className="w-full px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors text-sm font-semibold">
                🚗 Add Vehicle
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
  color 
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
