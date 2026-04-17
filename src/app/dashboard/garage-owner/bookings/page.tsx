"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  carOwnerId?: { name?: string; email?: string };
  parkingId?: { name?: string; location?: string; city?: string };
  startTime: string;
  endTime: string;
  paymentStatus: string;
  status: string;
}

export default function GarageBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/garage-owner/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { bookings?: Booking[]; error?: string };
        if (response.ok) {
          setBookings(payload.bookings || []);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Bookings</h1>
          <p className="text-on-surface-variant">View all bookings for your garage</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        {loading ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading bookings...</div>
        ) : bookings.length === 0 ? (
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">Parking</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-outline-variant/20 hover:bg-surface-container/30">
                    <td className="px-6 py-4 text-sm font-semibold">{booking._id.slice(-8)}</td>
                    <td className="px-6 py-4 text-sm">{booking.carOwnerId?.name || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm">{booking.parkingId?.name || "Parking spot"}</td>
                    <td className="px-6 py-4 text-sm">{new Date(booking.startTime).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">{booking.status}</span></td>
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