"use client";

import { useState, useEffect, useCallback } from "react";
import AdminDataTable from "@/components/AdminDataTable";

interface PaymentRecord {
  _id: string;
  userId?: { name?: string; email?: string; role?: string };
  bookingId?: { startTime?: string; endTime?: string; totalPrice?: number };
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  const fetchPayments = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (statusFilter) params.set("status", statusFilter);
      if (methodFilter) params.set("method", methodFilter);
      const res = await fetch(`/api/admin/payments?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments);
        setPagination(data.pagination);
      }
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  }, [statusFilter, methodFilter]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      success: "bg-green-500/10 text-green-400 border-green-500/20",
      failed: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{status}</span>;
  };

  const methodBadge = (method: string) => {
    const map: Record<string, string> = {
      card: "bg-primary/10 text-primary border-primary/20",
      bkash: "bg-secondary/10 text-secondary border-secondary/20",
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[method] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{method}</span>;
  };

  const columns = [
    {
      key: "userId", label: "User",
      render: (_: unknown, row: Record<string, unknown>) => {
        const p = row as unknown as PaymentRecord;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs">{p.userId?.name?.charAt(0)?.toUpperCase() || "?"}</div>
            <div><p className="font-medium text-on-surface text-sm">{p.userId?.name || "Unknown"}</p><p className="text-[11px] text-slate-400">{p.userId?.email || ""}</p></div>
          </div>
        );
      },
    },
    { key: "amount", label: "Amount", render: (val: unknown) => <span className="text-sm font-bold text-on-surface">৳{(val as number)?.toLocaleString()}</span> },
    { key: "method", label: "Method", render: (val: unknown) => methodBadge(val as string) },
    { key: "status", label: "Status", render: (val: unknown) => statusBadge(val as string) },
    {
      key: "createdAt", label: "Date",
      render: (val: unknown) => <span className="text-slate-400 text-xs">{new Date(val as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Payments</h1>
          <p className="text-on-surface-variant mt-1">Track all financial transactions</p>
        </div>
        <div className="text-sm font-bold text-secondary bg-secondary/10 px-4 py-2 rounded-xl border border-secondary/20">{pagination.total} Transactions</div>
      </div>

      <AdminDataTable
        columns={columns}
        data={payments as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search payments..."
        onPageChange={(p) => fetchPayments(p)}
        pagination={pagination}
        loading={loading}
        emptyMessage="No payments found"
        filters={
          <>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); }} className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer">
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
            <select value={methodFilter} onChange={(e) => { setMethodFilter(e.target.value); }} className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer">
              <option value="">All Methods</option>
              <option value="card">Card</option>
              <option value="bkash">bKash</option>
            </select>
          </>
        }
      />
    </div>
  );
}
