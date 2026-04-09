"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

interface Booking {
  id: string;
  bookingId: string;
  customer: string;
  date: string;
  duration: string;
  status: "active" | "completed" | "cancelled";
}

export default function GarageBookings() {
  const [bookings] = useState<Booking[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Bookings</h1>
          <p className="text-on-surface-variant">View all bookings for your garage</p>
        </header>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold transition-colors whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold transition-colors whitespace-nowrap">
            Active
          </button>
          <button className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold transition-colors whitespace-nowrap">
            Completed
          </button>
        </div>

        {/* Bookings Table */}
        {bookings.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-on-surface-variant">No bookings yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Bookings will appear here when customers reserve spots</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl border border-outline-variant/20 backdrop-blur-xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-outline-variant/20 hover:bg-surface-container/30">
                    <td className="px-6 py-4 text-sm font-semibold">{booking.bookingId}</td>
                    <td className="px-6 py-4 text-sm">{booking.customer}</td>
                    <td className="px-6 py-4 text-sm">{booking.date}</td>
                    <td className="px-6 py-4 text-sm">{booking.duration}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)} capitalize`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
