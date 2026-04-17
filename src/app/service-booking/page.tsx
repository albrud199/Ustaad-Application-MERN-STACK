"use client";

import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ServiceBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const repairshop = searchParams.get("repairshop") || "Selected repair shop";
  const rating = searchParams.get("rating") || "4.8";
  const pricing = searchParams.get("pricing") || "Mid";

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

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => router.push("/dashboard/car-owner/my-bookings")} className="px-6 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-dim transition-colors">Confirm Service Request</button>
            <Link href="/service-results" className="px-6 py-4 rounded-xl border border-outline-variant/20 text-on-surface font-bold hover:bg-surface-container-high transition-colors text-center">Back to repair shops</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}