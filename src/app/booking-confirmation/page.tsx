"use client";

import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function formatBDT(value: number) {
  return `BDT ${value.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
  const bookingId = searchParams.get("bookingId") || "BOOK-PENDING";
  const transactionId = searchParams.get("transactionId") || "";

  const platformFee = useMemo(() => Math.max(0, hours * 10), [hours]);
  const subtotal = useMemo(() => Math.max(0, (total - platformFee) / 1.05), [total, platformFee]);
  const serviceFee = useMemo(() => subtotal * 0.05, [subtotal]);

  const [pdfError, setPdfError] = useState("");

  const downloadPDF = async () => {
    setPdfError("");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = margin;

      // Header background
      doc.setFillColor(37, 37, 56);
      doc.rect(0, 0, pageW, 40, "F");

      doc.setTextColor(163, 166, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("USTAAD", margin, 18);

      doc.setTextColor(200, 200, 220);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Smart Parking Platform", margin, 26);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT RECEIPT", pageW - margin, 22, { align: "right" });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(new Date().toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" }), pageW - margin, 30, { align: "right" });

      y = 55;

      // Status badge
      doc.setFillColor(34, 197, 94);
      doc.roundedRect(margin, y - 5, 55, 10, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT CONFIRMED", margin + 5, y + 1.5);

      y += 16;

      // Booking ID
      doc.setTextColor(100, 100, 120);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("BOOKING ID", margin, y);
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(bookingId, margin, y + 7);

      y += 20;
      doc.setDrawColor(220, 220, 235);
      doc.line(margin, y, pageW - margin, y);
      y += 10;

      // Booking details section
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Booking Details", margin, y);
      y += 8;

      const detailRows: [string, string][] = [
        ["Parking Location", parkingName],
        ["Address", location],
        ["Date", date],
        ["Check-in", start],
        ["Check-out", end],
        ["Duration", `${hours.toFixed(1)} hours`],
        ["Currency", currency],
      ];

      doc.setFontSize(9);
      for (const [label, value] of detailRows) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 120);
        doc.text(label, margin, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 50);
        doc.text(value, pageW - margin, y, { align: "right" });
        y += 7;
      }

      y += 5;
      doc.setDrawColor(220, 220, 235);
      doc.line(margin, y, pageW - margin, y);
      y += 10;

      // Pricing section
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Pricing Breakdown", margin, y);
      y += 8;

      const priceRows: [string, number][] = [
        ["Subtotal", subtotal],
        ["Service Fee (5%)", serviceFee],
        [`Platform Fee (BDT 10/hr × ${hours.toFixed(1)} hrs)`, platformFee],
      ];

      doc.setFontSize(9);
      for (const [label, amount] of priceRows) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 120);
        doc.text(label, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(30, 30, 50);
        doc.text(formatBDT(amount), pageW - margin, y, { align: "right" });
        y += 7;
      }

      y += 4;
      // Total row with highlight
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y - 4, pageW - margin * 2, 12, "F");
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Total Amount Paid", margin + 2, y + 4);
      doc.setTextColor(99, 102, 241);
      doc.setFontSize(13);
      doc.text(formatBDT(total), pageW - margin - 2, y + 4, { align: "right" });

      y += 20;
      doc.setDrawColor(220, 220, 235);
      doc.line(margin, y, pageW - margin, y);
      y += 10;

      // Transaction info
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 120);
      doc.setFont("helvetica", "normal");
      doc.text("Transaction ID", margin, y);
      doc.setTextColor(30, 30, 50);
      doc.setFont("helvetica", "bold");
      doc.text(transactionId || "N/A", pageW - margin, y, { align: "right" });
      y += 8;

      doc.setTextColor(100, 100, 120);
      doc.setFont("helvetica", "normal");
      doc.text("Payment Status", margin, y);
      doc.setTextColor(34, 197, 94);
      doc.setFont("helvetica", "bold");
      doc.text("PAID", pageW - margin, y, { align: "right" });

      y += 16;

      // Footer note
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y, pageW - margin * 2, 18, "F");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 120);
      doc.setFont("helvetica", "normal");
      doc.text("Thank you for choosing Ustaad. Present this receipt at the parking entrance.", margin + 5, y + 7);
      doc.text("For support: support@ustaad.app  |  ustaad.app", margin + 5, y + 13);

      const dateStr = new Date().toISOString().slice(0, 10);
      doc.save(`Ustaad-Receipt-${bookingId}-${dateStr}.pdf`);
    } catch {
      setPdfError("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
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
              {pdfError && (
                <p className="text-sm text-error bg-error/10 border border-error/20 rounded-xl px-4 py-3">{pdfError}</p>
              )}
              <button onClick={downloadPDF} className="w-full flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-primary-dim to-primary rounded-xl font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
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