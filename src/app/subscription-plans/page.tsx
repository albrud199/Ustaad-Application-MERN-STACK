import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata = { title: "Subscription Plans | Ustaad" };

export default function SubscriptionPlansPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      {/* Background Nebula Orbs */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary-container/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-container/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      {/* Reusing existing Navbar structure */}
      <DashboardNavbar />
      <SettingsSidebar activePath="/subscription-plans" />

      <main className="flex-1 lg:ml-64 pt-32 pb-32 px-6 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[family-name:var(--font-headline)] tracking-tighter text-on-surface">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Experience</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl mx-auto text-lg leading-relaxed font-[family-name:var(--font-body)]">
            Choose a celestial tier that fits your rhythm. From hourly bursts to lunar cycles, Ustaad powers your movement.
          </p>
        </div>

        {/* Bento Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end font-[family-name:var(--font-body)]">
          
          {/* Hourly Plan */}
          <div className="glass-card p-8 rounded-[32px] border border-outline-variant/15 flex flex-col h-full hover:border-primary/40 transition-all duration-300">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-outline uppercase font-[family-name:var(--font-label)]">Commuter</span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-headline)] mt-2">Hourly</h3>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black font-[family-name:var(--font-headline)] text-on-surface">$2</span>
              <span className="text-on-surface-variant">/hour</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Flexible Entry
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Instant Validation
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:bg-surface-variant active:scale-95 transition-all border border-outline-variant/20 font-[family-name:var(--font-headline)]">
              Select
            </button>
          </div>

          {/* Daily Plan */}
          <div className="glass-card p-8 rounded-[32px] border border-outline-variant/15 flex flex-col h-full hover:border-primary/40 transition-all duration-300">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-outline uppercase font-[family-name:var(--font-label)]">Explorer</span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-headline)] mt-2">Daily</h3>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black font-[family-name:var(--font-headline)] text-on-surface">$15</span>
              <span className="text-on-surface-variant">/day</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                24h Access
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Free Valet
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:bg-surface-variant active:scale-95 transition-all border border-outline-variant/20 font-[family-name:var(--font-headline)]">
              Select
            </button>
          </div>

          {/* Monthly Plan (Highlighted) */}
          <div className="relative glass-card p-8 rounded-[32px] border-2 border-primary/60 flex flex-col h-full md:scale-105 z-10 bg-surface-container-low/80 shadow-[0_0_40px_rgba(163,166,255,0.15)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(163,166,255,0.4)]">
              <span className="text-[10px] font-black uppercase tracking-tighter text-white font-[family-name:var(--font-label)]">Most Popular</span>
            </div>
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-primary uppercase font-[family-name:var(--font-label)]">Titan</span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-headline)] mt-2">Monthly</h3>
            </div>
            <div className="mb-6">
              <div className="flex justify-start items-baseline gap-1">
                <span className="text-5xl font-black font-[family-name:var(--font-headline)] text-on-surface">$120</span>
                <span className="text-on-surface-variant">/mo</span>
              </div>
              <p className="text-[10px] text-primary mt-1 font-bold">Save 40% vs daily rate</p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                Unlimited bookings
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                24/7 Concierge Support
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                Priority Secure Bays
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Flash Entry Access
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 font-[family-name:var(--font-label)]">
              Upgrade Now
            </button>
          </div>

          {/* Weekly Plan */}
          <div className="glass-card p-8 rounded-[32px] border border-outline-variant/15 flex flex-col h-full hover:border-primary/40 transition-all duration-300">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-outline uppercase font-[family-name:var(--font-label)]">Voyager</span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-headline)] mt-2">Weekly</h3>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black font-[family-name:var(--font-headline)] text-on-surface">$65</span>
              <span className="text-on-surface-variant">/wk</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Multi-City Access
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Guest Passes (2)
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:bg-surface-variant active:scale-95 transition-all border border-outline-variant/20 font-[family-name:var(--font-headline)]">
              Select
            </button>
          </div>

        </div>

        {/* Comparison Table Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-headline)] text-center mb-12">Deep Dive Comparison</h2>
          <div className="glass-card rounded-[32px] overflow-hidden border border-outline-variant/15 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-[family-name:var(--font-body)] min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-high/50">
                    <th className="px-8 py-6 text-left text-sm font-bold text-outline">Features</th>
                    <th className="px-8 py-6 text-center text-sm font-bold text-outline">Basic</th>
                    <th className="px-8 py-6 text-center text-sm font-bold text-primary">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container-lowest/30 transition-colors">
                    <td className="px-8 py-6 text-sm text-on-surface">Automated Booking</td>
                    <td className="px-8 py-6 text-center"><span className="material-symbols-outlined text-outline">check</span></td>
                    <td className="px-8 py-6 text-center"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest/30 transition-colors">
                    <td className="px-8 py-6 text-sm text-on-surface">Security Guard Patrol</td>
                    <td className="px-8 py-6 text-center"><span className="material-symbols-outlined text-outline">close</span></td>
                    <td className="px-8 py-6 text-center"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest/30 transition-colors">
                    <td className="px-8 py-6 text-sm text-on-surface">EV Charging Credits</td>
                    <td className="px-8 py-6 text-center text-outline text-xs">Standard Rates</td>
                    <td className="px-8 py-6 text-center text-primary text-xs font-bold bg-primary/5">50kWh Monthly</td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest/30 transition-colors">
                    <td className="px-8 py-6 text-sm text-on-surface">App Customization</td>
                    <td className="px-8 py-6 text-center text-outline text-xs">Default</td>
                    <td className="px-8 py-6 text-center text-primary text-xs font-bold bg-primary/5">Premium Themes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}
