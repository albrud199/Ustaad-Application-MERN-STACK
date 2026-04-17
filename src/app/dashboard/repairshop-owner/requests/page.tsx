"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useEffect, useState } from "react";

type RequestItem = {
  _id: string;
  serviceMode?: string;
  serviceType: string;
  status: string;
  problemDescription: string;
  location: string;
  carOwnerId?: { name: string; email: string };
  carDetails?: { licensePlate?: string };
};

export default function RepairshopRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/repairshop-owner/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { requests?: RequestItem[]; error?: string };
        if (response.ok) {
          setRequests(payload.requests || []);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load repair requests");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <ProtectedPage requiredRole="repairshop_owner">
      <DashboardLayout requiredRole="repairshop_owner">
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Service Requests</h1>
            <p className="text-on-surface-variant">All repairshop assignments in one place.</p>
          </header>

          {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

          {loading ? (
            <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">No requests yet.</div>
          ) : (
            <div className="space-y-4">
              {requests.map((requestItem) => (
                <div key={requestItem._id} className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary">{requestItem.serviceMode || requestItem.serviceType}</span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-surface-container-high text-on-surface-variant">{requestItem.status}</span>
                      </div>
                      <p className="font-semibold text-lg">{requestItem.carOwnerId?.name || "Customer"}</p>
                      <p className="text-sm text-on-surface-variant">{requestItem.carDetails?.licensePlate || "Unknown plate"} • {requestItem.location}</p>
                      <p className="text-sm text-on-surface-variant mt-2">{requestItem.problemDescription}</p>
                    </div>
                    <div className="text-sm text-on-surface-variant">{requestItem.carOwnerId?.email || ""}</div>
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