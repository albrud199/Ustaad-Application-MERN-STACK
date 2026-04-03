"use client";

import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("ustaad_logged_in") === "true";
    if (!loggedIn) {
      router.replace(`/login?returnTo=${encodeURIComponent("/checkout")}`);
    } else {
      setIsAuthed(true);
    }
    setIsChecking(false);
  }, [router]);

  // Show nothing while checking auth / redirecting
  if (isChecking || !isAuthed) {
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
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <NebulaBackground />
      
      {/* Checkout Navbar - Focused task header */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-on-surface-variant hover:text-primary active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary mr-2 to-secondary font-[family-name:var(--font-headline)]">Ustaad</h1>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/help-support" className="text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-body)] text-sm">Support</Link>
                    <Link href="/security-password" className="text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-body)] text-sm">Security</Link>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    <span className="material-symbols-outlined text-primary">lock</span>
                </div>
            </div>
        </div>
      </nav>

      <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Payment Details */}
            <div className="lg:col-span-7 space-y-10">
                <header>
                    <h2 className="text-4xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface mb-2">Complete Checkout</h2>
                    <p className="text-on-surface-variant">Secure your booking with Ustaad&apos;s celestial tier protection.</p>
                </header>

                {/* Payment Method Selection */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Select Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label className="relative cursor-pointer group">
                            <input type="radio" name="payment_method" className="peer sr-only" defaultChecked />
                            <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                                <span className="text-sm font-semibold text-on-surface">Credit Card</span>
                            </div>
                        </label>
                        <label className="relative cursor-pointer group">
                            <input type="radio" name="payment_method" className="peer sr-only" />
                            <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform text-on-surface">account_balance</span>
                                <span className="text-sm font-semibold text-on-surface">bKash</span>
                            </div>
                        </label>
                        <label className="relative cursor-pointer group">
                            <input type="radio" name="payment_method" className="peer sr-only" />
                            <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform text-on-surface">wallet</span>
                                <span className="text-sm font-semibold text-on-surface">Nagad</span>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Credit Card Form */}
                <section className="glass-card p-8 rounded-2xl space-y-8 border border-outline-variant/15">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Card Information</h3>
                        <div className="flex gap-2 text-on-surface-variant">
                            <div className="w-8 h-5 bg-surface-container rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-[12px]">credit_card</span>
                            </div>
                            <div className="w-8 h-5 bg-surface-container rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-[12px]">payments</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Cardholder Name</label>
                            <input type="text" placeholder="ALEXANDER VANGUARD" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline font-[family-name:var(--font-headline)] uppercase tracking-tight text-on-surface" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Card Number</label>
                            <div className="relative">
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline font-[family-name:var(--font-headline)] text-on-surface" />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">lock</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Expiry Date</label>
                                <input type="text" placeholder="MM/YY" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline font-[family-name:var(--font-headline)] text-on-surface" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">CVV</label>
                                <input type="password" placeholder="123" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline font-[family-name:var(--font-headline)] text-on-surface" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Your transaction is protected by 256-bit AES encryption. Ustaad never stores your full card credentials on our servers.</p>
                    </div>
                </section>
            </div>

            {/* Right Column: Summary & Promo border */}
            <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                
                {/* Order Summary Card */}
                <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-outline-variant/15">
                    <div className="p-8 space-y-8">
                        <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Order Summary</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5MyERuhhUeEWktNH-Nz_0EZM9cgAJaH9-jyAZCdnoACvps8NzvDwpE7VKVswnJqdSFp8qnogAvOFVaH_DkqLvitKWQhTDrtGm849oJwWoEXDFtmu-G5DzJZlEjbyXAeQTTzx94qtZgJNr3_G0W8wjDZCvoGXTjemLjUckJ_akAZAlWCtCKb_a-iprNyHnn4ricoUiTddRkJpu65wmF72dCiBrF7yZVDJBGJRqG-q3CPSndlpd6cIsR7HzZ4-kP4eqmIKFC0A4vfw" alt="Premium Suite" fill className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-on-surface">Premium Celestial Suite</p>
                                    <p className="text-xs text-on-surface-variant">Booking #UST-8829</p>
                                </div>
                                <p className="font-bold text-on-surface">$2,450</p>
                            </div>

                            <div className="h-px bg-outline-variant/20"></div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Subtotal</span>
                                    <span className="text-on-surface font-semibold">$2,450.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Service Tax (5%)</span>
                                    <span className="text-on-surface font-semibold">$122.50</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Ustaad Fee</span>
                                    <span className="text-on-surface font-semibold">$15.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="space-y-2 mt-8">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Promo Code</label>
                            <div className="flex gap-2">
                                <input type="text" placeholder="ENTER CODE" className="flex-grow bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline font-[family-name:var(--font-headline)] uppercase text-sm text-on-surface" />
                                <button className="px-6 py-3 bg-surface-container-high rounded-xl text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/20">Apply</button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-primary/20">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Total Payable</p>
                                    <p className="text-3xl font-black font-[family-name:var(--font-headline)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">$2,587.50</p>
                                </div>
                                <span className="material-symbols-outlined text-primary opacity-50 text-5xl animate-pulse">auto_awesome</span>
                            </div>
                            <Link href="/booking-confirmation" className="w-full block text-center py-5 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold text-lg rounded-2xl shadow-[0_10px_30px_rgba(163,166,255,0.2)] hover:scale-105 active:scale-95 transition-all">
                                <span className="flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
                                    Pay $2,587.50
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-on-surface">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                    <span className="material-symbols-outlined text-4xl">shield_with_heart</span>
                    <span className="material-symbols-outlined text-4xl">security</span>
                </div>

            </aside>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-outline-variant/10 mt-auto bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                <Link href="/terms-conditions" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link>
            </div>
            <p className="text-xs text-on-surface-variant font-medium">© 2024 Ustaad Technologies. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
