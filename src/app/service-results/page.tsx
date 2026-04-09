"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGateButton from "@/components/AuthGateButton";
import Image from "next/image";

export default function ServiceResultsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      
      {/* Ambient Background Orbs */}
      <div className="fixed w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -top-48 -left-48 -z-10 pointer-events-none"></div>
      <div className="fixed w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full bottom-0 right-0 -z-10 pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold font-[family-name:var(--font-headline)] tracking-tighter text-on-surface mb-4">
            Nearby <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Garages</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-[family-name:var(--font-body)]">
            Find verified automotive experts within your immediate orbit. Sorted by proximity and real-time response capability.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 font-[family-name:var(--font-body)]">
            <div className="glass-card rounded-xl p-6 lg:sticky lg:top-28 border border-outline-variant/15 shadow-md">
              <div className="flex items-center gap-2 mb-8 border-b border-outline-variant/10 pb-4">
                <span className="material-symbols-outlined text-primary">tune</span>
                <h2 className="font-[family-name:var(--font-headline)] font-bold text-lg">Filters</h2>
              </div>

              {/* Service Type */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold tracking-widest text-outline uppercase mb-4 font-[family-name:var(--font-label)]">Service Type</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded bg-surface border-outline-variant text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary" />
                    <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Emergency Repair</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-surface border-outline-variant text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary" />
                    <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Routine Maintenance</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded bg-surface border-outline-variant text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary" />
                    <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Body Work</span>
                  </label>
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold tracking-widest text-outline uppercase mb-4 font-[family-name:var(--font-label)]">Budget Range</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg border border-outline-variant hover:border-primary text-on-surface transition-all">Budget</button>
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg bg-primary-container text-on-primary-container shadow-sm border border-primary/20">Mid</button>
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg border border-outline-variant hover:border-primary text-on-surface transition-all">Premium</button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold tracking-widest text-outline uppercase mb-4 font-[family-name:var(--font-label)]">Minimum Rating</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant font-medium">4.5+ Stars</span>
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <input type="range" className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary border border-outline-variant/10 shadow-inner" defaultValue={80} />
                </div>
              </div>

              <button className="w-full mt-4 py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_4px_15px_rgba(163,166,255,0.4)] hover:bg-primary-dim transition-all active:scale-95 text-sm font-[family-name:var(--font-headline)] tracking-wider">
                Apply Adjustments
              </button>
            </div>
          </aside>

          {/* Results Content */}
          <div className="flex-1 space-y-6 font-[family-name:var(--font-body)]">
            
            {/* Result Card 1 */}
            <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(163,166,255,0.15)] transition-all duration-500 flex flex-col md:flex-row border border-outline-variant/15 md:h-56">
              <div className="relative w-full md:w-64 h-48 md:h-full overflow-hidden shrink-0">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQv1gdu0lrVe8XiO9SGpWmfRqvlUQCTPvrHuolzwbTMnhCixyvFNstQ2czeuuZ_aBBD0ghDAQp4vXJWk3hQz4CJ3xM4M03FYJcKS0KZGzsc1GOf68bvVlGAe_4pa-TAYMIWccyVHOWM84OSx9Ca-1jkhLrrxbItNjUm-0rjPRmUUMY2ht6c7e8KJG2Qt1bxPhZ3Oh1W7X3DTHV62qPMf-ygHg_a5vHyUONx3tsLRYANyQUcaLSCv4yOAQPoyDNBZX96X_YtTPqy24" 
                  alt="Garage" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-secondary/20">Featured</span>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl md:text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface line-clamp-1">Hyperion Performance Lab</h3>
                    <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded-lg shrink-0 border border-outline-variant/10">
                      <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    0.8 miles away • Downtown Hub
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Response</span>
                      <span className="text-on-surface font-semibold">&lt; 15 mins</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Pricing</span>
                      <span className="text-on-surface font-semibold">$$$ - Premium</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Capacity</span>
                      <span className="text-on-surface font-semibold text-primary">High Priority</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-outline-variant/10 border-dashed">
                  <span className="text-on-surface-variant text-sm italic">&quot;Specialists in electric powertrains and luxury tuning.&quot;</span>
                  <AuthGateButton
                    href="/request-service"
                    returnTo="/service-results"
                    className="w-full md:w-auto bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-sm text-sm border border-primary/20 shrink-0"
                  >
                    Select
                  </AuthGateButton>
                </div>
              </div>
            </div>

            {/* Result Card 2 */}
            <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(163,166,255,0.15)] transition-all duration-500 flex flex-col md:flex-row border border-outline-variant/15 md:h-56">
              <div className="relative w-full md:w-64 h-48 md:h-full overflow-hidden shrink-0">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGCh6XP84qqtdTNJg5WWlsAcnsbgU-Dt9dHsf4r0ju0_OhQi6EiZP5x2odNrsDwr-n151lJ9E9F3An1dcvIUHlL5zOzIBJkiQ2XrttoK24epRfG--zA19-s8FOnIKQbCknANl4MLXhv1G1ReKISXLAOnzrnXgci-Ete6vMuzbz93ESZNAuZL76j0X34L8ZOqvZMxpMgRDxctfw_m9PHjSZrrUXV1cT6OMmsKq-eEsoLy9-0cGhf3ouLv1-DKv6R29InrMpsvLCvzg" 
                  alt="Garage" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl md:text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface line-clamp-1">Vantage Point Repairs</h3>
                    <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded-lg shrink-0 border border-outline-variant/10">
                      <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-sm font-bold">4.7</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    1.4 miles away • East Industrial
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Response</span>
                      <span className="text-on-surface font-semibold">30-45 mins</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Pricing</span>
                      <span className="text-on-surface font-semibold">$$ - Moderate</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Capacity</span>
                      <span className="text-on-surface font-semibold">Moderate</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-outline-variant/10 border-dashed">
                  <span className="text-on-surface-variant text-sm italic">&quot;Quick turnaround for standard parts and fluids.&quot;</span>
                  <AuthGateButton
                    href="/request-service"
                    returnTo="/service-results"
                    className="w-full md:w-auto bg-primary/10 text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-sm text-sm border border-primary/20 shrink-0"
                  >
                    Select
                  </AuthGateButton>
                </div>
              </div>
            </div>

            {/* Result Card 3 */}
            <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(163,166,255,0.15)] transition-all duration-500 flex flex-col md:flex-row border border-outline-variant/15 md:h-56">
              <div className="relative w-full md:w-64 h-48 md:h-full overflow-hidden shrink-0">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1RwVT3hBHIrYFqZ_kWdNzT7GF4N_uceRGCg93S2PHcox-TxRB3QxvhYp5o9iHPmu9782tyzMPjRJRwKaAvR9a68QZ5l8Y_bHp8pIcnSvfpHlz8UJ1Cn9Afv0Yxo9bpLj-15yX1-WJAx9gQzKOUk1sp-pyDcXzyaPGsXoprvOdsMfQW1dLljE4bqXSBfVXDW6HL26EYyIJCRAcS9I_wlqvDsZkFFy92xrC95BpUW1oDRKmeZpjMNODdGw2rNXNzRrdZPDkdE40ZAQ" 
                  alt="Garage" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl md:text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface line-clamp-1">Nebula Tech Auto</h3>
                    <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded-lg shrink-0 border border-outline-variant/10">
                      <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-sm font-bold">4.5</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    2.1 miles away • North Plaza
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Response</span>
                      <span className="text-on-surface font-semibold">1 hour</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Pricing</span>
                      <span className="text-on-surface font-semibold">$ - Value</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Capacity</span>
                      <span className="text-on-surface font-semibold">Limited</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-outline-variant/10 border-dashed">
                  <span className="text-on-surface-variant text-sm italic">&quot;Unbeatable prices for high-quality standard repairs.&quot;</span>
                  <AuthGateButton
                    href="/request-service"
                    returnTo="/service-results"
                    className="w-full md:w-auto bg-primary/10 text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-sm text-sm border border-primary/20 shrink-0"
                  >
                    Select
                  </AuthGateButton>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-8">
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] font-[family-name:var(--font-label)] group">
                Scan deeper orbits
                <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
              </button>
            </div>

          </div>
        </div>

      </main>

      <div className="relative z-20"><Footer /></div>
    </div>
  );
}
