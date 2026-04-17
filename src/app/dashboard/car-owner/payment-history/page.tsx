"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useMemo, useState } from "react";

interface Payment {
  _id: string;
  amount: number;
  currency?: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
  paymentMethod?: string;
  description?: string;
  referenceId?: { parkingId?: { name?: string; location?: string; city?: string } };
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/car-owner/payment-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { payments?: Payment[]; error?: string };
        if (response.ok) {
          setPayments(payload.payments || []);
          setMessage("");
        } else {
          setMessage(payload.error || "Failed to load payment history");
        }
      } catch {
        setMessage("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const totals = useMemo(() => {
    const completed = payments.filter((payment) => payment.status === "completed");
    return {
      total: completed.reduce((sum, payment) => sum + payment.amount, 0),
      thisMonth: completed.reduce((sum, payment) => {
        const createdAt = new Date(payment.createdAt);
        const now = new Date();
        return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear() ? sum + payment.amount : sum;
      }, 0),
      count: payments.length,
    };
  }, [payments]);

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Payment History</h1>
          <p className="text-on-surface-variant">View all your transactions</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Spent" value={`BDT ${totals.total.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <SummaryCard title="This Month" value={`BDT ${totals.thisMonth.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <SummaryCard title="Transactions" value={String(totals.count)} accent="text-tertiary" />
        </div>

        {loading ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading payments...</div>
        ) : payments.length === 0 ? (
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-outline-variant/20 hover:bg-surface-container/30">
                    <td className="px-6 py-4 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">{payment.referenceId?.parkingId?.name || payment.description || "Booking payment"}</td>
                    <td className="px-6 py-4 text-sm font-semibold">BDT {payment.amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === "completed" ? "bg-green-500/20 text-green-400" : payment.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{payment.status}</span></td>
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

function SummaryCard({ title, value, accent = "text-primary" }: { title: string; value: string; accent?: string }) {
  return (
    <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
      <p className="text-on-surface-variant text-sm mb-2">{title}</p>
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}