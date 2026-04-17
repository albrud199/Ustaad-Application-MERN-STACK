"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";

interface EarningsData {
  thisMonth: number;
  thisWeek: number;
  total: number;
  transactions: Array<{
    id: string;
    date: string;
    amount: number;
    bookingId: string;
  }>;
}

export default function Earnings() {
  const [earnings, setEarnings] = useState<EarningsData>({ thisMonth: 0, thisWeek: 0, total: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/garage-owner/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { earnings?: EarningsData; error?: string };
        if (response.ok && payload.earnings) {
          setEarnings(payload.earnings);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load earnings");
      } finally {
        setLoading(false);
      }
    };

    loadEarnings();
  }, []);

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Earnings</h1>
          <p className="text-on-surface-variant">Track your revenue and earnings</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="This Month" value={earnings.thisMonth} accent="text-primary" />
          <SummaryCard title="This Week" value={earnings.thisWeek} accent="text-secondary" />
          <SummaryCard title="Total" value={earnings.total} accent="text-tertiary" />
        </div>

        <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-headline)]">Recent Transactions</h3>
          {loading ? (
            <p className="text-on-surface-variant text-center py-8">Loading transactions...</p>
          ) : earnings.transactions.length === 0 ? (
            <p className="text-on-surface-variant text-center py-8">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Booking ID</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-outline-variant/20 hover:bg-surface-container/30">
                      <td className="px-4 py-3">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-semibold">{tx.bookingId}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">BDT {tx.amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({ title, value, accent }: { title: string; value: number; accent: string }) {
  return (
    <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors">
      <p className="text-on-surface-variant text-sm mb-2 flex items-center gap-2">{title}</p>
      <p className={`text-3xl font-bold ${accent}`}>BDT {value.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
  );
}