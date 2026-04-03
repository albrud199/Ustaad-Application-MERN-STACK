import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Service Requests | Ustaad" };

export default function ServiceRequestsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-20 px-8 max-w-7xl mx-auto w-full relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-outline ml-2 font-[family-name:var(--font-label)]">Request Status</h3>
                    <nav className="space-y-1 font-[family-name:var(--font-body)]">
                        <Link href="/service-requests" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest text-primary font-medium transition-all group">
                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">inbox</span>
                            <span>Incoming</span>
                            <span className="ml-auto bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">12</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group">
                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">request_quote</span>
                            <span>Quoted</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group">
                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">task_alt</span>
                            <span>Accepted</span>
                        </Link>
                    </nav>
                </div>
                
                <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
                    <p className="text-sm text-on-surface-variant mb-4 font-[family-name:var(--font-body)]">Garage Performance</p>
                    <div className="flex items-end gap-2 relative z-10">
                        <span className="text-3xl font-[family-name:var(--font-headline)] font-bold text-primary">98%</span>
                        <span className="text-xs text-secondary-dim pb-1 font-bold uppercase tracking-widest">Response Rate</span>
                    </div>
                </div>
            </aside>

            {/* Main Content: Requests List */}
            <section className="flex-1 space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-2 text-on-surface">Service Requests</h1>
                        <p className="text-on-surface-variant font-[family-name:var(--font-body)]">Real-time incoming requests from drivers in your orbit.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary font-bold px-3 py-1.5 bg-primary/10 rounded-full animate-pulse border border-primary/20">
                        <span className="material-symbols-outlined text-sm">sync</span>
                        Live Refreshing
                    </div>
                </header>

                <div className="space-y-6">
                    
                    {/* Request Item 1 */}
                    <div className="glass-card rounded-2xl p-6 transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(163,166,255,0.15)] border border-outline-variant/20 hover:border-primary/30">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-outline-variant/30">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE5ERwWKy3qqZEikjlMQio9Xpm-YlSzWE8Zubmo_28uDvdm_GEUh-V4PdIGAmZd4W5CSAT_NRvFr_W8tvCC0Ua05QK1AvMDWjtKXSJwuDgzAwwm2TV_YBDxjy2JH7DuhTTkEJNXPMKPfzlshVGEHhTgqRU-VddQVSFCZrD83w-8tD8ZOVYa0n9Ekr1cZRgpH_I1iU71so4Ye6Ugl6t9jGMcLhzi_uZ5ENj1fhngNBZwwbuQW7a-cEU5Nxx5SS4vH7jLYroZ7oqVFM" alt="Requester" width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">Ahmed Hassan</h3>
                                        <p className="text-sm text-on-surface-variant font-[family-name:var(--font-body)] mt-1">BMW 3 Series (2022) • 2.4 km away</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm border border-error/20">
                                            <span className="material-symbols-outlined text-sm">bolt</span> High Urgency
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low/80 rounded-xl p-5 mb-6 border-l-2 border-primary">
                                    <p className="text-on-surface leading-relaxed italic font-[family-name:var(--font-body)]">"Strange grinding sound coming from the front left wheel when braking at low speeds. Occurred suddenly after highway driving."</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href="/send-quote" className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-95 text-center shadow-md">
                                        Send Quote
                                    </Link>
                                    <button className="flex-1 md:flex-none px-8 py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 font-bold rounded-xl hover:bg-surface-variant transition-all active:scale-95">
                                        Decline
                                    </button>
                                    <button className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all flex items-center justify-center">
                                        <span className="material-symbols-outlined">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Item 2 */}
                    <div className="glass-card rounded-2xl p-6 transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(163,166,255,0.15)] border border-outline-variant/20 hover:border-secondary/30">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-outline-variant/30">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ3l7j49WhyrH14-mBTWRivUYMq7tZjsskfIaW7TIMV3XX_k8t71e1DL3hxCRwcRaK7b6eo7xKWiTO9V4RHEgOVS_o8IJtrEX2WbAoCZMN5ueYTZQuydaZNRwHbbxacsTXyv6tpizC4gfR1gMCc_edHeGY_JUaRfXdxNJ6AV-gfHi6SeB3wUKlF2PFWFydSu9Fn-ZdH5YZJgaK7nEW13T9d0zPU8h4txRJd_bRFzlSI-D5KHDGm7M8VRjiKfNuWVkX9W_YMkS9BKM" alt="Requester" width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">Sarah Miller</h3>
                                        <p className="text-sm text-on-surface-variant font-[family-name:var(--font-body)] mt-1">Tesla Model Y (2023) • 0.8 km away</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider border border-secondary/20 shadow-sm">
                                            Routine
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low/80 rounded-xl p-5 mb-6 border-l-2 border-secondary">
                                    <p className="text-on-surface leading-relaxed font-[family-name:var(--font-body)]">"Annual battery health check and general system diagnostics. No current issues, just regular maintenance cycle."</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href="/send-quote" className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-95 text-center shadow-md">
                                        Send Quote
                                    </Link>
                                    <button className="flex-1 md:flex-none px-8 py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 font-bold rounded-xl hover:bg-surface-variant transition-all active:scale-95">
                                        Decline
                                    </button>
                                    <button className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all flex items-center justify-center">
                                        <span className="material-symbols-outlined">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Item 3 */}
                    <div className="glass-card rounded-2xl p-6 transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(163,166,255,0.15)] border border-outline-variant/20 hover:border-tertiary/30">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-outline-variant/30">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoGdBGwpGjBab8QnYmTNij3p6DVEy1KKcJFmT_JRUaTiKlO3VPztFVIhS4KKDCNQE6MzMi-jTJ18-QuKEeIiaw8VKRuypwWSDVrFp7EZ2ms1lSWm-COKU1Jiwhq9b1r4WnNaJJAIAApxzgUSZ_L9CaPez8GpRJGqplrwGSUqs2YJ8c4jP490ENbugtYT6fU_pSDzpH_9X6RLWITvXZ2X9zVDDBIPQZF5woRdxMZYxb3o8eC4Un0FSb1_5j35_TO6BRIwCnkP0HuPo" alt="Requester" width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">Zayn Malik</h3>
                                        <p className="text-sm text-on-surface-variant font-[family-name:var(--font-body)] mt-1">Audi RS6 (2021) • 5.1 km away</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-tertiary/20 shadow-sm">
                                            <span className="material-symbols-outlined text-sm">warning</span> Moderate
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low/80 rounded-xl p-5 mb-6 border-l-2 border-tertiary">
                                    <p className="text-on-surface leading-relaxed font-[family-name:var(--font-body)]">"Oil change required and some vibration in the steering wheel at speeds above 100km/h. Balance and alignment might be needed."</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href="/send-quote" className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-95 text-center shadow-md">
                                        Send Quote
                                    </Link>
                                    <button className="flex-1 md:flex-none px-8 py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 font-bold rounded-xl hover:bg-surface-variant transition-all active:scale-95">
                                        Decline
                                    </button>
                                    <button className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all flex items-center justify-center">
                                        <span className="material-symbols-outlined">chat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}
