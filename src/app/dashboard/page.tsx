"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Navigator");

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (!stored) {
      // Not logged in — redirect to login
      router.replace("/login");
      return;
    }
    const user = JSON.parse(stored);
    setUserName(user.firstName || "Navigator");
  }, [router]);

  return (
    <>
      <NebulaBackground />
      <DashboardNavbar />
      <main className="relative z-10 pt-32 pb-24 px-8 max-w-[1440px] mx-auto">
        {/* Hero Title */}
        <section className="mb-16">
          <h1 className="font-[family-name:var(--font-headline)] font-extrabold text-5xl md:text-6xl tracking-tighter mb-4 text-on-surface">
            Welcome back, <span className="text-primary">{userName}</span>.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Your fleet is running optimally. 3 upcoming tasks require your attention this week.
          </p>
        </section>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "rocket_launch", label: "Active", value: "02", badge: "+1 new", iconColor: "text-primary", badgeColor: "text-secondary" },
              { icon: "check_circle", label: "Completed", value: "148", iconColor: "text-tertiary" },
              { icon: "event", label: "Upcoming", value: "03", iconColor: "text-primary-dim" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-8 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <span className={`material-symbols-outlined ${stat.iconColor} mb-4`}>{stat.icon}</span>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl font-[family-name:var(--font-headline)] font-bold">{stat.value}</h2>
                  {stat.badge && <span className={`${stat.badgeColor} text-xs font-bold`}>{stat.badge}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Subscription Card */}
          <div className="md:col-span-4 glass-card p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-secondary text-on-secondary rounded-full text-[10px] font-bold uppercase tracking-widest">Premium Tier</span>
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-2">Celestial Plus</h3>
                <p className="text-on-surface-variant text-sm">Next renewal: Oct 12, 2024</p>
              </div>
              <button className="mt-8 py-3 px-6 bg-primary text-on-primary font-bold rounded-xl active:scale-95 transition-all shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:shadow-[0_0_30px_rgba(163,166,255,0.5)]">
                Manage Plan
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-12 flex flex-wrap gap-4">
            {[
              { icon: "local_parking", label: "Find Parking", href: "/search-parking", color: "primary" },
              { icon: "handyman", label: "Request Service", href: "/request-service", color: "secondary" },
              { icon: "shopping_bag", label: "Buy Plan", href: "#", color: "tertiary" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={`flex items-center gap-3 px-8 py-4 bg-surface-container-highest border border-outline-variant/30 rounded-xl hover:border-${action.color}/50 transition-all group`}>
                <span className={`material-symbols-outlined text-${action.color} group-hover:scale-110 transition-transform`}>{action.icon}</span>
                <span className="font-[family-name:var(--font-headline)] font-bold">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-2">Recent Activity</h2>
              <p className="text-on-surface-variant">Your latest service engagements and parking logs.</p>
            </div>
            <Link href="/my-bookings" className="text-primary font-bold text-sm uppercase tracking-widest hover:underline decoration-primary/30">View All History</Link>
          </div>
          <div className="glass-card rounded-2xl border border-outline-variant/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    {["Service Details", "Location", "Date", "Status", "Total"].map((h) => (
                      <th key={h} className="px-8 py-5 text-xs uppercase tracking-widest text-outline font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { icon: "minor_crash", iconColor: "text-primary", name: "Premium Detailing", sub: "Model S Plaid • Silver", loc: "Sector 42, Zenith Plaza", date: "May 24, 2024", status: "Active", statusBg: "bg-primary/10 text-primary", total: "$124.00" },
                    { icon: "local_parking", iconColor: "text-tertiary", name: "Valet Parking", sub: "Cyber Hub South", loc: "Downtown District", date: "May 22, 2024", status: "Completed", statusBg: "bg-outline-variant/30 text-outline", total: "$12.50" },
                    { icon: "build", iconColor: "text-secondary", name: "Oil & Filter Change", sub: "Audi Q7 • Blue", loc: "Service Station Alpha", date: "May 18, 2024", status: "Completed", statusBg: "bg-outline-variant/30 text-outline", total: "$89.00" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-primary/5 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
                            <span className={`material-symbols-outlined ${row.iconColor}`}>{row.icon}</span>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{row.name}</p>
                            <p className="text-xs text-on-surface-variant">{row.sub}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant">{row.loc}</td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant">{row.date}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${row.statusBg}`}>{row.status}</span>
                      </td>
                      <td className="px-8 py-6 font-[family-name:var(--font-headline)] font-bold text-on-surface">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
