import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Help & Support | Ustaad" };

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <DashboardNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 relative overflow-hidden z-10 w-full max-w-6xl mx-auto">
        {/* Abstract Background Orbs */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-dim/15 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        {/* Hero Search */}
        <section className="text-center mb-24">
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-on-surface via-primary to-primary-dim bg-clip-text text-transparent">
            How can we guide you?
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-[family-name:var(--font-body)]">
            Access our comprehensive celestial navigation support. Find answers to your questions about bookings, parking, and account security.
          </p>
          <div className="relative max-w-2xl mx-auto group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text"
              placeholder="Search for answers, guides, or keywords..." 
              className="w-full bg-surface-container-highest border-none outline-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-xl py-5 pl-14 pr-6 text-on-surface placeholder:text-outline transition-all shadow-xl font-[family-name:var(--font-body)]"
            />
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-[family-name:var(--font-body)]">
          
          {/* FAQ Accordions (Main Column) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>help_center</span>
              Frequently Asked Questions
            </h2>

            {/* Category: Bookings */}
            <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/10">
                <h3 className="font-[family-name:var(--font-headline)] font-semibold text-primary uppercase tracking-widest text-xs">Bookings</h3>
                <span className="material-symbols-outlined text-outline">calendar_today</span>
              </div>
              <div className="divide-y divide-outline-variant/10">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                    <span className="font-medium">How do I reschedule a navigation service?</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                    Navigate to your Dashboard, select the active service under 'Upcoming', and click 'Modify Schedule'. Changes must be made at least 24 hours prior to the start time.
                  </div>
                </details>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                    <span className="font-medium">Can I cancel a booking mid-transit?</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                    Mid-transit cancellations are only available for 'Premium Celestial' tier members. Standard users may cancel up to 2 hours before departure for a partial refund.
                  </div>
                </details>
              </div>
            </div>

            {/* Category: Payments */}
            <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/10">
                <h3 className="font-[family-name:var(--font-headline)] font-semibold text-primary uppercase tracking-widest text-xs">Payments</h3>
                <span className="material-symbols-outlined text-outline">payments</span>
              </div>
              <div className="divide-y divide-outline-variant/10">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                    <span className="font-medium">Which payment methods are accepted?</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                    We accept all major credit cards, digital wallets (Apple Pay, Google Pay), and verified crypto-transfers through Ustaad Secure Gate.
                  </div>
                </details>
              </div>
            </div>

            {/* Category: Account */}
            <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/10">
                <h3 className="font-[family-name:var(--font-headline)] font-semibold text-primary uppercase tracking-widest text-xs">Account</h3>
                <span className="material-symbols-outlined text-outline">person</span>
              </div>
              <div className="divide-y divide-outline-variant/10">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                    <span className="font-medium">How do I enable Two-Factor Authentication?</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                    Go to Settings &gt; Security and select '2-Factor Authentication'. We support Authenticator apps and biometric passkeys for maximum orbital security.
                  </div>
                </details>
              </div>
            </div>

          </div>

          {/* Contact & Info (Sidebar) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Contact Section */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group border border-outline-variant/15">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">support_agent</span>
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold mb-6">Contact Support</h2>
              <div className="space-y-4 relative z-10">
                <a href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email Us</p>
                    <p className="text-xs text-on-surface-variant">support@ustaad.com</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/20">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Live Chat</p>
                    <p className="text-xs text-on-surface-variant">2-minute wait time</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-tertiary/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary border border-tertiary/20">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Phone Support</p>
                    <p className="text-xs text-on-surface-variant">+1 (888) USTAAD-0</p>
                  </div>
                </a>
              </div>
              <button className="w-full mt-6 py-4 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-bold rounded-xl active:scale-95 transition-all shadow-[0_4px_16px_rgba(163,166,255,0.2)] font-[family-name:var(--font-headline)] text-sm">
                Start New Ticket
              </button>
            </div>

            {/* Hours of Operation */}
            <div className="glass-card rounded-2xl p-8 border border-outline-variant/15">
              <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                Operation Hours
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                  <span className="text-sm text-on-surface-variant">Monday - Friday</span>
                  <span className="text-sm font-medium">24 Hours</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                  <span className="text-sm text-on-surface-variant">Saturday</span>
                  <span className="text-sm font-medium">08:00 - 22:00</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-sm text-on-surface-variant">Sunday</span>
                  <span className="text-sm font-medium">10:00 - 18:00</span>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-surface-container-high border-l-2 border-secondary text-xs text-on-surface-variant">
                Live chat response times may vary during peak celestial alignment periods.
              </div>
            </div>

            {/* Promotion Card */}
            <div className="relative rounded-2xl p-8 overflow-hidden h-48 flex items-end shadow-lg border border-outline-variant/20 group">
              <div 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhxRzFG5n-eFWnqD1zd-x3hkzMr0T66bzT-rhSsPoJDGu1IShNHJvClgsLtTUojn-jDi4jHH10AGaVMYpXToDSSqsNgZv-DF5wzCJHVB6aDPSeJukJASlaB6jOjf7A_TpnR1zmvQrvZF3Vt-UqBk8oCg-qI-FbJhlWfXE1eqAl3nPTX-fMBUIAm5kTQSfS9HN2YfDaYmDWDP2dHe1fPsfQ72lWYSrAXsX1UWszMtLLO5wSRlsO_YENqwTFD6p8ydu59J3GCKyvgY4')] bg-cover bg-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="relative z-10 w-full">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 font-[family-name:var(--font-label)]">PRO SERVICE</p>
                <h4 className="font-[family-name:var(--font-headline)] text-xl font-bold">24/7 Priority Concierge</h4>
              </div>
            </div>

          </div>
        </div>

      </main>

      <div className="relative z-20"><Footer /></div>
    </div>
  );
}
