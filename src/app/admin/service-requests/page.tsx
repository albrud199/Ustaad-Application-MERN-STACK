"use client";

import { useState, useEffect, useCallback } from "react";
import AdminDataTable from "@/components/AdminDataTable";

interface ServiceReq {
  _id: string;
  userId?: { name?: string; email?: string; role?: string };
  problemDescription: string;
  carDetails: string;
  location: string;
  status: string;
  createdAt: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchRequests = useCallback(async (page = 1, status = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/service-requests?${params}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.serviceRequests);
        setPagination(data.pagination);
      }
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleUpdate = async (id: string, updates: Record<string, string>) => {
    try {
      const res = await fetch(`/api/admin/service-requests/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updates) });
      if (res.ok) fetchRequests(pagination.page);
    } catch (err) { console.error("Update failed:", err); }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      open: "bg-green-500/10 text-green-400 border-green-500/20",
      closed: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{status}</span>;
  };

  const columns = [
    {
      key: "userId", label: "Requester",
      render: (_: unknown, row: Record<string, unknown>) => {
        const r = row as unknown as ServiceReq;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center text-error font-bold text-xs">{r.userId?.name?.charAt(0)?.toUpperCase() || "?"}</div>
            <div><p className="font-medium text-on-surface text-sm">{r.userId?.name || "Unknown"}</p><p className="text-[11px] text-slate-400">{r.userId?.email || ""}</p></div>
          </div>
        );
      },
    },
    {
      key: "problemDescription", label: "Problem",
      render: (val: unknown) => <p className="text-sm text-on-surface-variant truncate max-w-[200px]">{val as string}</p>,
    },
    { key: "carDetails", label: "Car", render: (val: unknown) => <span className="text-sm text-on-surface-variant">{val as string}</span> },
    { key: "location", label: "Location", render: (val: unknown) => <span className="text-sm text-on-surface-variant">{val as string}</span> },
    { key: "status", label: "Status", render: (val: unknown) => statusBadge(val as string) },
    {
      key: "createdAt", label: "Date",
      render: (val: unknown) => <span className="text-slate-400 text-xs">{new Date(val as string).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Service Requests</h1>
          <p className="text-on-surface-variant mt-1">Monitor and manage all car service requests</p>
        </div>
        <div className="text-sm font-bold text-error bg-error/10 px-4 py-2 rounded-xl border border-error/20">{pagination.total} Requests</div>
      </div>

      <AdminDataTable
        columns={columns}
        data={requests as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search requests..."
        onPageChange={(p) => fetchRequests(p)}
        pagination={pagination}
        loading={loading}
        emptyMessage="No service requests found"
        filters={
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); fetchRequests(1, e.target.value); }} className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        }
        actions={(row) => {
          const r = row as unknown as ServiceReq;
          return r.status === "open" ? (
            <button onClick={() => handleUpdate(r._id, { status: "closed" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 transition-colors border border-slate-500/20">
              Close
            </button>
          ) : (
            <button onClick={() => handleUpdate(r._id, { status: "open" })} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20">
              Reopen
            </button>
          );
        }}
      />
    </div>
  );
}
