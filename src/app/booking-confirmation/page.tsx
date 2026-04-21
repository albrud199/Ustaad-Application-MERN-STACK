"use client";

import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function formatBDT(value: number) {
  return `BDT ${value.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

type ReceiptDetails = {
  bookingId: string;
  parkingName: string;
  location: string;
  date: string;
  start: string;
  end: string;
  hours: number;
  currency: string;
  subtotal: number;
  serviceFee: number;
  platformFee: number;
  total: number;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildReceiptHtml(details: ReceiptDetails) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ustaad Booking Receipt - ${escapeHtml(details.bookingId)}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      color: #1f2937;
      background: #f8fafc;
    }
    .receipt {
      width: min(900px, 100%);
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
    }
    .header {
      padding: 24px;
      background: linear-gradient(135deg, #27264f, #45429a);
      color: #ffffff;
    }
    .brand {
      margin: 0;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 0.02em;
    }
    .subtitle {
      margin: 8px 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 24px;
      display: grid;
      gap: 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      background: #ffffff;
    }
    .label {
      margin: 0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      font-weight: 700;
    }
    .value {
      margin: 6px 0 0;
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      word-break: break-word;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .row:last-child { border-bottom: 0; }
    .total {
      font-size: 22px;
      font-weight: 800;
      color: #4338ca;
    }
    .footer {
      margin-top: 8px;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .receipt { border: 0; border-radius: 0; width: 100%; }
    }
  </style>
</head>
<body>
  <article class="receipt">
    <header class="header">
      <h1 class="brand">Ustaad</h1>
      <p class="subtitle">Parking Booking Receipt</p>
    </header>
    <section class="content">
      <div class="grid">
        <div class="card">
          <p class="label">Reservation ID</p>
          <p class="value">${escapeHtml(details.bookingId)}</p>
        </div>
        <div class="card">
          <p class="label">Status</p>
          <p class="value">Confirmed</p>
        </div>
        <div class="card">
          <p class="label">Parking</p>
          <p class="value">${escapeHtml(details.parkingName)}</p>
        </div>
        <div class="card">
          <p class="label">Location</p>
          <p class="value">${escapeHtml(details.location)}</p>
        </div>
        <div class="card">
          <p class="label">Date & Time</p>
          <p class="value">${escapeHtml(details.date)} (${escapeHtml(details.start)} - ${escapeHtml(details.end)})</p>
        </div>
        <div class="card">
          <p class="label">Duration</p>
          <p class="value">${details.hours.toFixed(1)} hours</p>
        </div>
      </div>

      <div class="card">
        <div class="row"><span>Subtotal</span><strong>${formatBDT(details.subtotal)}</strong></div>
        <div class="row"><span>Service Fee</span><strong>${formatBDT(details.serviceFee)}</strong></div>
        <div class="row"><span>Platform Fee</span><strong>${formatBDT(details.platformFee)}</strong></div>
        <div class="row"><span>Total Paid (${escapeHtml(details.currency)})</span><strong class="total">${formatBDT(details.total)}</strong></div>
      </div>

      <p class="footer">Generated on ${new Date().toLocaleString("en-BD")}. Thank you for booking with Ustaad.</p>
    </section>
  </article>
</body>
</html>`;
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationLoadingFallback />}>
      <BookingConfirmationContent />
    </Suspense>
  );
}

function BookingConfirmationLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-primary text-5xl animate-pulse">lock</span>
        <p className="text-on-surface-variant">Loading confirmation...</p>
      </div>
    </div>
  );
}

function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authStatus, setAuthStatus] = useState<"checking" | "allowed" | "redirecting">("checking");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const loggedIn = localStorage.getItem("ustaad_logged_in") === "true";
      if (!loggedIn) {
        router.replace("/login");
        setAuthStatus("redirecting");
        return;
      }

      setAuthStatus("allowed");
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [router]);

  const total = Number(searchParams.get("total") || "0") || 0;
  const hours = Number(searchParams.get("hours") || "4") || 4;
  const parkingName = searchParams.get("parkingName") || "Stellar Plaza - Zone A7";
  const location = searchParams.get("location") || "Parking location";
  const date = searchParams.get("date") || "Today";
  const start = searchParams.get("start") || "14:00";
  const end = searchParams.get("end") || "18:00";
  const currency = searchParams.get("currency") || "BDT";

  const platformFee = useMemo(() => Math.max(0, hours * 10), [hours]);
  const subtotal = useMemo(() => Math.max(0, (total - platformFee) / 1.05), [total, platformFee]);
  const serviceFee = useMemo(() => subtotal * 0.05, [subtotal]);
  const bookingId = searchParams.get("bookingId") || "BOOK-PENDING";

  const receiptDetails = useMemo<ReceiptDetails>(
    () => ({
      bookingId,
      parkingName,
      location,
      date,
      start,
      end,
      hours,
      currency,
      subtotal,
      serviceFee,
      platformFee,
      total,
    }),
    [bookingId, parkingName, location, date, start, end, hours, currency, subtotal, serviceFee, platformFee, total]
  );

  const openReceiptPrintWindow = () => {
    const receiptWindow = window.open("", "_blank", "width=980,height=760");
    if (!receiptWindow) {
      window.alert("Pop-up blocked. Please allow pop-ups to print or download the receipt.");
      return null;
    }

    receiptWindow.document.write(buildReceiptHtml(receiptDetails));
    receiptWindow.document.close();
    return receiptWindow;
  };

  const printReceiptWindow = (receiptWindow: Window) => {
    const triggerPrint = () => {
      receiptWindow.focus();
      // Delay print slightly so styles/layout finish painting in the new window.
      window.setTimeout(() => {
        receiptWindow.print();
      }, 300);
    };

    if (receiptWindow.document.readyState === "complete") {
      triggerPrint();
      return;
    }

    receiptWindow.addEventListener("load", triggerPrint, { once: true });
  };

  const handlePrint = () => {
    const receiptWindow = openReceiptPrintWindow();
    if (!receiptWindow) return;
    printReceiptWindow(receiptWindow);
  };

  const handleDownloadPdf = () => {
    const receiptWindow = openReceiptPrintWindow();
    if (!receiptWindow) return;
    printReceiptWindow(receiptWindow);
  };

  if (authStatus !== "allowed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-5xl animate-pulse">lock</span>
          <p className="text-on-surface-variant">Verifying access…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary/30 text-on-surface">
      <NebulaBackground />

      <main className="flex-1 pt-12 pb-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
        <div className="text-center mb-16 mt-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-primary-dim to-secondary mb-8 shadow-[0_0_40px_rgba(163,166,255,0.3)]">
            <span className="material-symbols-outlined text-5xl text-on-primary-fixed font-bold">check</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-primary">Booking Confirmed</h1>
          <p className="text-on-surface-variant text-lg">Your parking slot is secured. Access details below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 relative overflow-hidden bg-surface-variant/30 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Reservation ID</span>
                  <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">{bookingId}</h2>
                </div>
                <div className="md:text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Status</span>
                  <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/20">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="text-sm font-semibold">Active Orbit</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-outline-variant/10 pt-10">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary">location_on</span></div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Parking</p>
                      <p className="text-lg font-semibold text-on-surface mt-1">{parkingName}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary">directions_car</span></div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Location</p>
                      <p className="text-lg font-semibold text-on-surface mt-1">{location}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary">schedule</span></div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Duration ({hours.toFixed(1)} hours)</p>
                      <p className="text-lg font-semibold italic text-on-surface mt-1">{start} - {end} ({date})</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary">calendar_month</span></div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Currency</p>
                      <p className="text-lg font-semibold text-on-surface mt-1">{currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 bg-surface-variant/30 backdrop-blur-xl">
              <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">Pricing Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Service Fee</span>
                  <span className="font-mono">{formatBDT(serviceFee)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Platform Fee (BDT 10/hour)</span>
                  <span className="font-mono">{formatBDT(platformFee)}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="text-lg font-bold text-on-surface">Total Amount Paid</span>
                  <span className="text-2xl font-[family-name:var(--font-headline)] font-extrabold text-primary">{formatBDT(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 text-center flex flex-col items-center bg-surface-variant/30 backdrop-blur-xl">
              <p className="text-sm font-bold text-primary mb-6 uppercase tracking-tighter">Digital Check-in Key</p>
              <div className="p-4 bg-white rounded-2xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="w-48 h-48 bg-black relative flex items-center justify-center"><span className="text-white">QR CODE</span></div>
              </div>
              <p className="text-on-surface-variant text-sm px-4">Present this QR code at the entrance scanner to unlock your reserved space.</p>
            </div>

            <div className="space-y-3">
              <button onClick={handleDownloadPdf} className="w-full flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-primary-dim to-primary rounded-xl font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span className="material-symbols-outlined">picture_as_pdf</span> Download PDF
              </button>
              <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 h-14 bg-surface-container-highest border border-outline-variant/30 rounded-xl font-bold text-on-surface hover:bg-surface-variant transition-all">
                <span className="material-symbols-outlined">print</span> Print
              </button>
              <button onClick={() => router.push("/dashboard/car-owner")} className="w-full flex items-center justify-center gap-3 h-14 mt-8 text-on-surface-variant hover:text-primary transition-all group">
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span> Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 py-4 px-8 rounded-full bg-surface-container-low border border-outline-variant/10">
            <span className="text-on-surface-variant text-sm">Need help with your booking?</span>
            <Link href="/help-support" className="text-tertiary font-bold hover:underline">Contact Ground Control</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}