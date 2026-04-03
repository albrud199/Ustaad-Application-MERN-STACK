import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata = { title: "Security & Password | Ustaad" };

export default function SecurityPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      {/* Abstract Background Orbs */}
      <div className="fixed w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full top-[-200px] right-[-100px] -z-10 pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full bottom-[-100px] left-[-100px] -z-10 pointer-events-none"></div>

      <DashboardNavbar />
      <SettingsSidebar activePath="/security-password" />

      <main className="flex-1 lg:ml-64 pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)] tracking-tighter text-on-surface mb-4">
            Security <span className="text-primary-dim">&</span> Privacy
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed font-[family-name:var(--font-body)]">
            Fortify your celestial presence. Manage credentials, track access points, and control your digital sovereignty.
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-[family-name:var(--font-body)]">
          
          <section className="lg:col-span-7 space-y-8">
            {/* Change Password Card */}
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Change Password</h2>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">New Password</label>
                    <input 
                      type="password" 
                      placeholder="New secret" 
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">Confirm New</label>
                    <input 
                      type="password" 
                      placeholder="Confirm secret" 
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-on-surface-variant">Strength: <span className="text-primary font-bold">Advanced</span></span>
                    <span className="text-[10px] text-outline">8/12 characters used</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden flex gap-1 border border-outline-variant/10">
                    <div className="h-full bg-primary-dim w-1/4 shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
                    <div className="h-full bg-primary-dim w-1/4 shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
                    <div className="h-full bg-primary-dim w-1/4 shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
                    <div className="h-full bg-surface-container-highest w-1/4"></div>
                  </div>
                </div>
                
                <button type="button" className="mt-4 px-8 py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 bg-opacity-90 w-full md:w-auto">
                  Update Credentials
                </button>
              </form>
            </div>

            {/* 2FA Control Card */}
            <div className="glass-card p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-4 border-l-secondary border-t border-r border-b border-outline-variant/15 gap-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 bg-secondary-container/20 rounded-2xl flex items-center justify-center text-secondary shadow-inner border border-secondary/20 flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>vibration</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-[family-name:var(--font-headline)]">Two-Factor Authentication</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">Extra layer of security via SMS or Authenticator</p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer ml-auto sm:ml-0 flex-shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary border border-outline-variant/30"></div>
              </div>
            </div>
          </section>

          {/* Access Logs (Span 5) */}
          <section className="lg:col-span-5">
            <div className="glass-card p-6 md:p-8 rounded-3xl h-full border border-outline-variant/15 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-3xl">history</span>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Access Logs</h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline bg-surface-container-high px-2 py-1 rounded-full border border-outline-variant/20">Live</span>
              </div>
              
              <div className="space-y-2 flex-1">
                {/* History Item 1 */}
                <div className="flex items-center gap-4 group cursor-default p-3 rounded-2xl bg-surface-container-low border border-outline-variant/5">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-outline-variant/10 shadow-inner">
                    <span className="material-symbols-outlined">laptop_mac</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-on-surface">MacBook Pro 16"</p>
                      <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold border border-secondary/20">Current</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">San Francisco, USA • 192.168.1.1</p>
                  </div>
                </div>

                {/* History Item 2 */}
                <div className="flex items-center gap-4 group p-3 hover:bg-surface-container-highest/50 rounded-2xl transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-outline-variant/10 shadow-inner">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-on-surface">iPhone 15 Pro</p>
                      <span className="text-[10px] text-outline font-medium">2 hours ago</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">London, UK • 82.14.22.91</p>
                  </div>
                </div>

                {/* History Item 3 */}
                <div className="flex items-center gap-4 group p-3 hover:bg-surface-container-highest/50 rounded-2xl transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-outline-variant/10 shadow-inner">
                    <span className="material-symbols-outlined">desktop_windows</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-on-surface">Windows Workstation</p>
                      <span className="text-[10px] text-outline font-medium">Yesterday</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">Berlin, DE • 101.44.12.5</p>
                  </div>
                </div>

                {/* History Item 4 */}
                <div className="flex items-center gap-4 group p-3 hover:bg-surface-container-highest/50 rounded-2xl transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-outline-variant/10 shadow-inner">
                    <span className="material-symbols-outlined">tablet</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-on-surface">iPad Air</p>
                      <span className="text-[10px] text-outline font-medium">Oct 12, 2023</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">San Francisco, USA • 192.168.1.5</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-outline-variant/10">
                <button className="w-full py-4 bg-surface-container-lowest hover:bg-surface-container-low rounded-xl text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/20">
                  Sign out of all other sessions
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Warning Information Section */}
        <section className="mt-8">
          <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/15 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-inner">
            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined text-4xl">verified_user</span>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold font-[family-name:var(--font-headline)] mb-2 text-on-surface">Security Advice</h4>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base font-[family-name:var(--font-body)]">
                We recommend changing your password every 90 days. Using a unique passphrase with numbers and special characters significantly reduces the risk of unauthorized celestial access. Last updated: <span className="text-tertiary font-bold">14 days ago</span>.
              </p>
            </div>
          </div>
        </section>

      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}
