"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedPage } from "@/components/ProtectedPage";

type RequestStatus = "open" | "assigned" | "in_progress" | "completed" | "cancelled";

type ServiceRequestItem = {
  _id: string;
  serviceType: string;
  serviceMode?: "general" | "emergency";
  status: RequestStatus;
  problemDescription: string;
  location: string;
  createdAt: string;
  assignedAt?: string;
  conversationId?: string | { _id: string; lastMessageAt?: string; lastMessagePreview?: string; status?: string } | null;
  assignedRepairshopId?: {
    _id: string;
    name: string;
    location?: string;
    city?: string;
    phone?: string;
    email?: string;
    responseTimeMinutes?: number;
  } | null;
  assignedRepairshopOwnerId?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
};

type ChatMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

type ServiceRequestsPayload = {
  stats: {
    totalRequests: number;
    assignedRequests: number;
    activeRequests: number;
    completedRequests: number;
  };
  requests: ServiceRequestItem[];
};

function normalizeStatus(status: RequestStatus) {
  if (status === "in_progress") return "In Progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClassName(status: RequestStatus) {
  if (status === "completed") return "bg-tertiary/15 text-tertiary";
  if (status === "in_progress") return "bg-secondary/15 text-secondary";
  if (status === "assigned") return "bg-primary/15 text-primary";
  if (status === "cancelled") return "bg-error/15 text-error";
  return "bg-surface-container-high text-on-surface-variant";
}

export default function CarOwnerServiceRequestsPage() {
  const [data, setData] = useState<ServiceRequestsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatText, setChatText] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const token = typeof window === "undefined" ? "" : localStorage.getItem("auth_token") || "";

  const activeRequest = useMemo(
    () => data?.requests.find((requestItem) => requestItem._id === selectedRequestId) || data?.requests[0] || null,
    [data?.requests, selectedRequestId]
  );

  const activeConversationId = useMemo(() => {
    const conversation = activeRequest?.conversationId;
    if (!conversation) return "";
    return typeof conversation === "string" ? conversation : conversation._id;
  }, [activeRequest]);

  useEffect(() => {
    const loadServiceRequests = async () => {
      try {
        const response = await fetch("/api/dashboard/car-owner/service-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as Partial<ServiceRequestsPayload> & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load service requests");
        }

        setData(payload as ServiceRequestsPayload);
        const firstId = (payload.requests || [])[0]?._id;
        if (firstId) {
          setSelectedRequestId(firstId);
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to load service requests");
      } finally {
        setLoading(false);
      }
    };

    loadServiceRequests();
  }, [token]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeRequest) {
        setMessages([]);
        return;
      }

      let conversationId = activeConversationId;
      if (!conversationId && activeRequest.assignedRepairshopId?._id) {
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
        const payload = (await response.json().catch(() => ({}))) as { messages?: ChatMessage[] };

        if (response.ok) {
          setMessages(payload.messages || []);
          return;
        }

        setMessages([]);
      } catch {
        setMessages([]);
      }
    };

    loadMessages();
  }, [activeConversationId, activeRequest, token]);

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

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to send message");
      }

      const refreshed = await fetch(`/api/messages?conversationId=${encodeURIComponent(activeConversationId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const refreshedPayload = (await refreshed.json().catch(() => ({}))) as { messages?: ChatMessage[] };
      setMessages(refreshedPayload.messages || []);
      setChatText("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <ProtectedPage requiredRole="car_owner">
      <DashboardLayout requiredRole="car_owner">
        <div className="space-y-8">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-bold">Service Request Desk</p>
            <h1 className="text-4xl font-bold text-on-surface font-[family-name:var(--font-headline)]">My Service Requests</h1>
            <p className="text-on-surface-variant max-w-2xl">
              Track each request status, see which repairshop was assigned, and chat directly with the repairshop owner.
            </p>
          </header>

          {errorMessage && (
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Total" value={loading ? "..." : String(data?.stats.totalRequests ?? 0)} accent="text-primary" />
            <StatCard label="Assigned" value={loading ? "..." : String(data?.stats.assignedRequests ?? 0)} accent="text-secondary" />
            <StatCard label="Active" value={loading ? "..." : String(data?.stats.activeRequests ?? 0)} accent="text-tertiary" />
            <StatCard label="Completed" value={loading ? "..." : String(data?.stats.completedRequests ?? 0)} accent="text-on-surface" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <section className="xl:col-span-3 space-y-4">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Request Status</h2>

              {loading ? (
                <div className="glass-card rounded-2xl p-8 border border-outline-variant/20 text-on-surface-variant">Loading requests...</div>
              ) : data?.requests.length ? (
                <div className="space-y-4">
                  {data.requests.map((requestItem) => {
                    const isSelected = activeRequest?._id === requestItem._id;
                    const assignedShop = requestItem.assignedRepairshopId;

                    return (
                      <button
                        key={requestItem._id}
                        type="button"
                        onClick={() => setSelectedRequestId(requestItem._id)}
                        className={`w-full text-left glass-card rounded-2xl p-5 border transition-all ${
                          isSelected ? "border-primary/50 bg-primary/5" : "border-outline-variant/20 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-surface-container-high text-on-surface-variant">
                                {requestItem.serviceMode || "general"}
                              </span>
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusClassName(requestItem.status)}`}>
                                {normalizeStatus(requestItem.status)}
                              </span>
                            </div>
                            <p className="font-semibold text-lg">{assignedShop?.name || "Waiting for assignment"}</p>
                            <p className="text-sm text-on-surface-variant">{requestItem.location}</p>
                            <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{requestItem.problemDescription}</p>
                          </div>
                          <div className="text-sm text-on-surface-variant">
                            {new Date(requestItem.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8 border border-outline-variant/20 text-on-surface-variant">
                  No service requests found.
                </div>
              )}
            </section>

            <aside className="xl:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 space-y-4">
                <h2 className="text-xl font-bold font-[family-name:var(--font-headline)]">Assigned Repairshop</h2>
                <div className="rounded-xl bg-surface-container-low p-4 border border-outline-variant/15 space-y-1">
                  <p className="font-semibold text-on-surface">{activeRequest?.assignedRepairshopId?.name || "Not assigned yet"}</p>
                  <p className="text-sm text-on-surface-variant">
                    {[activeRequest?.assignedRepairshopId?.location, activeRequest?.assignedRepairshopId?.city].filter(Boolean).join(", ") || "Assignment pending"}
                  </p>
                  <p className="text-sm text-on-surface-variant">{activeRequest?.assignedRepairshopOwnerId?.phone || activeRequest?.assignedRepairshopId?.phone || "No phone available"}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 space-y-4">
                <h2 className="text-xl font-bold font-[family-name:var(--font-headline)]">Chat with Repairshop</h2>
                {activeConversationId ? (
                  <>
                    <div className="max-h-[18rem] overflow-y-auto space-y-3 pr-1">
                      {messages.length ? (
                        messages.map((messageItem) => (
                          <div key={messageItem._id} className="rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3">
                            <p className="text-sm text-on-surface">{messageItem.content}</p>
                            <p className="mt-2 text-[11px] uppercase tracking-widest text-on-surface-variant">
                              {new Date(messageItem.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed border-outline-variant/20 p-4 text-sm text-on-surface-variant">
                          No messages yet. Start the conversation.
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <textarea
                        value={chatText}
                        onChange={(event) => setChatText(event.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-highest px-4 py-3 text-sm text-on-surface outline-none focus:border-primary"
                        placeholder="Type your message to the repairshop..."
                      />
                      <button
                        type="button"
                        onClick={sendMessage}
                        disabled={chatLoading || !chatText.trim()}
                        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary disabled:opacity-50"
                      >
                        {chatLoading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-outline-variant/20 p-4 text-sm text-on-surface-variant">
                    Chat will be available once a repairshop is assigned to this request.
                  </div>
                )}
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
