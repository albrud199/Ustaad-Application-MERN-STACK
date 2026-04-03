import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Send Quote | Ustaad" };

export default function SendQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <header className="mb-16">
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-secondary/30 shadow-sm">Live Request</span>
                <span className="text-on-surface-variant text-sm flex items-center gap-1 font-[family-name:var(--font-body)]">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    0.8 km away
                </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-on-surface font-[family-name:var(--font-headline)]">
                Send <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Service Quote</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-[family-name:var(--font-body)]">
                Review the customer tracking request details and provide your best pricing for both general and emergency scenarios.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Request Summary */}
            <div className="lg:col-span-5 space-y-8">
                <section className="glass-card rounded-[2rem] p-8 shadow-2xl border border-outline-variant/15 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none"></div>
                    
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 font-[family-name:var(--font-headline)] text-on-surface relative z-10">
                        <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-xl">engineering</span>
                        Request Details
                    </h3>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="bg-surface-container-highest/80 p-5 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-colors">
                            <label className="text-on-surface-variant text-xs font-bold uppercase tracking-widest block mb-1 font-[family-name:var(--font-label)]">Service Type</label>
                            <p className="text-2xl font-bold text-on-surface font-[family-name:var(--font-headline)]">Engine repair</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface-container-highest/80 p-5 rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-colors">
                                <label className="text-on-surface-variant text-xs font-bold uppercase tracking-widest block mb-1 font-[family-name:var(--font-label)]">Distance</label>
                                <p className="text-xl font-bold text-on-surface font-[family-name:var(--font-headline)]">0.8 km</p>
                            </div>
                            <div className="bg-surface-container-highest/80 p-5 rounded-2xl border border-outline-variant/10 hover:border-tertiary/30 transition-colors">
                                <label className="text-on-surface-variant text-xs font-bold uppercase tracking-widest block mb-1 font-[family-name:var(--font-label)]">Priority</label>
                                <p className="text-xl font-bold text-tertiary font-[family-name:var(--font-headline)] shadow-sm">Urgent</p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden h-56 group border border-outline-variant/20">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXzL003juOJ1RdgiYBAuJb8zshl672PGWt17QjSk9QLVKyKDo3e9Id0JwmOWYIDNvgb5cxiPFAISzY_Qo78pjkuV65hGRXtZPQC756lXqmoFTf9ISddN1JCu30HHqxTuoR-IgyvOLEAz0KxDGYLEEbLt5djN1oUe4ai5qu6u-tMODgid7IgARY0WTaVK5rK-n2T4Pt4bc0x5utcKChYLg8MToJwDzav6vbtD8_Ge-Vz6Cjk0R9UQuHamQTn2Pjvy5qvTBQeM7yZI" alt="Map Route" fill className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700"></div>
                            
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-surface/80 backdrop-blur-md px-3 py-2 rounded-xl border border-outline-variant/20">
                                <div className="w-3 h-3 bg-secondary text-secondary rounded-full animate-pulse shadow-[0_0_10px_#f673b7]"></div>
                                <span className="text-xs font-bold text-white tracking-wide font-[family-name:var(--font-label)]">Customer Location</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Right Column: Quote Form */}
            <div className="lg:col-span-7">
                <form className="glass-card rounded-[2rem] p-8 md:p-12 space-y-10 shadow-2xl relative overflow-hidden border border-outline-variant/15 block" action="/service-requests">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] pointer-events-none transition-opacity"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* General Price */}
                        <div className="space-y-3">
                            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 font-[family-name:var(--font-label)]">General Service Price</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold text-xl">৳</span>
                                <input className="w-full bg-surface-container-highest/80 border border-outline-variant/20 rounded-2xl py-5 pl-12 pr-6 text-xl font-bold text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-4 focus:ring-primary/10 font-[family-name:var(--font-headline)] hover:border-outline-variant/50" placeholder="1200" type="number" defaultValue="1200" />
                            </div>
                            <p className="text-xs text-on-surface-variant ml-1 font-[family-name:var(--font-body)] italic">Standard repair during business hours</p>
                        </div>

                        {/* Emergency Price */}
                        <div className="space-y-3">
                            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 font-[family-name:var(--font-label)]">Emergency Service Price</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary font-bold text-xl">৳</span>
                                <input className="w-full bg-surface-container-highest/80 border border-outline-variant/20 rounded-2xl py-5 pl-12 pr-6 text-xl font-bold text-on-surface focus:outline-none focus:border-secondary transition-all focus:ring-4 focus:ring-secondary/10 font-[family-name:var(--font-headline)] hover:border-outline-variant/50" placeholder="1800" type="number" defaultValue="1800" />
                            </div>
                            <p className="text-xs text-on-surface-variant ml-1 font-[family-name:var(--font-body)] italic text-secondary-dim/70">24/7 priority on-site assistance</p>
                        </div>
                    </div>

                    {/* ETA */}
                    <div className="space-y-3 relative z-10">
                        <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 font-[family-name:var(--font-label)]">Estimated Arrival Time (ETA)</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-tertiary text-xl">schedule</span>
                            <input className="w-full bg-surface-container-highest/80 border border-outline-variant/20 rounded-2xl py-5 pl-14 pr-6 text-xl font-bold text-on-surface focus:outline-none focus:border-tertiary transition-all focus:ring-4 focus:ring-tertiary/10 font-[family-name:var(--font-headline)] hover:border-outline-variant/50" placeholder="e.g. 15 mins" type="text" defaultValue="15 mins" />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3 relative z-10">
                        <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 font-[family-name:var(--font-label)]">Service Notes & Inclusions</label>
                        <textarea className="w-full bg-surface-container-highest/80 border border-outline-variant/20 rounded-2xl p-6 text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-4 focus:ring-primary/10 resize-none font-[family-name:var(--font-body)] hover:border-outline-variant/50" placeholder="Mention specialized tools, spare parts included, or additional checks..." rows={4} defaultValue="Includes full diagnostic scan and 1 hour of labor. Parts not included."></textarea>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6 relative z-10 border-t border-outline-variant/10">
                        <button className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold text-xl py-6 rounded-2xl shadow-[0_10px_30px_rgba(163,166,255,0.25)] hover:shadow-[0_10px_40px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-[family-name:var(--font-headline)] tracking-wide group" type="submit">
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                            Send Quote
                        </button>
                        <div className="text-center text-on-surface-variant text-xs mt-6 font-[family-name:var(--font-body)]">
                            By sending this quote, you agree to Ustaad Service Agreements.
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
      </main>

      <Footer />
    </div>
  );
}
