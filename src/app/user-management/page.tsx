import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "User Management | Ustaad" };

export default function UserManagementPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      {/* Reusing DashboardNavbar for standard top nav layout since prototype uses standard top bar */}
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">User Directory</h1>
          <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-lg max-w-2xl">Manage system access, verify identities, and monitor user engagement across the Celestial network.</p>
        </div>

        {/* Controls Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 glass-card rounded-xl p-4 flex items-center gap-3 border border-outline-variant/15">
            <span className="material-symbols-outlined text-outline">search</span>
            <input 
                type="text" 
                placeholder="Search by name, email, or NID..." 
                className="bg-transparent border-none focus:ring-0 text-on-surface w-full placeholder:text-outline outline-none" 
            />
          </div>
          <div className="glass-card rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/15">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_list</span>
              <span className="text-on-surface font-medium text-sm">All Roles</span>
            </div>
            <span className="material-symbols-outlined text-outline">expand_more</span>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/15">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <span className="text-on-surface font-medium text-sm">NID Status</span>
            </div>
            <span className="material-symbols-outlined text-outline">expand_more</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-outline-variant/15">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                  <th className="px-6 py-5 font-[family-name:var(--font-headline)] font-semibold text-xs text-outline uppercase tracking-widest">Name</th>
                  <th className="px-6 py-5 font-[family-name:var(--font-headline)] font-semibold text-xs text-outline uppercase tracking-widest">Role</th>
                  <th className="px-6 py-5 font-[family-name:var(--font-headline)] font-semibold text-xs text-outline uppercase tracking-widest">NID Status</th>
                  <th className="px-6 py-5 font-[family-name:var(--font-headline)] font-semibold text-xs text-outline uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 font-[family-name:var(--font-body)]">
                
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold shadow-inner">AK</div>
                      <div>
                        <div className="font-semibold text-on-surface">Arif Khan</div>
                        <div className="text-xs text-outline font-mono mt-0.5">arif.khan@celestial.io</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">Administrator</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-success">
                      <span className="material-symbols-outlined text-sm shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline hover:text-on-surface transition-all" title="View Details">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 hover:bg-error-container/20 rounded-lg text-error-dim hover:text-error transition-all" title="Suspend Account">
                        <span className="material-symbols-outlined text-[20px]">block</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold shadow-inner">SJ</div>
                      <div>
                        <div className="font-semibold text-on-surface">Sarah Jamshed</div>
                        <div className="text-xs text-outline font-mono mt-0.5">sarah.j@ust-node.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">Service Provider</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-tertiary">
                      <span className="material-symbols-outlined text-sm shrink-0">pending</span>
                      <span className="text-sm font-medium">Under Review</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href="/nid-verification" className="p-2 hover:bg-surface-container-highest rounded-lg text-outline hover:text-on-surface transition-all" title="View Details">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </Link>
                      <button className="p-2 hover:bg-success/10 rounded-lg text-success hover:text-success/80 transition-all" title="Verify User">
                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-outline font-bold shadow-inner">ZM</div>
                      <div>
                        <div className="font-semibold text-on-surface">Zayn Malik</div>
                        <div className="text-xs text-outline font-mono mt-0.5">zayn.m@void.net</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-outline/10 text-on-surface-variant border border-outline/20">End User</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-error">
                      <span className="material-symbols-outlined text-sm shrink-0">cancel</span>
                      <span className="text-sm font-medium">Rejected</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline hover:text-on-surface transition-all" title="View Details">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 hover:bg-primary/20 rounded-lg text-primary transition-all" title="Reset NID Status">
                        <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary font-bold shadow-inner border border-tertiary/20">RR</div>
                      <div>
                        <div className="font-semibold text-on-surface">Rohan Rai</div>
                        <div className="text-xs text-outline font-mono mt-0.5">rohan.r@celestial.io</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary/10 text-tertiary border border-tertiary/20">Support Agent</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-success">
                      <span className="material-symbols-outlined text-sm shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline hover:text-on-surface transition-all" title="View Details">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 hover:bg-error-container/20 rounded-lg text-error-dim hover:text-error transition-all" title="Suspend Account">
                        <span className="material-symbols-outlined text-[20px]">block</span>
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-surface-container-high/30 flex items-center justify-between border-t border-outline-variant/10">
            <span className="text-sm text-outline font-[family-name:var(--font-body)]">Showing <span className="text-on-surface font-semibold">1-4</span> of 24 users</span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-surface-variant text-outline disabled:opacity-30 transition-colors flex items-center justify-center" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary-container text-xs font-bold transition-colors">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant text-xs text-outline transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant text-xs text-outline transition-colors">3</button>
              <button className="p-2 rounded-lg hover:bg-surface-variant text-outline transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Callouts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
            <div className="relative z-10">
              <div className="text-primary-fixed mb-2 font-bold uppercase tracking-widest text-[10px] font-[family-name:var(--font-label)]">Security Pulse</div>
              <div className="text-3xl font-extrabold text-on-surface mb-1 font-[family-name:var(--font-headline)]">98.2%</div>
              <div className="text-sm text-outline font-[family-name:var(--font-body)]">Verified user compliance rate</div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px]">security</span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
            <div className="relative z-10">
              <div className="text-secondary mb-2 font-bold uppercase tracking-widest text-[10px] font-[family-name:var(--font-label)]">Identity Queue</div>
              <div className="text-3xl font-extrabold text-on-surface mb-1 font-[family-name:var(--font-headline)]">12</div>
              <div className="text-sm text-outline font-[family-name:var(--font-body)]">Pending NID verifications</div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px]">badge</span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-outline-variant/15">
            <div className="relative z-10">
              <div className="text-tertiary mb-2 font-bold uppercase tracking-widest text-[10px] font-[family-name:var(--font-label)]">System Load</div>
              <div className="text-3xl font-extrabold text-on-surface mb-1 font-[family-name:var(--font-headline)]">Optimal</div>
              <div className="text-sm text-outline font-[family-name:var(--font-body)]">User service availability</div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px]">hub</span>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
