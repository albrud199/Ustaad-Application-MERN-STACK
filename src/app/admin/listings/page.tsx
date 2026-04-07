"use client";

import { useState, useEffect, useCallback } from "react";
import AdminDataTable from "@/components/AdminDataTable";

interface ParkingListing {
  _id: string;
  ownerId?: { name?: string; email?: string };
  title: string;
  location: string;
  pricePerHour: number;
  totalSlots: number;
  availableSlots: number;
  status: string;
  createdAt: string;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<ParkingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchListings = useCallback(async (page = 1, status = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/parkings?${params}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data.parkings);
        setPagination(data.pagination);
      }
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleUpdate = async (id: string, updates: Record<string, string>) => {
    try {
      const res = await fetch(`/api/admin/parkings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updates) });
      if (res.ok) fetchListings(pagination.page);
    } catch (err) { console.error("Update failed:", err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`/api/admin/parkings/${id}`, { method: "DELETE" });
      if (res.ok) fetchListings(pagination.page);
    } catch (err) { console.error("Delete failed:", err); }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{status}</span>;
  };

  const columns = [
    {
      key: "title", label: "Listing",
      render: (_: unknown, row: Record<string, unknown>) => {
        const l = row as unknown as ParkingListing;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary text-lg">local_parking</span></div>
            <div><p className="font-semibold text-on-surface text-sm">{l.title}</p><p className="text-[11px] text-slate-400">{l.location}</p></div>
          </div>
        );
      },
    },
    {
      key: "ownerId", label: "Owner",
      render: (_: unknown, row: Record<string, unknown>) => {
        const l = row as unknown as ParkingListing;
        return <span className="text-sm text-on-surface-variant">{l.ownerId?.name || "Unknown"}</span>;
      },
    },
    { key: "pricePerHour", label: "Price/hr", render: (val: unknown) => <span className="text-sm font-bold text-on-surface">৳{val as number}</span> },
    {
      key: "totalSlots", label: "Slots",
      render: (_: unknown, row: Record<string, unknown>) => {
        const l = row as unknown as ParkingListing;
        return <span className="text-sm text-on-surface-variant">{l.availableSlots}/{l.totalSlots}</span>;
      },
    },
    { key: "status", label: "Status", render: (val: unknown) => statusBadge(val as string) },
    {
      key: "createdAt", label: "Created",
      render: (val: unknown) => <span className="text-slate-400 text-xs">{new Date(val as string).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Parking Listings</h1>
          <p className="text-on-surface-variant mt-1">Approve, reject, and manage all parking listings</p>
        </div>
        <div className="text-sm font-bold text-tertiary bg-tertiary/10 px-4 py-2 rounded-xl border border-tertiary/20">{pagination.total} Listings</div>
      </div>

      <AdminDataTable
        columns={columns}
        data={listings as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search listings..."
        onPageChange={(p) => fetchListings(p)}
        pagination={pagination}
        loading={loading}
        emptyMessage="No parking listings found"
        filters={
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); fetchListings(1, e.target.value); }} className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        }
        actions={(row) => {
          const l = row as unknown as ParkingListing;
          return (
            <>
              {l.status === "pending" && (
                <>
                  <button onClick={() => handleUpdate(l._id, { status: "approved" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20">
                    Approve
                  </button>
                  <button onClick={() => handleDelete(l._id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors border border-error/20">
                    Reject
                  </button>
                </>
              )}
              {l.status === "approved" && (
                <>
                  <button onClick={() => handleUpdate(l._id, { status: "pending" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
                    Suspend
                  </button>
                  <button onClick={() => handleDelete(l._id)} className="p-2 hover:bg-error/10 rounded-lg text-slate-400 hover:text-error transition-all" title="Delete">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
