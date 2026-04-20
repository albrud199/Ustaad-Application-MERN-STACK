"use client";

import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type Vehicle = {
  vehicleId?: string;
  licensePlate?: string;
  model?: string;
  color?: string;
};

function formatBDT(value: number) {
  return `BDT ${value.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function hoursBetween(startTime: string, endTime: string) {
  if (!startTime || !endTime) return 4;

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const start = startHours + startMinutes / 60;
  let end = endHours + endMinutes / 60;

  if (end <= start) end += 24;
  return Math.max(0.5, end - start);
}

function toLocalDateInput(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalTimeInput(date: Date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getNextBookingWindow(baseDate = new Date()) {
  const start = new Date(baseDate);
  start.setSeconds(0, 0);
  const minutes = start.getMinutes();
  let addMinutes = 30 - (minutes % 30);
  if (addMinutes === 0) addMinutes = 30;
  start.setMinutes(minutes + addMinutes);

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  return {
    date: toLocalDateInput(start),
    start: toLocalTimeInput(start),
    end: toLocalTimeInput(end),
  };
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutLoadingFallback() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center">
      <NebulaBackground />
      <div className="relative z-10 text-center">
        <span className="material-symbols-outlined text-primary text-5xl animate-spin">hourglass_bottom</span>
        <p className="mt-4 text-on-surface-variant">Loading checkout...</p>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authStatus, setAuthStatus] = useState<
    "checking" | "allowed" | "redirecting"
  >("checking");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const parkingId = searchParams.get("parkingId") || "";
  const parkingName = searchParams.get("parkingName") || "Selected Parking";
  const parkingLocation =
    searchParams.get("location") ||
    searchParams.get("city") ||
    "Parking location";
  const hourlyRate =
    Number(
      searchParams.get("rate") || searchParams.get("pricePerHour") || "0",
    ) || 0;
  const defaultStart = searchParams.get("start") || "14:00";
  const defaultEnd = searchParams.get("end") || "18:00";
  const defaultDate =
    searchParams.get("date") || new Date().toISOString().slice(0, 10);

  const initialWindow = useMemo(() => {
    const now = new Date();
    const parsedStart = new Date(`${defaultDate}T${defaultStart}:00`);

    if (Number.isNaN(parsedStart.getTime()) || parsedStart <= now) {
      return getNextBookingWindow(now);
    }

    return {
      date: defaultDate,
      start: defaultStart,
      end: defaultEnd,
    };
  }, [defaultDate, defaultStart, defaultEnd]);

  const [bookingDate, setBookingDate] = useState(initialWindow.date);
  const [startTime, setStartTime] = useState(initialWindow.start);
  const [endTime, setEndTime] = useState(initialWindow.end);

  const today = useMemo(() => toLocalDateInput(new Date()), []);
  const minStartTime = useMemo(() => {
    if (bookingDate !== today) return "00:00";
    const nextWindow = getNextBookingWindow(new Date());
    return nextWindow.start;
  }, [bookingDate, today]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const loggedIn = localStorage.getItem("ustaad_logged_in") === "true";
      if (!loggedIn) {
        router.replace(`/login?returnTo=${encodeURIComponent("/checkout")}`);
        setAuthStatus("redirecting");
        return;
      }

      setAuthStatus("allowed");
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [router]);

  useEffect(() => {
    const loadVehicles = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const response = await fetch("/api/dashboard/car-owner/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { vehicles?: Vehicle[] };
        setVehicles(payload.vehicles || []);
        setSelectedVehicleId(payload.vehicles?.[0]?.vehicleId || "");
      } catch {
        setVehicles([]);
      }
    };

    if (authStatus === "allowed") loadVehicles();
  }, [authStatus]);

  const durationHours = useMemo(
    () => hoursBetween(startTime, endTime),
    [startTime, endTime],
  );
  const subtotal = useMemo(
    () => hourlyRate * durationHours,
    [hourlyRate, durationHours],
  );
  const serviceFee = useMemo(() => subtotal * 0.05, [subtotal]);
  const platformFee = useMemo(() => durationHours * 10, [durationHours]);
  const total = subtotal + serviceFee + platformFee;
  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.vehicleId === selectedVehicleId) ||
    vehicles[0];

  const handleCheckout = async () => {
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Login expired. Please sign in again.");
      }

      if (!selectedVehicle) {
        throw new Error("Add a vehicle before checking out.");
      }

      let effectiveDate = bookingDate;
      let effectiveStartTime = startTime;
      let effectiveEndTime = endTime;

      let start = new Date(`${effectiveDate}T${effectiveStartTime}:00`);
      let end = new Date(`${effectiveDate}T${effectiveEndTime}:00`);

      if (start <= new Date()) {
        const nextWindow = getNextBookingWindow(new Date());
        effectiveDate = nextWindow.date;
        effectiveStartTime = nextWindow.start;
        effectiveEndTime = nextWindow.end;
        setBookingDate(effectiveDate);
        setStartTime(effectiveStartTime);
        setEndTime(effectiveEndTime);

        start = new Date(`${effectiveDate}T${effectiveStartTime}:00`);
        end = new Date(`${effectiveDate}T${effectiveEndTime}:00`);
      }

      if (end <= start) {
        end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
      }

      // ===== STEP 1: CREATE BOOKING =====
      let bookingId = "";

      if (!parkingId) {
        throw new Error(
          "Parking information is missing. Please go back and select a parking.",
        );
      }

      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          parkingId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          vehicleDetails: {
            licensePlate: selectedVehicle.licensePlate || "",
            model: selectedVehicle.model || "",
            color: selectedVehicle.color || "",
          },
        }),
      });

      if (!bookingResponse.ok) {
        const errData = (await bookingResponse.json()) as { error?: string };
        throw new Error(
          errData.error || "Failed to create booking. Please try again.",
        );
      }

      const bookingPayload = (await bookingResponse.json()) as {
        booking?: { _id?: string };
      };
      bookingId = bookingPayload.booking?._id || "";

      if (!bookingId) {
        throw new Error(
          "Booking was created but ID is missing. Please contact support.",
        );
      }

      // ===== STEP 2: PROCESS PAYMENT =====
      const paymentResponse = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId,
          amount: Number(total.toFixed(2)),
          paymentMethod,
          transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }),
      });

      if (!paymentResponse.ok) {
        const errData = (await paymentResponse.json()) as { error?: string };
        throw new Error(
          errData.error || "Payment processing failed. Please try again.",
        );
      }

      router.push(
        `/booking-confirmation?parkingName=${encodeURIComponent(parkingName)}&location=${encodeURIComponent(parkingLocation)}&total=${encodeURIComponent(total.toFixed(2))}&currency=BDT&hours=${encodeURIComponent(durationHours.toFixed(1))}&date=${encodeURIComponent(effectiveDate)}&start=${encodeURIComponent(effectiveStartTime)}&end=${encodeURIComponent(effectiveEndTime)}`,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Checkout failed.",
      );
      setSubmitting(false);
    }
  };

  if (authStatus !== "allowed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-5xl animate-pulse">
            lock
          </span>
          <p className="text-on-surface-variant">Verifying access…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <NebulaBackground />

      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-on-surface-variant hover:text-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary mr-2 to-secondary font-[family-name:var(--font-headline)]">
              Ustaad
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/help-support"
              className="text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-body)] text-sm"
            >
              Support
            </Link>
            <Link
              href="/security-password"
              className="text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-body)] text-sm"
            >
              Security
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <header>
              <h2 className="text-4xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface mb-2">
                Complete Checkout
              </h2>
              <p className="text-on-surface-variant">
                Secure your booking with real pricing in BDT.
              </p>
            </header>

            <section className="glass-card p-8 rounded-2xl space-y-6 border border-outline-variant/15">
              <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Booking Window
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Date
                  </label>
                  <input
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    type="date"
                    min={today}
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Check-in
                  </label>
                  <input
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    type="time"
                    min={minStartTime}
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Check-out
                  </label>
                  <input
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    type="time"
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "card", label: "Credit Card", icon: "credit_card" },
                  { id: "bkash", label: "bKash", icon: "account_balance" },
                  { id: "nagad", label: "Nagad", icon: "wallet" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="relative cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="peer sr-only"
                    />
                    <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                      <span
                        className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform text-on-surface"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {method.icon}
                      </span>
                      <span className="text-sm font-semibold text-on-surface">
                        {method.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="glass-card p-8 rounded-2xl space-y-6 border border-outline-variant/15">
              <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Vehicle
              </h3>
              {vehicles.length === 0 ? (
                <p className="text-sm text-on-surface-variant">
                  Add a vehicle in your dashboard before checking out.
                </p>
              ) : (
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface outline-none"
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                      {vehicle.model || "Vehicle"} •{" "}
                      {vehicle.licensePlate || "Unknown plate"}
                    </option>
                  ))}
                </select>
              )}
            </section>
          </div>

          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-outline-variant/15">
              <div className="p-8 space-y-8">
                <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 relative bg-surface-container-highest border border-outline-variant/20">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5MyERuhhUeEWktNH-Nz_0EZM9cgAJaH9-jyAZCdnoACvps8NzvDwpE7VKVswnJqdSFp8qnogAvOFVaH_DkqLvitKWQhTDrtGm849oJwWoEXDFtmu-G5DzJZlEjbyXAeQTTzx94qtZgJNr3_G0W8wjDZCvoGXTjemLjUckJ_akAZAlWCtCKb_a-iprNyHnn4ricoUiTddRkJpu65wmF72dCiBrF7yZVDJBGJRqG-q3CPSndlpd6cIsR7HzZ4-kP4eqmIKFC0A4vfw"
                        alt="Parking"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-on-surface truncate">
                        {parkingName}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">
                        {parkingLocation}
                      </p>
                    </div>
                    <p className="font-bold text-on-surface">
                      {formatBDT(hourlyRate)}
                    </p>
                  </div>

                  <div className="h-px bg-outline-variant/20"></div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Subtotal</span>
                      <span className="text-on-surface font-semibold">
                        {formatBDT(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">
                        Service Fee (5%)
                      </span>
                      <span className="text-on-surface font-semibold">
                        {formatBDT(serviceFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">
                        Platform Fee (BDT 10/hour)
                      </span>
                      <span className="text-on-surface font-semibold">
                        {formatBDT(platformFee)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-primary/20">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Total Payable
                      </p>
                      <p className="text-3xl font-black font-[family-name:var(--font-headline)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {formatBDT(total)}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary opacity-50 text-5xl animate-pulse">
                      auto_awesome
                    </span>
                  </div>

                  {error && (
                    <p className="mb-4 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={submitting || !vehicles.length}
                    className="w-full block text-center py-5 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold text-lg rounded-2xl shadow-[0_10px_30px_rgba(163,166,255,0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-60 disabled:scale-100"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        encrypted
                      </span>
                      {submitting ? "Processing..." : `Pay ${formatBDT(total)}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-on-surface">
              <span className="material-symbols-outlined text-4xl">
                verified
              </span>
              <span className="material-symbols-outlined text-4xl">
                shield_with_heart
              </span>
              <span className="material-symbols-outlined text-4xl">
                security
              </span>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-outline-variant/10 mt-auto bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <Link
              href="/terms-conditions"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Refund Policy
            </Link>
          </div>
          <p className="text-xs text-on-surface-variant font-medium">
            © 2024 Ustaad Technologies. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
