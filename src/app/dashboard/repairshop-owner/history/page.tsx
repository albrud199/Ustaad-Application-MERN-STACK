"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useEffect, useState } from "react";

type HistoryItem = {
  _id: string;
  serviceType: string;
  status: string;
  problemDescription: string;
  location: string;
  createdAt: string;
  carOwnerId?: { name: string; email: string };
  carDetails?: { licensePlate?: string; model?: string };
};

export default function RepairshopHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/repairshop-owner/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { history?: HistoryItem[]; error?: string };
        if (response.ok) {
          setHistory(payload.history || []);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load repair history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <ProtectedPage requiredRole="repairshop_owner">
      <DashboardLayout requiredRole="repairshop_owner">
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Repair History</h1>
            <p className="text-on-surface-variant">Completed and cancelled services for returned customers and vehicles.</p>
          </header>

          {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

          {loading ? (
            <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">No service history yet.</div>
          ) : (
            <div className="space-y-4">
              {history.map((requestItem) => (
                <div key={requestItem._id} className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
                  <p className="font-semibold text-lg">{requestItem.carOwnerId?.name || "Customer"}</p>
                  <p className="text-sm text-on-surface-variant">{requestItem.carDetails?.licensePlate || "Unknown plate"} • {requestItem.carDetails?.model || "Vehicle"}</p>
                  <p className="text-sm text-on-surface-variant mt-2">{requestItem.problemDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-widest">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">{requestItem.serviceType}</span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-bold">{requestItem.status}</span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-bold">{new Date(requestItem.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
}