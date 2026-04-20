"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { getLoggedInUser } from "@/lib/auth";
import { useEffect, useMemo, useState } from "react";

type RepairshopRequest = {
  _id: string;
  serviceType: string;
  serviceMode?: "general" | "emergency";
  status: string;
  problemDescription: string;
  location: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  assignedAt?: string;
  conversationId?: string | { _id: string } | null;
  estimatedCost?: number;
  actualCost?: number;
  carOwnerId?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  carDetails?: {
    licensePlate?: string;
    model?: string;
    color?: string;
  };
};

type OverviewStats = {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  emergencyRequests: number;
  totalRevenue: number;
};

type OverviewPayload = {
  repairshop: {
    name: string;
    location?: string;
    city?: string;
    description?: string;
  };
  stats: OverviewStats;
  requests: RepairshopRequest[];
  history: RepairshopRequest[];
};

type ChatMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

function formatMoney(amount: number) {
  return `BDT ${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function RepairshopDashboardPage() {
  const user = getLoggedInUser();
  const [overview, setOverview] = useState<OverviewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeRequestId, setActiveRequestId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatText, setChatText] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<Record<string, "in_progress" | "completed" | null>>({});

  const activeRequest = useMemo(
    () => overview?.requests.find((requestItem) => requestItem._id === activeRequestId) || overview?.requests[0] || null,
    [activeRequestId, overview]
  );

  const activeConversationId = useMemo(() => {
    const conversation = activeRequest?.conversationId;
    if (!conversation) return "";
    return typeof conversation === "string" ? conversation : conversation._id;
  }, [activeRequest]);

  const token = typeof window === "undefined" ? "" : localStorage.getItem("auth_token") || "";

  const loadOverview = async () => {
    const response = await fetch("/api/dashboard/repairshop-owner/overview", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string } & Partial<OverviewPayload>;
    if (!response.ok) {
      throw new Error(payload.error || "Failed to load repairshop dashboard");
    }

    const casted = payload as OverviewPayload;
    setOverview(casted);

    const nextRequests = casted.requests || [];
    if (!nextRequests.find((requestItem) => requestItem._id === activeRequestId)) {
      setActiveRequestId(nextRequests[0]?._id || "");
    }

    return casted;
  };

  useEffect(() => {
    const loadInitialOverview = async () => {
      try {
        const loaded = await loadOverview();
        const firstRequest = loaded?.requests?.[0];
        if (firstRequest) {
          setActiveRequestId(firstRequest._id);
        }
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Failed to load repairshop dashboard");
      } finally {
        setLoading(false);
      }
    };

    void loadInitialOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeRequest) return;

      let conversationId = activeConversationId;
      if (!conversationId) {
        try {
          const createConversation = await fetch("/api/conversations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ serviceRequestId: activeRequest._id }),
          });
          const created = (await createConversation.json().catch(() => ({}))) as { conversation?: { _id: string } };
          conversationId = created.conversation?._id || "";
        } catch {
          conversationId = "";
        }
      }

      if (!conversationId) {
        setMessages([]);
        return;
      }

      try {
        const response = await fetch(`/api/messages?conversationId=${encodeURIComponent(conversationId)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { messages?: ChatMessage[]; error?: string };
        if (response.ok) {
          setMessages(payload.messages || []);
        }
      } catch {
        setMessages([]);
      }
    };

    loadMessages();
  }, [activeConversationId, activeRequest, token]);

  const updateRequestStatus = async (requestId: string, status: string) => {
    if (status !== "in_progress" && status !== "completed") return;

    setStatusUpdating((prev) => ({ ...prev, [requestId]: status }));
    try {
      const response = await fetch("/api/dashboard/repairshop-owner/requests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update service request");
      }

      await loadOverview();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update service request");
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  const sendMessage = async () => {
    if (!activeConversationId || !chatText.trim()) return;

    setChatLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conversationId: activeConversationId, content: chatText.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const refreshed = await fetch(`/api/messages?conversationId=${encodeURIComponent(activeConversationId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = (await refreshed.json().catch(() => ({}))) as { messages?: ChatMessage[] };
      setMessages(payload.messages || []);
      setChatText("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <ProtectedPage requiredRole="repairshop_owner">
      <DashboardLayout requiredRole="repairshop_owner">
        <div className="space-y-8">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-bold">Repair Shop Control Center</p>
            <h1 className="text-4xl font-bold text-on-surface font-[family-name:var(--font-headline)]">
              Welcome, {user?.name || "Owner"}
            </h1>
            <p className="text-on-surface-variant max-w-2xl">
              Track incoming repair and emergency requests, reply in text, and review each customer&apos;s vehicle history.
            </p>
          </header>

          {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <StatCard label="Requests" value={loading ? "..." : String(overview?.stats.totalRequests ?? 0)} accent="text-primary" />
            <StatCard label="Active" value={loading ? "..." : String(overview?.stats.activeRequests ?? 0)} accent="text-secondary" />
            <StatCard label="Done" value={loading ? "..." : String(overview?.stats.completedRequests ?? 0)} accent="text-tertiary" />
            <StatCard label="Emergency" value={loading ? "..." : String(overview?.stats.emergencyRequests ?? 0)} accent="text-error" />
            <StatCard label="Revenue" value={loading ? "..." : formatMoney(overview?.stats.totalRevenue ?? 0)} accent="text-primary" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <section className="xl:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Incoming Requests</h2>
                <button className="text-sm text-primary font-semibold" onClick={() => window.location.reload()} type="button">
                  Refresh
                </button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="glass-card rounded-2xl p-8 border border-outline-variant/20 text-on-surface-variant">Loading requests...</div>
                ) : overview?.requests.length ? (
                  overview.requests.map((requestItem) => {
                    const isActive = requestItem._id === activeRequest?._id;
                    return (
                      <div
                        key={requestItem._id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveRequestId(requestItem._id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setActiveRequestId(requestItem._id);
                          }
                        }}
                        className={`w-full text-left glass-card rounded-2xl p-5 border transition-all cursor-pointer ${
                          isActive ? "border-primary/50 bg-primary/5" : "border-outline-variant/20 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${requestItem.serviceMode === "emergency" ? "bg-error/10 text-error" : "bg-primary/10 text-primary"}`}>
                                {requestItem.serviceMode || "general"}
                              </span>
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-surface-container-high text-on-surface-variant">
                                {requestItem.status}
                              </span>
                            </div>
                            <p className="font-semibold text-lg">{requestItem.carOwnerId?.name || "Customer"}</p>
                            <p className="text-sm text-on-surface-variant">{requestItem.carDetails?.licensePlate || "Unknown plate"} • {requestItem.location}</p>
                            <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{requestItem.problemDescription}</p>
                            {typeof requestItem.latitude === "number" && typeof requestItem.longitude === "number" && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${requestItem.latitude},${requestItem.longitude}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-xs"
                                >
                                  View Map
                                </a>
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${requestItem.latitude},${requestItem.longitude}&travelmode=driving`}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary font-semibold text-xs"
                                >
                                  Directions
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                void updateRequestStatus(requestItem._id, "in_progress");
                              }}
                              disabled={Boolean(statusUpdating[requestItem._id])}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 ${
                                statusUpdating[requestItem._id] === "in_progress"
                                  ? "bg-secondary text-white animate-pulse"
                                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                              } disabled:opacity-70`}
                            >
                              {statusUpdating[requestItem._id] === "in_progress" ? "Starting..." : "Start"}
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                void updateRequestStatus(requestItem._id, "completed");
                              }}
                              disabled={Boolean(statusUpdating[requestItem._id])}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 ${
                                statusUpdating[requestItem._id] === "completed"
                                  ? "bg-primary text-white animate-pulse"
                                  : "bg-primary/10 text-primary hover:bg-primary/20"
                              } disabled:opacity-70`}
                            >
                              {statusUpdating[requestItem._id] === "completed" ? "Completing..." : "Complete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="glass-card rounded-2xl p-8 border border-outline-variant/20 text-on-surface-variant">No repair requests yet.</div>
                )}
              </div>
            </section>

            <aside className="xl:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-headline)]">Live Chat</h2>
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant">{activeRequest?.serviceMode || "general"}</span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-4 space-y-2">
                  <p className="text-sm font-semibold">{activeRequest?.carOwnerId?.name || "Select a request"}</p>
                  <p className="text-xs text-on-surface-variant">{activeRequest?.problemDescription || "Conversation appears here after a request is selected."}</p>
                </div>
                <div className="max-h-[24rem] overflow-y-auto space-y-3 pr-1">
                  {messages.length ? (
                    messages.map((chatMessage) => (
                      <div key={chatMessage._id} className="rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3">
                        <p className="text-sm text-on-surface">{chatMessage.content}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-widest text-on-surface-variant">{new Date(chatMessage.createdAt).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-outline-variant/20 p-4 text-sm text-on-surface-variant">
                      No messages yet. Start the conversation from here.
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <textarea
                    value={chatText}
                    onChange={(event) => setChatText(event.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-highest px-4 py-3 text-sm text-on-surface outline-none focus:border-primary"
                    placeholder="Type a message to the customer..."
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={chatLoading || !activeConversationId}
                    className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary disabled:opacity-50"
                  >
                    {chatLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 space-y-4">
                <h2 className="text-xl font-bold font-[family-name:var(--font-headline)]">Recent Repairs</h2>
                <div className="space-y-3">
                  {overview?.history.length ? (
                    overview.history.map((requestItem) => (
                      <div key={requestItem._id} className="rounded-xl bg-surface-container-low px-4 py-3 border border-outline-variant/15">
                        <p className="font-semibold">{requestItem.carOwnerId?.name || "Customer"}</p>
                        <p className="text-xs text-on-surface-variant">{requestItem.carDetails?.licensePlate || "Unknown plate"} • {requestItem.status}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-on-surface-variant">Completed work will appear here.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 border border-outline-variant/20">
      <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-semibold">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}