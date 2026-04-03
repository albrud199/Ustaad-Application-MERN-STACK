"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MyBookingsContent() {
  const [activeTab, setActiveTab] = useState<"Active" | "Upcoming" | "Past">("Active");

  const getTabButtonClasses = (tab: "Active" | "Upcoming" | "Past") =>
    `px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(163,166,255,0.3)] shrink-0 ${
      activeTab === tab
        ? "bg-primary-fixed text-on-primary-fixed"
        : "glass-card text-on-surface hover:bg-surface-container-highest"
    }`;

  return (
    <>
      {/* Tabbed Navigation */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
        <button onClick={() => setActiveTab("Active")} className={getTabButtonClasses("Active")}>
          Active
        </button>
        <button onClick={() => setActiveTab("Upcoming")} className={getTabButtonClasses("Upcoming")}>
          Upcoming
        </button>
        <button onClick={() => setActiveTab("Past")} className={getTabButtonClasses("Past")}>
          Past
        </button>
      </div>

      {/* Booking List Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === "Active" && (
            <div className="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden border border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtNKLctsxMcamNRfBpNrhXWZUoNRKAGwRUzGIB5BfHw4mupF_FJCkbHLrK7VGTRmg2o_ByYr95kCdNLVWv-WiwNHLdKOcgn6OwFXK80GJf9b_P64ZHySrlzmSFpTasQfnNV_f5rCZJH5Q48J-8mjiyGawzMLULUpQ3j1NMUAYx9D8nC9_Z7jNGwSExKVAgqrUEM2B7E4sfLDWoeoBd24hD1naLcUwVfPZ1GSyy8IV-Knp4K-horTVl3wjPDyPDwSPVWv50o-iP58I" 
                  alt="Parking" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Zenith Executive Suite</h3>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Active</span>
                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-on-surface-variant mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <span className="text-sm">Today, Oct 24</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span className="text-sm">09:00 AM - 05:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      <span className="text-sm font-semibold text-on-surface">$120.00 Total</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-primary-dim text-white font-medium hover:brightness-110 active:scale-95 transition-all">Extend</button>
                  <Link href="/parking-details" className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-all">View Details</Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Upcoming" && (
            <div className="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden opacity-90 hover:opacity-100 transition-opacity border border-outline-variant/10">
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDshvPhzqIpe-t6OyqYpeash4OeYtb79Gm_PzBq2u3az8SHqjVqs0dGydn4NDc8L055qS7sIgJdl-68XbBfEVumsX5drjI0Hp8NlwA_Rwbjmn2m4n8M18WctN58_XrJH_Hw_hLalC-jK5qW5aFMCd7xLzSQz_oyajdVkuuD4e5bVJRg9XykPyhAjbYIB7TN_UaHuZMlsFcqAgxlnZEvXReKuGUnsRJORXFQ48fNBbLZuRa5u1B73MhpGO6Eea1pGyje_rUD8lDFg3Y" 
                  alt="EV Port" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Level 4 Secure EV Port</h3>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Confirmed</span>
                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-on-surface-variant mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <span className="text-sm">Oct 26, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span className="text-sm">02:00 PM - 06:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      <span className="text-sm font-semibold text-on-surface">$45.00 Total</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-all">View Details</button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-error/30 text-error hover:bg-error/10 active:scale-95 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Past" && (
            <div className="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-500 border border-outline-variant/10">
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWd0C_oWOThOScRhIzqI2ADNdHEZHUUqdeM4nXKk-6rCdJLxzng-22nZj7HbZmlbZHpMFWukQu9VTUHm8vbJloFJxMcVUUtgCDZJ0uqxK9yn9SduPP5blDfEmohXRKD_jJIwSLYKmxGTjGK3o2bAKhm1Dm6fDpyojOpSPCTvEuo8DWtz7fPoEBrSP7AuMT1GrEqEsbsCARlFnPp7KW14ebY1yw5R5fpYaIfFtfKNWfjfymyj9J_kuv-MtZuZ3ulPsoZNhbBiADihk" 
                  alt="Past Booking" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Nebula Meeting Pod B</h3>
                    <span className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Completed</span>
                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-on-surface-variant mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <span className="text-sm">Oct 20, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span className="text-sm">11:00 AM - 01:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      <span className="text-sm font-semibold text-on-surface">$80.00 Total</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-medium hover:brightness-110 active:scale-95 transition-all">Leave Review</button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-all">View Details</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Stats */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-indigo-500 relative overflow-hidden">
            <h4 className="font-[family-name:var(--font-headline)] font-bold text-lg mb-4 text-on-surface">Booking Velocity</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Total Bookings</span>
                <span className="text-xl font-bold text-primary">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Hours Logged</span>
                <span className="text-xl font-bold text-secondary">142h</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-primary h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
              </div>
              <p className="text-xs text-on-surface-variant">65% of your goal reached this month.</p>
            </div>
          </div>

          {/* Assistance Card */}
          <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>help</span>
            <h4 className="font-[family-name:var(--font-headline)] font-bold text-lg mb-2 text-on-surface">Need a pilot?</h4>
            <p className="text-sm text-on-surface-variant mb-6">Our mission control is available 24/7 to-help with reservation adjustments.</p>
            <Link href="/help" className="w-full block text-center py-2.5 rounded-lg bg-surface-container-highest text-primary font-semibold hover:bg-primary-container/20 transition-all border border-primary/20">Contact Radar</Link>
          </div>
        </div>
      </div>
    </>
  );
} // End of MyBookingsContent component 