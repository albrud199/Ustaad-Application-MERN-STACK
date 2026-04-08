"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

interface Payment {
  id: string;
  date: string;
  parking: string;
  duration: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

export default function PaymentHistory() {
  const [payments] = useState<Payment[]>([]);

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Payment History</h1>
          <p className="text-on-surface-variant">View all your transactions</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <p className="text-on-surface-variant text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-primary">$0.00</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <p className="text-on-surface-variant text-sm mb-2">This Month</p>
            <p className="text-3xl font-bold text-secondary">$0.00</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <p className="text-on-surface-variant text-sm mb-2">Transactions</p>
            <p className="text-3xl font-bold text-tertiary">{payments.length}</p>
          </div>
        </div>

        {/* Payments Table */}
        {payments.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">💳</p>
            <p className="text-on-surface-variant">No payments yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl border border-outline-variant/20 backdrop-blur-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Parking</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-outline-variant/20 hover:bg-surface-container/30">
                    <td className="px-6 py-4 text-sm">{payment.date}</td>
                    <td className="px-6 py-4 text-sm">{payment.parking}</td>
                    <td className="px-6 py-4 text-sm">{payment.duration}</td>
                    <td className="px-6 py-4 text-sm font-semibold">${payment.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : payment.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {payment.status}
                      </span>
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
