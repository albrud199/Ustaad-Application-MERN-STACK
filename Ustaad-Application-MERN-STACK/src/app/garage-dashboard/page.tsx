import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Garage Owner Dashboard | Ustaad" };

export default function GarageDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />
      
      <main className="flex-1 pt-28 pb-20 px-8 max-w-[1440px] mx-auto w-full space-y-12 relative z-10">
        {/* Hero Header & Quick Actions */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4">
            <div className="space-y-2">
                <h1 className="text-5xl font-extrabold tracking-tight text-on-surface font-[family-name:var(--font-headline)]">Garage Central</h1>
                <p className="text-on-surface-variant font-[family-name:var(--font-body)] text-lg">Managing your celestial assets across the nebula.</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <Link href="/add-parking" className="flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-semibold rounded-xl active:scale-95 transition-all shadow-[0_0_20px_rgba(147,150,255,0.3)] hover:brightness-110">
                    <span className="material-symbols-outlined">add_location</span>
                    <span>Add Parking</span>
                </Link>
                <Link href="/my-listings" className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 rounded-xl hover:bg-surface-variant transition-all active:scale-95">
                    <span className="material-symbols-outlined">list</span>
                    <span>My Listings</span>
                </Link>
                <Link href="/garage-analytics" className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 rounded-xl hover:bg-surface-variant transition-all active:scale-95">
                    <span className="material-symbols-outlined">analytics</span>
                    <span>Analytics</span>
                </Link>
            </div>
        </header>

        {/* Bento Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-3xl col-span-1 flex flex-col justify-between min-h-[180px] border border-outline-variant/15">
                <span className="text-primary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">Active Listings</span>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-on-surface tracking-tighter">12</span>
                    <span className="text-secondary text-sm font-bold">+2 New</span>
                </div>
                <div className="mt-4 h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                </div>
            </div>

            <div className="glass-card p-8 rounded-3xl col-span-1 flex flex-col justify-between min-h-[180px] border border-outline-variant/15">
                <span className="text-tertiary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">Live Bookings</span>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-on-surface tracking-tighter">48</span>
                    <span className="text-tertiary text-sm font-bold">85% Occ.</span>
                </div>
                <div className="mt-4 flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant overflow-hidden relative">
                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ9nYfoY7Pgg8kozxAHR2jgoEk_v3r6QhAmy880RFWxVME-qVELqSE7XLy9D_mUhFGLBI6Ma-blnoHb29lKFJY-xj7O4GKUMGdG2jF2zGGNyLlh2RxKKOhWxrISzmVK9hp88aKRlmc0czdChvfmdGecz795AEHPNFL-VM5V8rjoDJjipm9bAuTXGkWuZJn36a-HvEfZ2cG4TLT-zoIzOjmkXuiHbRxsGn_FKHUZB5RS4WPp7kK7zbzNgNjJmHTY0qGjS6e__8GBQ" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant overflow-hidden relative">
                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN-rdG4pjp-BqoHgamqFX8t4fv61vjttorj5hmgYhvljzzvgSlCS1vOxAdzHdrbF1R_CQxBSgXO-A7etpXMovsixEn1HhI1J5bde3Fn-OU3Vhf7V_sd5mlyo7EYsoSe2f8Wz_78kDGSyiCa59eO4qkAQGzonul1_RUEyZC2ymv2VTLudoUL7NxwmHWJZ9ih5dQ_TyDBUJkS1t3NVDsxRwI24OE7QFE2SmzAmTQ9qtqSTL7GtdA_BTYpnwN7VrhBMnAhoAvg0NMCI8" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-[10px] font-bold bg-surface-container-highest text-on-surface">+45</div>
                </div>
            </div>

            <div className="glass-card p-8 rounded-3xl col-span-1 md:col-span-2 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                <div className="flex justify-between items-start">
                    <span className="text-primary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">Net Earnings (MTD)</span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary text-[10px] font-bold rounded-full">LATEST DATA</span>
                </div>
                <div className="mt-2">
                    <span className="text-6xl font-black text-on-surface tracking-tighter">$14,280</span>
                    <p className="text-on-surface-variant text-sm mt-1">Increasing by 12.4% vs last month</p>
                </div>
                <div className="flex gap-1 mt-4 items-end h-16">
                    <div className="h-8 w-full bg-primary/20 rounded-sm"></div>
                    <div className="h-10 w-full bg-primary/30 rounded-sm"></div>
                    <div className="h-6 w-full bg-primary/20 rounded-sm"></div>
                    <div className="h-12 w-full bg-primary/40 rounded-sm"></div>
                    <div className="h-full w-full bg-primary/60 rounded-sm"></div>
                    <div className="h-14 w-full bg-primary/40 rounded-sm"></div>
                    <div className="h-full w-full bg-primary rounded-sm"></div>
                </div>
            </div>
        </section>

        {/* Core Management Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Today's Bookings */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-on-surface font-[family-name:var(--font-headline)]">Today's Bookings</h2>
                    <Link href="/booking-management" className="text-sm text-primary font-semibold hover:underline">View Schedule</Link>
                </div>
                
                <div className="space-y-4">
                    {/* Booking Row 1 */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors group border border-outline-variant/10">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/30">
                                <span className="material-symbols-outlined text-3xl">directions_car</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface font-[family-name:var(--font-headline)]">CyberTruck Model X</h3>
                                <p className="text-sm text-on-surface-variant">Plot #42 • Arrival: 14:00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-widest text-outline">Duration</p>
                                <p className="font-mono text-on-surface">4h 30m</p>
                            </div>
                            <div className="h-10 w-[1px] bg-outline-variant/30 hidden md:block"></div>
                            <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">In Progress</span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>

                    {/* Booking Row 2 */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors group border border-outline-variant/10">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary border border-outline-variant/30">
                                <span className="material-symbols-outlined text-3xl">electric_car</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface font-[family-name:var(--font-headline)]">Lucid Air Dream</h3>
                                <p className="text-sm text-on-surface-variant">Plot #18 • Arrival: 16:30</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-widest text-outline">Duration</p>
                                <p className="font-mono text-on-surface">24h 00m</p>
                            </div>
                            <div className="h-10 w-[1px] bg-outline-variant/30 hidden md:block"></div>
                            <span className="px-4 py-1.5 bg-surface-container-highest text-on-surface-variant border border-outline-variant/50 rounded-full text-xs font-bold uppercase tracking-widest">Reserved</span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>

                    {/* Booking Row 3 */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors group border border-outline-variant/10">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary border border-outline-variant/30">
                                <span className="material-symbols-outlined text-3xl">sports_motorsports</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface font-[family-name:var(--font-headline)]">Solaris Glide</h3>
                                <p className="text-sm text-on-surface-variant">Plot #03 • Arrival: 18:00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-widest text-outline">Duration</p>
                                <p className="font-mono text-on-surface">1h 15m</p>
                            </div>
                            <div className="h-10 w-[1px] bg-outline-variant/30 hidden md:block"></div>
                            <span className="px-4 py-1.5 bg-surface-container-highest text-on-surface-variant border border-outline-variant/50 rounded-full text-xs font-bold uppercase tracking-widest">Reserved</span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Requests Sidebar */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-on-surface font-[family-name:var(--font-headline)]">Service Requests</h2>
                    <span className="h-6 w-6 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                </div>
                
                <div className="space-y-4">
                    {/* Request Card 1 */}
                    <div className="glass-card p-5 rounded-2xl border-l-4 border-l-error space-y-3 border-y border-r border-outline-variant/10">
                        <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 bg-error/10 text-error-dim text-[10px] font-bold rounded uppercase tracking-tighter">URGENT</span>
                            <span className="text-xs text-outline">2m ago</span>
                        </div>
                        <h4 className="font-bold text-on-surface">Emergency Charge Required</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Tesla S at Plot #09 battery critical. Immediate rapid charge needed.</p>
                        <div className="flex gap-2 pt-2">
                            <button className="flex-1 py-2 bg-error-dim hover:bg-error text-white text-xs font-bold rounded-lg transition-colors">Dispatch</button>
                            <button className="px-3 py-2 bg-surface-container-highest text-on-surface border border-outline-variant/30 hover:bg-surface-variant rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Request Card 2 */}
                    <div className="glass-card p-5 rounded-2xl border-l-4 border-l-tertiary space-y-3 border-y border-r border-outline-variant/10">
                        <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase tracking-tighter">PENDING</span>
                            <span className="text-xs text-outline">15m ago</span>
                        </div>
                        <h4 className="font-bold text-on-surface">Interior Detail Request</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Premium Valet service requested for BMW i7 at Plot #22.</p>
                        <div className="flex gap-2 pt-2">
                            <button className="flex-1 py-2 bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary-container text-xs font-bold rounded-lg transition-colors">Accept</button>
                            <button className="px-3 py-2 bg-surface-container-highest text-on-surface border border-outline-variant/30 hover:bg-surface-variant rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Weekly Revenue Mini Chart */}
                    <div className="glass-card p-6 rounded-2xl space-y-4 border border-outline-variant/10">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-outline text-center">Weekly Revenue</h4>
                        <div className="flex items-end justify-between h-32 gap-2 mt-4">
                            <div className="w-full bg-surface-container-highest rounded-t-lg h-1/2 hover:bg-primary/50 transition-colors"></div>
                            <div className="w-full bg-surface-container-highest rounded-t-lg h-3/4 hover:bg-primary/50 transition-colors"></div>
                            <div className="w-full bg-primary/40 rounded-t-lg h-2/3 hover:bg-primary/60 transition-colors"></div>
                            <div className="w-full bg-primary/60 rounded-t-lg h-5/6 hover:bg-primary/80 transition-colors"></div>
                            <div className="w-full bg-primary rounded-t-lg h-full"></div>
                            <div className="w-full bg-primary/30 rounded-t-lg h-2/3 hover:bg-primary/50 transition-colors"></div>
                            <div className="w-full bg-surface-container-highest rounded-t-lg h-1/2 hover:bg-primary/50 transition-colors"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-outline font-bold mt-2">
                            <span>MON</span>
                            <span>WED</span>
                            <span>FRI</span>
                            <span>SUN</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Listing Map Preview Section */}
        <section className="glass-card overflow-hidden rounded-[2.5rem] relative min-h-[400px] border border-outline-variant/15 mt-16">
            <div className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-50 contrast-125" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADkFS6blvfnl4vlLnpFBacwgO0W8cax7Buv7PSieY9yd8uSY68dOH9xVNEqlc97SSj4dofeRP4GI-8XhoR4XQEXMeLFpid0PhU5rqPk29HoaEXHAgqTn8lKftjO2WJ8bFutVnsrtszUV3IQAzPXQVQDfIH6VIsnOQo4e7K2stRT7jBWoQE7pTFwYNp7b6LCmMRXfF6Skbbds79qIpKIkpMKt05MUj9FiyOoVqbjtxLNkanHVJ3EQ65_3CifLljaipEaEXK6ejBvL8')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10"></div>
            
            <div className="relative z-20 p-12 h-full flex flex-col justify-end min-h-[400px]">
                <div className="max-w-md space-y-4">
                    <span className="px-3 py-1 bg-primary text-on-primary text-[10px] font-black rounded-full uppercase tracking-widest">Global Presence</span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-[family-name:var(--font-headline)]">Monitor Your Network</h2>
                    <p className="text-on-surface-variant font-[family-name:var(--font-body)]">Real-time occupancy heatmaps for all 12 garage locations across the metropolitan sector.</p>
                    <button className="mt-4 px-8 py-4 bg-white text-surface font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-lg">Open Live View</button>
                </div>
            </div>
        </section>

      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full glass-card z-50 border-t border-primary/10 flex justify-around py-4">
          <Link href="/garage-dashboard" className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Dash</span>
          </Link>
          <Link href="/my-listings" className="flex flex-col items-center gap-1 text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">garage</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Listings</span>
          </Link>
          <Link href="/garage-analytics" className="flex flex-col items-center gap-1 text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">payments</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Sales</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">person</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </Link>
      </div>

      <Footer />
    </div>
  );
}
