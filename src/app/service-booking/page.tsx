"use client";

import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ServiceRequestDraft = {
  serviceType: string;
  problemDescription: string;
  location: string;
  latitude?: number;
  longitude?: number;
  carDetails?: Record<string, unknown>;
  images?: string[];
};

export default function ServiceBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const repairshopId = searchParams.get("repairshopId") || "";
  const repairshop = searchParams.get("repairshop") || "Selected repair shop";
  const rating = searchParams.get("rating") || "4.8";
  const pricing = searchParams.get("pricing") || "Mid";
  const [draft, setDraft] = useState<ServiceRequestDraft | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("service_request_draft");
    if (!raw) {
      setDraft(null);
      setDraftReady(true);
      return;
    }

    try {
      setDraft(JSON.parse(raw) as ServiceRequestDraft);
    } catch {
      setDraft(null);
    } finally {
      setDraftReady(true);
    }
  }, []);

  const confirmServiceOrder = async () => {
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push(`/login?returnTo=${encodeURIComponent(`/service-booking?repairshopId=${repairshopId}&repairshop=${encodeURIComponent(repairshop)}&rating=${rating}&pricing=${pricing}`)}`);
        return;
      }

      if (!draft) {
        throw new Error("Service request details are missing. Please complete the request form first.");
      }

      if (!repairshopId) {
        throw new Error("No repairshop selected. Please go back and choose a repairshop.");
      }

      const response = await fetch("/api/service-requests/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceType: draft.serviceType,
          problemDescription: draft.problemDescription,
          location: draft.location,
          latitude: draft.latitude,
          longitude: draft.longitude,
          repairshopId: repairshopId || undefined,
          carDetails: draft.carDetails || {},
          images: Array.isArray(draft.images) ? draft.images : [],
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to confirm service order");
      }

      sessionStorage.removeItem("service_request_draft");

      router.push("/dashboard/car-owner/service-requests");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to confirm service order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-outline-variant/15 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Service Summary</p>
            <h1 className="text-4xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface">{repairshop}</h1>
            <p className="text-on-surface-variant mt-2">Selected repair shop rating {rating} and pricing tier {pricing}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-outline-variant/15 p-5 bg-surface-container-low"><p className="text-xs uppercase tracking-widest text-on-surface-variant">Step 1</p><p className="font-bold mt-1">Confirm repair shop</p></div>
            <div className="rounded-2xl border border-outline-variant/15 p-5 bg-surface-container-low"><p className="text-xs uppercase tracking-widest text-on-surface-variant">Step 2</p><p className="font-bold mt-1">Review request</p></div>
            <div className="rounded-2xl border border-outline-variant/15 p-5 bg-surface-container-low"><p className="text-xs uppercase tracking-widest text-on-surface-variant">Step 3</p><p className="font-bold mt-1">Track progress</p></div>
          </div>

          {!draftReady ? (
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
              Loading request details...
            </div>
          ) : !draft ? (
            <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
              No request draft found. Please go back to the request form and fill the problem details first.
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-5">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Request Preview</p>
              <p className="text-sm"><span className="font-semibold">Service Type:</span> {draft.serviceType}</p>
              <p className="text-sm"><span className="font-semibold">Location:</span> {draft.location}</p>
              <p className="text-sm"><span className="font-semibold">Problem:</span> {draft.problemDescription}</p>
              <p className="text-sm"><span className="font-semibold">Uploaded Images:</span> {draft.images?.length || 0}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={confirmServiceOrder}
              disabled={submitting || !draft || !repairshopId}
              className="px-6 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-dim transition-colors"
            >
              {submitting ? "Confirming..." : "Confirm Service Order"}
            </button>
            <Link href="/service-results" className="px-6 py-4 rounded-xl border border-outline-variant/20 text-on-surface font-bold hover:bg-surface-container-high transition-colors text-center">Back to repairshop list</Link>
            <Link href="/request-service" className="px-6 py-4 rounded-xl border border-outline-variant/20 text-on-surface font-bold hover:bg-surface-container-high transition-colors text-center">Back to request form</Link>
          </div>

          {error && <p className="text-sm text-error font-medium">{error}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
}