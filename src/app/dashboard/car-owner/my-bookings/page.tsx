"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

type BookingTab = "active" | "upcoming" | "past";

export default function CarOwnerBookings() {
  const [activeTab, setActiveTab] = useState<BookingTab>("active");

  const getTabClasses = (tab: BookingTab) =>
    `px-6 py-2 rounded-lg font-semibold transition-all ${
      activeTab === tab
        ? "bg-primary text-on-primary shadow-lg shadow-primary/30"
        : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
    }`;

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">My Bookings</h1>
          <p className="text-on-surface-variant">View and manage all your parking bookings</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-3 border-b border-outline-variant/30 pb-4 overflow-x-auto">
          <button onClick={() => setActiveTab("active")} className={getTabClasses("active")}>
            ⏱️ Active
          </button>
          <button onClick={() => setActiveTab("upcoming")} className={getTabClasses("upcoming")}>
            📅 Upcoming
          </button>
          <button onClick={() => setActiveTab("past")} className={getTabClasses("past")}>
            ✓ Past
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {activeTab === "active" && <EmptyBookingState />}
          {activeTab === "upcoming" && <EmptyBookingState />}
          {activeTab === "past" && <EmptyBookingState />}
        </div>
      </div>
    </DashboardLayout>
  );
}

function EmptyBookingState() {
  return (
    <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
      <p className="text-4xl mb-3">🅿️</p>
      <p className="text-on-surface-variant">No bookings in this category</p>
      <p className="text-xs text-on-surface-variant mt-2">Start by booking a parking spot</p>
    </div>
  );
}