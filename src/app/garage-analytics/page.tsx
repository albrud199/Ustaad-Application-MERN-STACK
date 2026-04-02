import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Garage Analytics | Ustaad" };

export default function GarageAnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-8 max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Header & Period Selector */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
                <h1 className="text-5xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">
                    Garage <span className="text-primary">Insights</span>
                </h1>
                <p className="text-on-surface-variant max-w-xl text-lg font-[family-name:var(--font-body)]">Performance analysis and booking intelligence for your service hub.</p>
            </div>
            <div className="flex items-center p-1 bg-surface-container-high rounded-xl border border-outline-variant/20">
                <button className="px-6 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 transition-colors">This Month</button>
                <button className="px-6 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">This Year</button>
                <button className="px-6 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Custom</button>
            </div>
        </header>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Bookings */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-primary">calendar_today</span>
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant tracking-wider uppercase font-[family-name:var(--font-label)]">Bookings</span>
                </div>
                <div className="flex flex-col relative z-10">
                    <span className="text-3xl font-bold font-[family-name:var(--font-headline)] mb-1 text-on-surface">1,284</span>
                    <span className="text-xs font-medium text-secondary flex items-center gap-1 font-[family-name:var(--font-body)]">
                        <span className="material-symbols-outlined text-[10px]">arrow_upward</span> +12.5% vs last month
                    </span>
                </div>
            </div>

            {/* Revenue */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-secondary">payments</span>
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-sm">payments</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant tracking-wider uppercase font-[family-name:var(--font-label)]">Revenue</span>
                </div>
                <div className="flex flex-col relative z-10">
                    <span className="text-3xl font-bold font-[family-name:var(--font-headline)] mb-1 text-on-surface">$42,920</span>
                    <span className="text-xs font-medium text-secondary flex items-center gap-1 font-[family-name:var(--font-body)]">
                        <span className="material-symbols-outlined text-[10px]">arrow_upward</span> +8.2% vs last month
                    </span>
                </div>
            </div>

            {/* Avg Ticket */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-tertiary">confirmation_number</span>
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-sm">confirmation_number</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant tracking-wider uppercase font-[family-name:var(--font-label)]">Avg Ticket</span>
                </div>
                <div className="flex flex-col relative z-10">
                    <span className="text-3xl font-bold font-[family-name:var(--font-headline)] mb-1 text-on-surface">$148.50</span>
                    <span className="text-xs font-medium text-error flex items-center gap-1 font-[family-name:var(--font-body)]">
                        <span className="material-symbols-outlined text-[10px]">arrow_downward</span> -2.1% vs last month
                    </span>
                </div>
            </div>

            {/* Ratings */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-primary-fixed">star</span>
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 flex items-center justify-center text-primary-fixed">
                        <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant tracking-wider uppercase font-[family-name:var(--font-label)]">Ratings</span>
                </div>
                <div className="flex flex-col relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl font-bold font-[family-name:var(--font-headline)] text-on-surface">4.92</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-secondary flex items-center gap-1 font-[family-name:var(--font-body)]">
                        <span className="material-symbols-outlined text-[10px]">trending_up</span> +0.05 increase
                    </span>
                </div>
            </div>

        </section>

        {/* Bento Grid Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Revenue Trend Graph */}
            <div className="lg:col-span-8 glass-card p-8 rounded-3xl flex flex-col border border-outline-variant/15">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Revenue Trend</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant font-[family-name:var(--font-body)]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div> Projected
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-secondary"></div> Actual
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex items-end gap-2 min-h-[300px] relative">
                    <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-outline-variant/10">
                        <div className="w-full h-px bg-outline-variant/5"></div>
                        <div className="w-full h-px bg-outline-variant/5"></div>
                        <div className="w-full h-px bg-outline-variant/5"></div>
                        <div className="w-full h-px bg-outline-variant/5"></div>
                    </div>
                    
                    {/* Simulated Bars */}
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg transition-all duration-700 h-[45%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[35%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Mon</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[55%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[48%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Tue</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[65%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[62%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Wed</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[40%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[30%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Thu</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[85%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[80%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Fri</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[95%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[88%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Sat</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center group relative z-10">
                        <div className="w-full bg-primary/20 rounded-t-lg h-[30%]"></div>
                        <div className="w-full bg-secondary rounded-t-lg h-[25%] -mt-4 relative z-10 group-hover:brightness-110"></div>
                        <span className="mt-4 text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Sun</span>
                    </div>
                </div>
            </div>

            {/* Booking Sources (Donut Chart representation) */}
            <div className="lg:col-span-4 glass-card p-8 rounded-3xl flex flex-col border border-outline-variant/15">
                <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] mb-8 text-on-surface">Booking Sources</h3>
                <div className="flex-grow flex items-center justify-center relative">
                    <div className="w-48 h-48 rounded-full border-[12px] border-primary flex items-center justify-center relative bg-surface-container-lowest/50 shadow-inner">
                        <div className="absolute inset-0 rounded-full border-[12px] border-secondary border-l-transparent border-b-transparent rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-[12px] border-tertiary border-l-transparent border-t-transparent border-r-transparent -rotate-12"></div>
                        <div className="text-center">
                            <span className="block text-3xl font-bold font-[family-name:var(--font-headline)] text-on-surface">84%</span>
                            <span className="text-[10px] uppercase text-on-surface-variant tracking-widest font-bold font-[family-name:var(--font-label)]">App-Based</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-4 font-[family-name:var(--font-body)]">
                    <div className="flex justify-between items-center text-on-surface">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-sm">Ustaad App</span>
                        </div>
                        <span className="font-bold">62%</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-secondary"></div>
                            <span className="text-sm">Web Portal</span>
                        </div>
                        <span className="font-bold">22%</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                            <span className="text-sm">Direct / Walk-in</span>
                        </div>
                        <span className="font-bold">16%</span>
                    </div>
                </div>
            </div>

            {/* Top Parking Spaces */}
            <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-outline-variant/15">
                <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] mb-6 text-on-surface">Top Parking Spaces</h3>
                <div className="space-y-6">
                    
                    <Link href="/parking-details" className="flex items-center gap-4 group p-2 hover:bg-surface-container-high rounded-xl transition-colors">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwJccLKYrvL6dEdsQhQWuwtDAHwRe1KkN4FPJSPVok641AG6m_VgdyKeCweRHjRLC3gRM6UgekLz4LF-LFLwpkK9AFogTxwAaXbIwqXlZk3nwKhds-TqtMM2UJzLmXDmVKwMmieBBnzuuPEW_AQ0uBpuWpaDcpdVA7Li7EIwVt4439_IuUcgVnoaVtehOnu8hqMHRZ543zPtUozqOhIYzPGJqQ6UxSxjggB95OsCUg01_SrMRpAEhxFLW4_5RhsTJq_QydHG7qF64" alt="Parking" width={56} height={56} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold text-on-surface font-[family-name:var(--font-headline)] border-b border-transparent group-hover:border-on-surface inline-block">Level 1 - Alpha Section</h4>
                            <p className="text-xs text-on-surface-variant font-[family-name:var(--font-body)]">98% occupancy this month</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-primary font-[family-name:var(--font-headline)]">$4,200</span>
                            <span className="text-[10px] uppercase text-on-surface-variant font-[family-name:var(--font-label)] font-bold">Earned</span>
                        </div>
                    </Link>

                    <Link href="/parking-details" className="flex items-center gap-4 group p-2 hover:bg-surface-container-high rounded-xl transition-colors">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9QFtXkrkT6Q3JX8jeuKUQS1BYvf3chNVuk1UF2yrAz_I1W1Sk-9DHh6EDEdFQIZ1khYcCKnqbOLRU6r0m40gc-DRzjxVL5lKaSIBu7JlACf4pvRMc4UwUYRyxIdXJ1t7zWexb9qsU2oSrzQly1L7e6FGLaxC7FeS6PoGIbuxSdWgbLlZkniyzsH57Ee1Q0fh-BckmB5lVRb28IFWWe_kRuZ-tDDSOf6XVwJDPTdVRzGU377dl3RmucDjXvnFDwPdDk25evK2aezg" alt="Parking" width={56} height={56} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold text-on-surface font-[family-name:var(--font-headline)] border-b border-transparent group-hover:border-on-surface inline-block">EV Charging Hub</h4>
                            <p className="text-xs text-on-surface-variant font-[family-name:var(--font-body)]">85% occupancy this month</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-primary font-[family-name:var(--font-headline)]">$3,850</span>
                            <span className="text-[10px] uppercase text-on-surface-variant font-[family-name:var(--font-label)] font-bold">Earned</span>
                        </div>
                    </Link>

                    <Link href="/parking-details" className="flex items-center gap-4 group p-2 hover:bg-surface-container-high rounded-xl transition-colors">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgAjDg32Fj4GlC0MZh-K2spydPonxBjU7Z6-fwidMckAI-c41iJ3zYIe47vx4Q0npjpGISAjiY1KfPqKpR3i_dxECECn5K0hhCVpkHcCWM_gEYhcPzP3POoPAgce0ku1e19uGY_P9ban-VrRQC_nezEfZuew-i-H6gStKRGhGovKuW2K_Dppah12a8LWygvy7sND-XtbtZD-dALzgP67UmLB7NoRiCijGWuZIA1FR7z-bawUDY-6uy_gn9ACVUo8UQ9ivWIG8DQwk" alt="Parking" width={56} height={56} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold text-on-surface font-[family-name:var(--font-headline)] border-b border-transparent group-hover:border-on-surface inline-block">Rooftop Premium</h4>
                            <p className="text-xs text-on-surface-variant font-[family-name:var(--font-body)]">72% occupancy this month</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-primary font-[family-name:var(--font-headline)]">$2,900</span>
                            <span className="text-[10px] uppercase text-on-surface-variant font-[family-name:var(--font-label)] font-bold">Earned</span>
                        </div>
                    </Link>

                </div>
            </div>

            {/* Customer Feedback */}
            <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-outline-variant/15">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Recent Feedback</h3>
                    <button className="text-sm font-medium text-primary hover:underline font-[family-name:var(--font-body)]">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10 relative hover:border-primary/30 transition-colors cursor-default">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <span className="text-[10px] font-medium text-on-surface-variant font-[family-name:var(--font-body)] uppercase tracking-widest">2 hours ago</span>
                        </div>
                        <p className="text-sm italic text-on-surface/90 mb-4 line-clamp-3 font-[family-name:var(--font-body)] leading-relaxed">
                            "Exceptional service at the Alpha section. The security team was helpful and the lighting made me feel safe late at night."
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="w-8 h-8 rounded-full bg-primary-dim text-white flex items-center justify-center text-[10px] font-bold shadow-md">JD</div>
                            <span className="text-xs font-semibold text-on-surface">Julianna Doe</span>
                        </div>
                    </div>

                    <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10 relative hover:border-primary/30 transition-colors cursor-default">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-on-surface-variant text-xs">star</span>
                            </div>
                            <span className="text-[10px] font-medium text-on-surface-variant font-[family-name:var(--font-body)] uppercase tracking-widest">5 hours ago</span>
                        </div>
                        <p className="text-sm italic text-on-surface/90 mb-4 line-clamp-3 font-[family-name:var(--font-body)] leading-relaxed">
                            "EV chargers worked perfectly. It would be great to have a small waiting area with coffee though."
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="w-8 h-8 rounded-full bg-secondary-dim text-white flex items-center justify-center text-[10px] font-bold shadow-md">MS</div>
                            <span className="text-xs font-semibold text-on-surface">Marcus Smith</span>
                        </div>
                    </div>

                </div>
            </div>

        </section>

      </main>
      <Footer />
    </div>
  );
}
