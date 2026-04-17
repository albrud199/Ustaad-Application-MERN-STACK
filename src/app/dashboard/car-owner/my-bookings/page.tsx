"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useMemo, useState } from "react";

type BookingTab = "active" | "upcoming" | "past";

type Booking = {
  _id: string;
  parkingId?: { name?: string; location?: string; city?: string };
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
};

export default function CarOwnerBookings() {
  const [activeTab, setActiveTab] = useState<BookingTab>("active");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`/api/dashboard/car-owner/bookings?status=${activeTab}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { bookings?: Booking[]; error?: string };
        if (response.ok) {
          setBookings(payload.bookings || []);
          setMessage("");
        } else {
          setMessage(payload.error || "Failed to load bookings");
        }
      } catch {
        setMessage("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [activeTab]);

  const getTabClasses = (tab: BookingTab) =>
    `px-6 py-2 rounded-lg font-semibold transition-all ${
      activeTab === tab
        ? "bg-primary text-on-primary shadow-lg shadow-primary/30"
        : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
    }`;

  const stats = useMemo(() => ({
    count: bookings.length,
    total: bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0),
  }), [bookings]);

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">My Bookings</h1>
          <p className="text-on-surface-variant">View and manage all your parking bookings</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-5 border border-outline-variant/20"><p className="text-sm text-on-surface-variant mb-1">Visible bookings</p><p className="text-3xl font-bold text-primary">{stats.count}</p></div>
          <div className="glass-card rounded-xl p-5 border border-outline-variant/20"><p className="text-sm text-on-surface-variant mb-1">Estimated value</p><p className="text-3xl font-bold text-secondary">BDT {stats.total.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>
        </div>

        <div className="flex gap-3 border-b border-outline-variant/30 pb-4 overflow-x-auto">
          <button onClick={() => setActiveTab("active")} className={getTabClasses("active")}>⏱️ Active</button>
          <button onClick={() => setActiveTab("upcoming")} className={getTabClasses("upcoming")}>📅 Upcoming</button>
          <button onClick={() => setActiveTab("past")} className={getTabClasses("past")}>✓ Past</button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <EmptyBookingState />
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-lg mb-1">{booking.parkingId?.name || "Parking spot"}</p>
                  <p className="text-sm text-on-surface-variant">{booking.parkingId?.location || "Location"} • {booking.parkingId?.city || "City"}</p>
                  <p className="text-xs text-on-surface-variant mt-2">{new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-on-surface-variant">BDT {booking.totalPrice.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">{booking.status} / {booking.paymentStatus}</p>
                </div>
              </div>
            ))
          )}
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