'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";



export default function BookingConfirmationPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("ustaad_logged_in") === "true";
      if (!loggedIn) {
        router.push("/login");
        return;
      }
      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <NebulaBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary/30 text-on-surface">
      <NebulaBackground />
      
      {/* Intentionally omitting Navbar for "Focused Success Journey" as per design notes */}

      <main className="flex-1 pt-12 pb-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Success Header Section */}
        <div className="text-center mb-16 mt-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-primary-dim to-secondary mb-8 shadow-[0_0_40px_rgba(163,166,255,0.3)]">
                <span className="material-symbols-outlined text-5xl text-on-primary-fixed font-bold">check</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-primary">
                Booking Confirmed
            </h1>
            <p className="text-on-surface-variant text-lg">Your orbital slot is secured. Access details below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Summary Left Column */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Primary Ticket Card */}
                <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 relative overflow-hidden bg-surface-variant/30 backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Reservation ID</span>
                            <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">BOOK-2026-00245</h2>
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
                                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Space Name</p>
                                    <p className="text-lg font-semibold text-on-surface mt-1">Stellar Plaza - Zone A7</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary">directions_car</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Vehicle info</p>
                                    <p className="text-lg font-semibold text-on-surface mt-1">Tesla Model S • K-502-TR</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary">schedule</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Duration (4 hours)</p>
                                    <p className="text-lg font-semibold italic text-on-surface mt-1">14:00 - 18:00 (Today)</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Date</p>
                                    <p className="text-lg font-semibold text-on-surface mt-1">October 24, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 bg-surface-variant/30 backdrop-blur-xl">
                    <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-6 text-on-surface">Pricing Breakdown</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span>Base Rate (4.0 x $15.00/hr)</span>
                            <span className="font-mono">$60.00</span>
                        </div>
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span>Orbital Platform Fee</span>
                            <span className="font-mono">$2.45</span>
                        </div>
                        <div className="flex justify-between items-center text-tertiary">
                            <span>Voucher Discount (CELESTIAL20)</span>
                            <span className="font-mono">-$12.00</span>
                        </div>
                        <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                            <span className="text-lg font-bold text-on-surface">Total Amount Paid</span>
                            <span className="text-2xl font-[family-name:var(--font-headline)] font-extrabold text-primary">$50.45</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Right Column */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* QR Code Card */}
                <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 text-center flex flex-col items-center bg-surface-variant/30 backdrop-blur-xl">
                    <p className="text-sm font-bold text-primary mb-6 uppercase tracking-tighter">Digital Check-in Key</p>
                    <div className="p-4 bg-white rounded-2xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <div className="w-48 h-48 bg-black relative flex items-center justify-center">
                            {/* Placeholder for QR Code */}
                            <span className="text-white">QR CODE</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-sm px-4">
                        Present this QR code at the entrance scanner to unlock your reserved space.
                    </p>
                </div>

                {/* Action Sidebar */}
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-primary-dim to-primary rounded-xl font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined">picture_as_pdf</span> Download PDF
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 h-14 bg-surface-container-highest border border-outline-variant/30 rounded-xl font-bold text-on-surface hover:bg-surface-variant transition-all">
                        <span className="material-symbols-outlined">print</span> Print
                    </button>
                    <button onClick={() => router.push("/dashboard")} className="w-full flex items-center justify-center gap-3 h-14 mt-8 text-on-surface-variant hover:text-primary transition-all group">
                        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>

        {/* Support Anchor */}
        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 py-4 px-8 rounded-full bg-surface-container-low border border-outline-variant/10">
                <span className="text-on-surface-variant text-sm">Need help with your booking?</span>
                <Link href="/help" className="text-tertiary font-bold hover:underline">Contact Ground Control</Link>
            </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
