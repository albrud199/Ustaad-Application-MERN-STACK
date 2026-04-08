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
  const [earnings, setEarnings] = useState<EarningsData>({
    thisMonth: 0,
    thisWeek: 0,
    total: 0,
    transactions: [],
  });

  useEffect(() => {
    // TODO: Fetch earnings data from API
    // fetch("/api/dashboard/garage-owner/earnings")
  }, []);

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Earnings</h1>
          <p className="text-on-surface-variant">Track your revenue and earnings</p>
        </header>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors">
            <p className="text-on-surface-variant text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">calendar_today</span>
              This Month
            </p>
            <p className="text-3xl font-bold text-primary">${earnings.thisMonth.toFixed(2)}</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-secondary/30 transition-colors">
            <p className="text-on-surface-variant text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-secondary">schedule</span>
              This Week
            </p>
            <p className="text-3xl font-bold text-secondary">${earnings.thisWeek.toFixed(2)}</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-tertiary/30 transition-colors">
            <p className="text-on-surface-variant text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-tertiary">trending_up</span>
              Total
            </p>
            <p className="text-3xl font-bold text-tertiary">${earnings.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Earnings Chart Placeholder */}
        <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-headline)]">Earnings Chart</h3>
          <div className="h-64 flex items-center justify-center bg-surface-container/30 rounded-lg">
            <p className="text-on-surface-variant">Chart coming soon - using Chart.js or similar</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-headline)]">Recent Transactions</h3>
          {earnings.transactions.length === 0 ? (
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
                      <td className="px-4 py-3">{tx.date}</td>
                      <td className="px-4 py-3 font-semibold">{tx.bookingId}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">+${tx.amount.toFixed(2)}</td>
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