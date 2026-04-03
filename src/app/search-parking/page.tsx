"use client";

import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import AuthGateButton from "@/components/AuthGateButton";
import Link from "next/link";
import Image from "next/image";
import AuthBookingButton from "@/components/AuthBookingButton";

export default function SearchParkingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />
      
      <main className="pt-[80px] flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative z-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-[360px] bg-surface-variant/40 backdrop-blur-3xl border-r border-outline-variant/15 p-6 overflow-y-auto flex flex-col gap-8 z-40">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface tracking-tight">Navigation Filters</h2>
            <button className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-primary hover:text-primary-container transition-colors">Reset All</button>
          </div>

          {/* Filter Group: Location */}
          <div className="flex flex-col gap-3">
            <label className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Destination</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">location_on</span>
              <input type="text" placeholder="Central District, Nebula City" className="w-full bg-surface-container-highest/50 border border-outline-variant/15 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary transition-all text-on-surface" />
            </div>
          </div>

          {/* Filter Group: Schedule */}
          <div className="flex flex-col gap-3">
            <label className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Time Interval</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xs">event</span>
                <input type="text" defaultValue="Oct 24, 2024" className="w-full bg-surface-container-highest/50 border border-outline-variant/15 rounded-xl py-2.5 pl-9 pr-2 text-xs focus:outline-none focus:border-primary transition-all text-on-surface" />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xs">schedule</span>
                <input type="text" defaultValue="14:00 - 18:00" className="w-full bg-surface-container-highest/50 border border-outline-variant/15 rounded-xl py-2.5 pl-9 pr-2 text-xs focus:outline-none focus:border-primary transition-all text-on-surface" />
              </div>
            </div>
          </div>

          {/* Filter Group: Vehicle */}
          <div className="flex flex-col gap-3">
            <label className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Vehicle Specs</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-xs font-medium border border-primary/20">Standard Sedan</button>
              <button className="px-4 py-2 bg-surface-container-highest/50 text-on-surface-variant rounded-full text-xs font-medium border border-outline-variant/15 hover:border-primary/40 transition-all">SUV / Truck</button>
              <button className="px-4 py-2 bg-surface-container-highest/50 text-on-surface-variant rounded-full text-xs font-medium border border-outline-variant/15 hover:border-primary/40 transition-all">EV Only</button>
            </div>
          </div>

          {/* Filter Group: Price Range */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Price Velocity</label>
              <span className="text-xs text-primary font-medium">$12 - $45/hr</span>
            </div>
            <div className="relative h-1.5 w-full bg-surface-container-highest rounded-full">
              <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-on-surface border-2 border-primary rounded-full shadow-lg cursor-pointer"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-on-surface border-2 border-primary rounded-full shadow-lg cursor-pointer"></div>
            </div>
          </div>

          {/* Filter Group: Amenities */}
          <div className="flex flex-col gap-4">
             <label className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Atmospheric Amenities</label>
             <div className="space-y-3">
               <label className="flex items-center gap-3 cursor-pointer group">
                 <div className="w-5 h-5 rounded border border-outline-variant/30 group-hover:border-primary transition-colors flex items-center justify-center">
                   <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                 </div>
                 <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">EV Charging Portals</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                 <div className="w-5 h-5 rounded border border-outline-variant/30 group-hover:border-primary transition-colors flex items-center justify-center"></div>
                 <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">24/7 Kinetic Security</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                 <div className="w-5 h-5 rounded border border-outline-variant/30 group-hover:border-primary transition-colors flex items-center justify-center">
                   <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                 </div>
                 <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Automated Valet</span>
               </label>
             </div>
          </div>

          <button className="mt-auto w-full py-4 bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold rounded-xl shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
              Search Constellations
          </button>
        </aside>

        {/* Main Workspace Area */}
        <section className="flex-1 relative flex flex-col md:flex-row">
          {/* Map View Container */}
          <div className="flex-1 relative min-h-[400px] bg-[#0B0E14]">
             {/* Map overlays and pins */}
             <div className="absolute top-[30%] left-[45%] group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                    <div className="relative w-8 h-8 bg-primary rounded-full border-2 border-on-surface flex items-center justify-center text-on-primary-fixed font-bold text-xs shadow-[0_0_15px_rgba(163,166,255,0.6)]">
                        $15
                    </div>
                </div>
            </div>
            <div className="absolute top-[60%] left-[20%] group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center">
                    <div className="relative w-8 h-8 bg-surface-container-highest border-2 border-primary/40 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                        $22
                    </div>
                </div>
            </div>

            {/* Map Overlay Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex bg-surface-container-highest/90 backdrop-blur-md rounded-2xl p-1 shadow-2xl border border-outline-variant/20">
                <button className="px-6 py-2.5 bg-primary text-on-primary-fixed rounded-xl text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">map</span> Map
                </button>
                <button className="px-6 py-2.5 text-on-surface-variant hover:text-on-surface rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-sm">list</span> List
                </button>
            </div>
          </div>

          {/* List View Sidebar */}
          <div className="w-full md:w-[440px] bg-surface-variant/40 backdrop-blur-3xl border-l border-outline-variant/15 flex flex-col z-30 h-full">
            <div className="p-6 border-b border-outline-variant/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-[family-name:var(--font-headline)] font-bold text-lg">Foundations (12)</h3>
                <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                  <span>Sort:</span>
                  <button className="text-primary font-medium flex items-center">Relevance <span className="material-symbols-outlined text-sm">expand_more</span></button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Listing Cards */}
              {[
                { name: "Aether Plaza Parking", price: "$15", distance: "0.4 miles away", rating: "4.9", revs: "(128 reviews)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGjjNikX3OKMzzLx9yswbBgSwTiJwwKX8K4kegu6KFxSZMQ7Bt2waxY1zGViKP3neeo6z4gIEoWXURMY1Yl7wM65og-cTxUrZRKTV_SgB39M2EC9ybYCEW7dam7TAU3oY1NfOJ9bTfgPj8lX-zI0DPPQz1KYMwId2cgP8GeP2TVkJBx9Cp7vDzdxywGCqv5CO8gdfb-igfHUVEg-T_SFnOuPCU8ru0WhqCIEMitq1K-rC65mFxYeAM8I9NOKWGorjLUxiuldeIwLc" },
                { name: "Nebula Heights Valet", price: "$22", distance: "0.9 miles away", rating: "4.7", revs: "(84 reviews)", badge: "Live Now", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtQJi4tawBMwRtYT-Ucd36WLcDL5Yfhwd_p4awkd_ec1YPbf7gKkevwN6pXPno5co6D43x2TmgWK2k_EvHQpJbRQrTKaE6LdpCzd0HAgEpW6Sljov2tMDsWwDaJZsWAOKuZTUjx95Ug97NsK5SAn5Frpj-vXJJ4UPCDLyXj_innCpACXhYlBx5iY8SRqxZLb_oRkDrjFNVbQW5lNIhaTbGi79uX8PVvQ5nYYgk5P1DAjkJrYQMb35es-JMbe7mTeuJWLTVR4KRw5s" },
                { name: "Zenith Under-Docks", price: "$12", distance: "1.2 miles away", rating: "4.5", revs: "(215 reviews)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-w5IMCEqd2sdOUxfTmlMwaerP4rNQ0KKA946DH1Nas7xo61e-mUbRdEggOtEzxxPNZZtc1Z3sODDCUqHvDzn95Y80MzrX8EPztxn-4bnidl-xSy9OzDpW1bWjY5wgraQLVWeZlI83gBlZg_lhkrMiYKXdbo2X4mdeSEdxSzdWltwtyJAsxNqN635hkiUjPHv56grY1TMCkun0jj40g1c_-KZ6MJUWEaZm8-CiTPSicMUPA_trOHNohnxA_e43hvbudhHZ2tOyNIo" },
              ].map((listing, i) => (
                <div key={i} className="group p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 relative">
                      <Image src={listing.img} alt="Parking spot" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-on-surface truncate pr-2">{listing.name}</h4>
                        <div className="text-right">
                          <div className="text-primary font-bold text-lg leading-none">{listing.price}<span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-tighter ml-0.5">/hr</span></div>
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">near_me</span> {listing.distance}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-0.5 bg-secondary-container/20 px-1.5 py-0.5 rounded text-[10px] text-secondary font-bold">
                              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {listing.rating}
                          </div>
                          <span className="text-[10px] text-on-surface-variant">{listing.revs}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                      <Link href="/parking-details" className="flex-1 py-2 bg-surface-container-highest flex justify-center text-on-surface rounded-lg text-xs font-bold hover:bg-surface-bright transition-colors">Details</Link>
                      <AuthGateButton
                        href="/checkout"
                        returnTo="/search-parking"
                        className="flex-1 py-2 bg-primary-dim text-white rounded-lg text-xs font-bold hover:bg-primary transition-colors"
                      >
                        Book Spot
                      </AuthGateButton>
                  </div>
                  {listing.badge && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-secondary text-on-secondary rounded-full text-[8px] font-black uppercase tracking-widest">{listing.badge}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
