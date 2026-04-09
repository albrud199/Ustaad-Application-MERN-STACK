import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Admin Dashboard | Ustaad" };

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Nebula Orbs (Custom for Admin to match prototype) */}
      <div className="fixed filter blur-[100px] -z-10 rounded-full opacity-15 w-[600px] h-[600px] bg-primary top-[-200px] left-[-100px]"></div>
      <div className="fixed filter blur-[100px] -z-10 rounded-full opacity-15 w-[500px] h-[500px] bg-secondary bottom-[-100px] right-[-100px]"></div>
      <div className="fixed filter blur-[100px] -z-10 rounded-full opacity-15 w-[400px] h-[400px] bg-tertiary top-[20%] right-[10%]"></div>

      {/* SideNavBar Shell */}
      <aside className="flex flex-col h-screen py-8 px-4 w-64 fixed left-0 top-0 border-r border-white/5 bg-surface z-50 shadow-[0_0_40px_rgba(99,102,241,0.06)] font-[family-name:var(--font-headline)] tracking-tight">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dim">
            Ustaad Admin
          </h1>
          <p className="text-outline text-xs mt-1 uppercase tracking-widest">Enterprise Control</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {/* Active State: Dashboard */}
          <Link href="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary border-r-2 border-primary font-semibold transition-all duration-150 ease-in-out">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/user-management" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors duration-300 hover:bg-white/5">
            <span className="material-symbols-outlined">groups</span>
            <span>User Management</span>
          </Link>
          <Link href="/pending-listings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors duration-300 hover:bg-white/5">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Pending Listings</span>
          </Link>
          <Link href="/nid-verification" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors duration-300 hover:bg-white/5">
            <span className="material-symbols-outlined">badge</span>
            <span>NID Verification</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors duration-300 hover:bg-white/5">
            <span className="material-symbols-outlined">assessment</span>
            <span>User Reports</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors duration-300 hover:bg-white/5">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="mt-auto space-y-6">
          <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed font-bold rounded-xl shadow-[0_0_20px_rgba(163,166,255,0.2)] hover:scale-[1.02] transition-transform">
            Generate Report
          </button>
          <div className="pt-6 border-t border-white/5 space-y-2">
            <Link href="#" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">help</span>
              <span>Support</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* TopAppBar Shell */}
      <header className="flex items-center justify-between px-8 py-4 ml-64 sticky top-0 z-40 w-[calc(100%-16rem)] bg-surface/80 backdrop-blur-xl font-[family-name:var(--font-headline)] font-medium">
        <div className="flex items-center gap-8">
          <h2 className="text-xl font-bold text-on-surface">Overview</h2>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-primary border-b border-primary pb-1">Overview</Link>
            <Link href="#" className="text-slate-400 hover:text-primary transition-opacity">Real-time</Link>
            <Link href="#" className="text-slate-400 hover:text-primary transition-opacity">History</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-sm">search</span>
            </span>
            <input 
              type="text" 
              placeholder="Search system logs..." 
              className="bg-surface-container-highest border border-outline-variant/15 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-primary transition-opacity relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
            </button>
            <button className="text-slate-400 hover:text-primary transition-opacity">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <div className="w-10 h-10 rounded-full border border-primary/20 overflow-hidden relative">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmINe0sx-zJNRmOS-RGTdQzFJflvAYkd7CJBcIgK0cPjdyFW-EA10_1GsvPj7ri78oarFc3DmHaSZrXr7504YloprrzjUQKnGD6po7uSozIXKXqbKcKnmiA8jNOwXYrJcf0-vYmLj_7OXbWGyDBS4bg1xQypPPLoesz1hsjT7iilmiabb5zP6F4MYieUudCvLoKaKNH7omsLzcZCCL6xheHsZoTJrMYD1Ye3X8pDTa-mSKwRCrn1TVN8ISlkcZltAniIDIJw9tvCU" 
                alt="Administrator" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 p-8 min-h-screen">
        
        {/* Platform KPIs - Asymmetric Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Metric 1 */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-5xl">groups</span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Total Users</p>
            <h3 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface">128,402</h3>
            <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12.4% this month</span>
            </div>
          </div>
          
          {/* Metric 2 */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-5xl">list_alt</span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Active Listings</p>
            <h3 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface">42,891</h3>
            <div className="mt-4 flex items-center gap-2 text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>8.2k premium slots</span>
            </div>
          </div>
          
          {/* Metric 3 */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-5xl">payments</span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Monthly Revenue</p>
            <h3 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface">$2.4M</h3>
            <div className="mt-4 flex items-center gap-2 text-tertiary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Target: $2.5M</span>
            </div>
          </div>
          
          {/* Metric 4: Disputes & NID Queue */}
          <div className="bg-gradient-to-br from-surface-container-highest to-surface-container p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-4">Pending Tasks</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-on-surface-variant">NID Verifications</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold text-on-secondary">42 NEW</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Disputes Open</span>
                  <span className="bg-error-container px-2 py-0.5 rounded text-[10px] font-bold text-on-error-container">18 PENDING</span>
                </div>
              </div>
              <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                Review Queue <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Dashboard Section: Analytics & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Growth Chart (Visual Representation) */}
          <section className="lg:col-span-2 glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-bold font-[family-name:var(--font-headline)]">User Growth Dynamics</h4>
                <p className="text-slate-400 text-sm">Real-time platform expansion metrics</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-on-surface">Weekly</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-400 hover:bg-white/5">Monthly</button>
              </div>
            </div>
            
            {/* Mock Chart Area */}
            <div className="h-64 relative flex items-end gap-2 overflow-hidden px-2">
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="border-b border-white w-full h-0"></div>
                <div className="border-b border-white w-full h-0"></div>
                <div className="border-b border-white w-full h-0"></div>
                <div className="border-b border-white w-full h-0"></div>
              </div>
              {/* Chart Bars/Visual Lines */}
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[40%] group relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface p-2 rounded border border-primary/20 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">12.4k</div>
              </div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[55%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[45%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[70%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[65%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[85%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[75%] group relative"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg h-[90%] group relative"></div>
            </div>
            <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Today</span>
            </div>
          </section>

          {/* Quick Links / Admin Functions */}
          <section className="space-y-6">
            <div className="glass-card rounded-3xl p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Admin Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <span className="material-symbols-outlined text-primary mb-2">person_add</span>
                  <span className="text-[10px] font-bold">Add Admin</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <span className="material-symbols-outlined text-secondary mb-2">policy</span>
                  <span className="text-[10px] font-bold">Policy Update</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <span className="material-symbols-outlined text-tertiary mb-2">account_balance</span>
                  <span className="text-[10px] font-bold">Payouts</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <span className="material-symbols-outlined text-error mb-2">lock_reset</span>
                  <span className="text-[10px] font-bold">Security Logs</span>
                </button>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 overflow-hidden relative group">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGide_HpJf03O_0ji9GpvKu_vScfnerHhljMMyN6RLe672cjEzXZa5EUGhJYz0EEaVkJvjxSu2-nUI4FO8hXVhiP7AUDZMXU1qwud7diXuHB4K6Ec5nm1ubV0keeOiZdBl-s3skoGVuyRsE6QGcotM7VkiG_CGVCdQEZ5yxm8yMCLD0yB3Ep97ulXE0pGRP9BOVJaJCDtBpK1jnu0A1FWiEbKbkoUUCwX0UXjjIXbABwaKRzwXlkp9_gdjy5tvY87HFt_hsjkkjZk" 
                alt="Platform Map" 
                fill 
                className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="relative z-10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-2">Global Heatmap</h4>
                <p className="text-xs text-slate-400 mb-4">Traffic nodes active in 14 territories.</p>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 py-2 px-4 rounded-lg text-[10px] font-bold uppercase hover:bg-white/20 transition-all">Launch Map View</button>
              </div>
            </div>
          </section>

        </div>

        {/* Recent Activity Log */}
        <section className="mt-8 glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold font-[family-name:var(--font-headline)]">System Activity Stream</h4>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Live Streaming
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="pb-4 px-4">Event</th>
                  <th className="pb-4 px-4">Entity</th>
                  <th className="pb-4 px-4">Timestamp</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-sm">shield</span>
                    </div>
                    <span>NID Verification Request</span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">User #91024 (Ahmed K.)</td>
                  <td className="py-4 px-4 text-slate-400 text-xs">2 mins ago</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase">Awaiting Review</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-primary hover:text-white transition-colors">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">inventory_2</span>
                    </div>
                    <span>Bulk Listing Upload</span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">Merchant #4421 (Global Logistics)</td>
                  <td className="py-4 px-4 text-slate-400 text-xs">14 mins ago</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">Processing</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-primary hover:text-white transition-colors">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-sm">warning</span>
                    </div>
                    <span>Transaction Dispute</span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">Tx ID: #8812-AFK</td>
                  <td className="py-4 px-4 text-slate-400 text-xs">45 mins ago</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded bg-error-container/10 text-error flex w-fit text-error-container text-[10px] font-bold uppercase">Escalated</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-primary hover:text-white transition-colors">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-dim/20 flex items-center justify-center text-secondary-dim">
                      <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    </div>
                    <span>Tier Upgrade</span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">User #5521 (Sarah J.)</td>
                  <td className="py-4 px-4 text-slate-400 text-xs">1 hour ago</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase">Completed</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-primary hover:text-white transition-colors">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Contextual FAB (Only on specific dashboards) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full shadow-[0_4px_20px_rgba(163,166,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform z-50 group">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
        <span className="absolute right-20 bg-surface-container-highest px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none text-on-surface">New Admin Task</span>
      </button>

    </div>
  );
}
