import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata = { title: "Notification Settings | Ustaad" };

export default function NotificationSettingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Orbs */}
      <div className="fixed w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full top-[-10%] left-[-10%] -z-10 pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full bottom-[5%] right-[-5%] -z-10 pointer-events-none"></div>

      <DashboardNavbar />
      <SettingsSidebar activePath="/notification-settings" />

      <main className="flex-1 lg:ml-64 pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)] tracking-tighter mb-4 text-on-surface">Notification Settings</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-[family-name:var(--font-body)]">Configure how you want to receive alerts for your bookings, payments, and service requests.</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-8 font-[family-name:var(--font-body)]">
          
          {/* Category: Booking Notifications */}
          <section className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Booking Notifications</h2>
            </div>
            
            <div className="space-y-6">
              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Booking Confirmation</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Receive a message when a new booking is successfully placed.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Email</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">SMS</span>
                    <input type="checkbox" className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>

              <div className="h-px bg-outline-variant/20"></div>

              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Reminders</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Get notified 24 hours before your scheduled service.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Email</span>
                    <input type="checkbox" className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">SMS</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>

              <div className="h-px bg-outline-variant/20"></div>

              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Completion Reports</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Service summaries and invoices after work is finished.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Email</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">SMS</span>
                    <input type="checkbox" className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-primary focus:ring-primary/20 transition-all cursor-pointer appearance-none checked:bg-primary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Category: Payment Notifications */}
          <section className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-secondary text-3xl">payments</span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Payment Notifications</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Successful Transactions</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Instant alerts for every successful payment made.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-secondary focus:ring-secondary/20 transition-all cursor-pointer appearance-none checked:bg-secondary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Email</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-secondary focus:ring-secondary/20 transition-all cursor-pointer appearance-none checked:bg-secondary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Category: Service Requests (Provider Mode) */}
          <section className="relative overflow-hidden glass-card p-6 md:p-8 rounded-3xl border border-primary/20 shadow-[0_4px_30px_rgba(163,166,255,0.05)] bg-surface-container-low/30">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-[family-name:var(--font-label)] shadow-sm">Owner Only</span>
            </div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <span className="material-symbols-outlined text-tertiary text-3xl">construction</span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Service Requests</h2>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">New Inquiries</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Immediate alerts when a client requests a custom quote.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-tertiary focus:ring-tertiary/20 transition-all cursor-pointer appearance-none checked:bg-tertiary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">SMS</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-tertiary focus:ring-tertiary/20 transition-all cursor-pointer appearance-none checked:bg-tertiary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>
              
              <div className="h-px bg-outline-variant/20"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Urgent Cancellations</h3>
                  <p className="text-on-surface-variant text-sm mt-0.5">Alerts for bookings cancelled within 24 hours of start time.</p>
                </div>
                <div className="flex gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Push</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-tertiary focus:ring-tertiary/20 transition-all cursor-pointer appearance-none checked:bg-tertiary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">SMS</span>
                    <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full bg-surface-container-highest border-none text-tertiary focus:ring-tertiary/20 transition-all cursor-pointer appearance-none checked:bg-tertiary relative before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-6 before:transition-transform before:shadow-sm" />
                  </label>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Action Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 glass-card rounded-3xl border border-outline-variant/20 shadow-lg">
          <div className="text-on-surface-variant text-sm flex items-center gap-2 font-[family-name:var(--font-body)]">
            <span className="material-symbols-outlined text-primary">info</span>
            Changes are saved automatically to your profile.
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-variant transition-all active:scale-95 font-[family-name:var(--font-headline)] text-sm font-bold">Base Profile</button>
            <button className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold shadow-[0_4px_15px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all font-[family-name:var(--font-headline)] text-sm whitespace-nowrap">Save Preferences</button>
          </div>
        </div>

      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}
