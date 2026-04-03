import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";
import Image from "next/image";

export const metadata = { title: "User Profile | Ustaad" };

export default function UserProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      <DashboardNavbar />
      <SettingsSidebar activePath="/user-profile" />

      <main className="flex-1 lg:ml-64 pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Profile Header Section */}
        <section className="relative flex flex-col md:flex-row items-center md:items-end gap-8 pb-12">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(163,166,255,0.2)] rotate-3 transition-transform hover:rotate-0 duration-500 border border-outline-variant/20">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3DhAjH7MyLcewK3llKX7zgok8QUX7K0698QPUfECmMf3NUg05o-miX22bV-OEY6NScCKMSS_VN73f3a_hhKk4U2hnWiw1TxhdE-3N13xLn_GY2cM5POPyc7L3z9P7WabpDiC7ZTJzxVmuK9B1VY7DchEFgdmI1pAdJvoRnTFVYUqTf3cD5l9JZs37tWMzUR6SPj0Pa0U3mu7igDQEcl3IY0YIp5mZ1dGdsKcthooJCRbisDhi6BAYgaZ2gl1bY94WtBEjpmqBW0" 
                alt="Profile Avatar" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-[family-name:var(--font-headline)] font-bold text-xs uppercase tracking-widest shadow-lg border border-secondary/20 whitespace-nowrap">
              Elite Member
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1 mt-6 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold tracking-tighter mb-2 text-on-surface">Aria Thorne</h1>
            <p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2 font-[family-name:var(--font-body)]">
              <span className="material-symbols-outlined text-primary text-sm">location_on</span>
              San Francisco, California
            </p>
          </div>
          
          <div className="flex gap-3 mt-6 md:mt-0">
            <button className="bg-primary-container text-on-primary-container font-[family-name:var(--font-headline)] font-bold px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20 border border-primary/20">
              <span className="material-symbols-outlined text-[20px]">edit</span>
              Edit Profile
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Personal Info Card */}
          <div className="md:col-span-8 glass-card rounded-3xl p-8 border border-outline-variant/15">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 font-[family-name:var(--font-body)]">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Full Name</label>
                <p className="text-lg font-medium text-on-surface">Aria Thorne</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Email Address</label>
                <p className="text-lg font-medium text-on-surface">aria.thorne@celestial.io</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Phone Number</label>
                <p className="text-lg font-medium text-on-surface">+1 (555) 012-3456</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold font-[family-name:var(--font-label)]">Mailing Address</label>
                <p className="text-lg font-medium text-on-surface">42 Nebula Lane, Suite 9</p>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="md:col-span-4 glass-card rounded-3xl p-8 border border-outline-variant/15">
            <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-tertiary">verified_user</span>
              Trust Score
            </h3>
            <div className="space-y-4 font-[family-name:var(--font-body)]">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">mark_email_read</span>
                  <span className="text-sm font-medium">Email Verified</span>
                </div>
                <span className="material-symbols-outlined text-success" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">phone_iphone</span>
                  <span className="text-sm font-medium">Phone Secured</span>
                </div>
                <span className="material-symbols-outlined text-success" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner border-l-2 border-l-tertiary">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl">badge</span>
                  <span className="text-sm font-medium">Identity Check</span>
                </div>
                <button className="text-xs font-bold text-tertiary hover:underline uppercase tracking-tighter">Verify</button>
              </div>
            </div>
          </div>

          {/* Subscription Details Card */}
          <div className="md:col-span-5 glass-card rounded-3xl p-8 relative overflow-hidden border border-outline-variant/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)] group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold flex items-center gap-3 mb-8 relative z-10">
              <span className="material-symbols-outlined text-secondary">card_membership</span>
              Active Plan
            </h3>
            <div className="space-y-6 relative z-10 font-[family-name:var(--font-body)]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-black text-primary">Celestial</span>
                <span className="text-on-surface-variant font-medium">/ Yearly</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Valid Until</span>
                  <span className="font-bold">December 14, 2025</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden shadow-inner border border-outline-variant/10">
                  <div className="bg-primary h-full w-[75%] shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">sync</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline font-[family-name:var(--font-label)]">Auto-renewal On</span>
                </div>
                <button className="text-on-surface hover:text-primary text-xs font-bold transition-colors uppercase tracking-wider">Manage</button>
              </div>
            </div>
          </div>

          {/* Recent Booking History */}
          <div className="md:col-span-7 glass-card rounded-3xl p-8 border border-outline-variant/15">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">history</span>
                Recent Activity
              </h3>
              <button className="text-primary hover:text-primary-dim text-sm font-bold uppercase tracking-widest text-[10px] transition-colors">View All</button>
            </div>
            
            <div className="space-y-4 font-[family-name:var(--font-body)]">
              {/* History Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low group hover:bg-surface-container-high transition-colors border border-outline-variant/5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <span className="material-symbols-outlined">local_parking</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface truncate">Downtown Secure Parking</h4>
                  <p className="text-xs text-on-surface-variant truncate">Confirmed • 2 hours ago</p>
                </div>
                <div className="text-right flex-shrink-0 flex items-center gap-3">
                  <p className="font-[family-name:var(--font-headline)] font-bold text-on-surface">$12.50</p>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm translate-x-1 group-hover:translate-x-0">arrow_forward_ios</span>
                </div>
              </div>

              {/* History Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low group hover:bg-surface-container-high transition-colors border border-outline-variant/5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
                  <span className="material-symbols-outlined">cleaning_services</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface truncate">Premium Interior Valet</h4>
                  <p className="text-xs text-on-surface-variant truncate">Completed • Oct 24, 2024</p>
                </div>
                <div className="text-right flex-shrink-0 flex items-center gap-3">
                  <p className="font-[family-name:var(--font-headline)] font-bold text-on-surface">$85.00</p>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-sm translate-x-1 group-hover:translate-x-0">arrow_forward_ios</span>
                </div>
              </div>

              {/* History Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low group hover:bg-surface-container-high transition-colors border border-outline-variant/5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 shadow-inner">
                  <span className="material-symbols-outlined">ev_station</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface truncate">Hyper-Charge Session</h4>
                  <p className="text-xs text-on-surface-variant truncate">Completed • Oct 21, 2024</p>
                </div>
                <div className="text-right flex-shrink-0 flex items-center gap-3">
                  <p className="font-[family-name:var(--font-headline)] font-bold text-on-surface">$18.20</p>
                  <span className="material-symbols-outlined text-outline group-hover:text-tertiary transition-colors text-sm translate-x-1 group-hover:translate-x-0">arrow_forward_ios</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}
