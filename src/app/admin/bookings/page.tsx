"use client";

import { useState, useEffect, useCallback } from "react";
import AdminDataTable from "@/components/AdminDataTable";

interface Booking {
  _id: string;
  userId?: { name?: string; email?: string };
  parkingId?: { title?: string; location?: string };
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchBookings = useCallback(async (page = 1, status = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/bookings?${params}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings);
        setPagination(data.pagination);
      }
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleUpdateBooking = async (id: string, updates: Record<string, string>) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updates) });
      if (res.ok) fetchBookings(pagination.page);
    } catch (err) { console.error("Update failed:", err); }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{status}</span>;
  };

  const paymentBadge = (status: string) => {
    const map: Record<string, string> = {
      paid: "bg-green-500/10 text-green-400 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{status}</span>;
  };

  const columns = [
    {
      key: "userId", label: "Customer",
      render: (_: unknown, row: Record<string, unknown>) => {
        const b = row as unknown as Booking;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{b.userId?.name?.charAt(0)?.toUpperCase() || "?"}</div>
            <div><p className="font-medium text-on-surface text-sm">{b.userId?.name || "Unknown"}</p><p className="text-[11px] text-slate-400">{b.userId?.email || ""}</p></div>
          </div>
        );
      },
    },
    {
      key: "parkingId", label: "Parking Spot",
      render: (_: unknown, row: Record<string, unknown>) => {
        const b = row as unknown as Booking;
        return <div><p className="text-sm text-on-surface">{b.parkingId?.title || "N/A"}</p><p className="text-[11px] text-slate-400">{b.parkingId?.location || ""}</p></div>;
      },
    },
    { key: "totalPrice", label: "Amount", render: (val: unknown) => <span className="text-sm font-bold text-on-surface">৳{(val as number)?.toLocaleString()}</span> },
    { key: "status", label: "Status", render: (val: unknown) => statusBadge(val as string) },
    { key: "paymentStatus", label: "Payment", render: (val: unknown) => paymentBadge(val as string) },
    {
      key: "createdAt", label: "Date",
      render: (val: unknown) => <span className="text-slate-400 text-xs">{new Date(val as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Bookings</h1>
          <p className="text-on-surface-variant mt-1">Monitor all parking bookings across the platform</p>
        </div>
        <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">{pagination.total} Total Bookings</div>
      </div>

      <AdminDataTable
        columns={columns}
        data={bookings as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search bookings..."
        onPageChange={(p) => fetchBookings(p)}
        pagination={pagination}
        loading={loading}
        emptyMessage="No bookings found"
        filters={
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); fetchBookings(1, e.target.value); }} className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        }
        actions={(row) => {
          const b = row as unknown as Booking;
          return (
            <>
              {b.status === "confirmed" && (
                <button onClick={() => handleUpdateBooking(b._id, { status: "cancelled" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors border border-error/20">
                  Cancel
                </button>
              )}
              {b.status === "cancelled" && (
                <button onClick={() => handleUpdateBooking(b._id, { status: "confirmed" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20">
                  Reinstate
                </button>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
