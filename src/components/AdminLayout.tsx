"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getLoggedInUser, logout } from "@/lib/auth";
import type { LoggedInUser } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/car-owners", label: "Car Owners", icon: "directions_car" },
  { href: "/admin/garage-owners", label: "Garage Owners", icon: "warehouse" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar_month" },
  { href: "/admin/payments", label: "Payments", icon: "payments" },
  { href: "/admin/listings", label: "Parking Listings", icon: "local_parking" },
  { href: "/admin/service-requests", label: "Service Requests", icon: "build" },
  { href: "/admin/reports", label: "Reports", icon: "assessment" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const loggedUser = getLoggedInUser();
      if (!loggedUser || loggedUser.role !== "admin") {
        router.replace("/login");
        setLoading(false);
        return;
      }

      setUser(loggedUser);
      setLoading(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <span className="material-symbols-outlined text-5xl text-primary">hourglass_bottom</span>
          </div>
          <p className="mt-4 text-on-surface font-[family-name:var(--font-headline)]">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-surface text-on-surface overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`flex flex-col h-screen py-6 px-4 w-[272px] fixed left-0 top-0 border-r border-white/5 bg-surface z-50 shadow-[0_0_40px_rgba(99,102,241,0.06)] font-[family-name:var(--font-headline)] tracking-tight transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:flex`}
      >
        {/* Logo */}
        <div className="mb-8 px-4">
          <Link href="/admin" className="block">
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dim">
              Ustaad Admin
            </h1>
            <p className="text-outline text-[10px] mt-1 uppercase tracking-[0.25em]">Enterprise Control</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary border-r-2 border-primary font-semibold shadow-[inset_0_0_20px_rgba(163,166,255,0.05)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive(item.href) ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto space-y-4 pt-4">
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary font-bold text-sm shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate text-on-surface">{user.name}</p>
                <p className="text-[11px] text-outline truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 mt-2 w-full rounded-xl text-slate-400 hover:text-error hover:bg-error/5 transition-all text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-surface/80 backdrop-blur-xl border-b border-white/5 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-surface-container-highest border border-outline-variant/15 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all w-48 lg:w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-primary transition-colors relative p-2">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
            </button>
            <Link href="/" className="text-slate-400 hover:text-primary transition-colors p-2" title="View Site">
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
