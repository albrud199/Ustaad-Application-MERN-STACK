"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { LoggedInUser } from "@/lib/auth";
import { getLoggedInUser, logout } from "@/lib/auth";

export default function DashboardLayout({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode; 
  requiredRole: "car_owner" | "garage_owner" 
}) {
  const router = useRouter();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const loggedUser = getLoggedInUser();
      if (!loggedUser || loggedUser.role !== requiredRole) {
        router.replace("/login");
        setLoading(false);
        return;
      }

      setUser(loggedUser);
      setLoading(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [requiredRole, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <span className="material-symbols-outlined text-4xl text-primary">
              hourglass_bottom
            </span>
          </div>
          <p className="mt-4 text-on-surface">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const homeHref = requiredRole === "car_owner" ? "/search-parking" : "/dashboard/garage-owner";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-surface text-on-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-outline-variant/30 bg-surface-container-low p-6 overflow-y-auto flex flex-col">
        {/* Logo - HOME BUTTON */}
        <div className="mb-8">
          <Link 
            href={homeHref}
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <span className="text-3xl font-bold text-primary font-[family-name:var(--font-headline)] group-hover:scale-110 transition-transform">
              Ustaad
            </span>
          </Link>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">
            {requiredRole === "car_owner" ? "Driver Hub" : "Garage Hub"}
          </p>
        </div>

        {/* HOME Button */}
        <Link
          href={homeHref}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors flex items-center justify-center gap-2 group"
        >
          <span className="material-symbols-outlined group-hover:text-primary">home</span>
          Home
        </Link>

        {/* Divider */}
        <div className="h-px bg-outline-variant/20 mb-6"></div>
        
        {/* Navigation */}
        <nav className="space-y-1 mb-12 flex-1">
          {requiredRole === "car_owner" ? (
            <>
              <NavLink href="/dashboard/car-owner" label="Dashboard" icon="dashboard" />
              <NavLink href="/search-parking" label="Find Parking" icon="local_parking" />
              <NavLink href="/request-service" label="Services" icon="build" />
              <NavLink href="/dashboard/car-owner/my-bookings" label="My Bookings" icon="calendar_today" />
              <NavLink href="/dashboard/car-owner/my-vehicles" label="My Vehicles" icon="directions_car" />
              <NavLink href="/dashboard/car-owner/payment-history" label="Payments" icon="credit_card" />
            </>
          ) : (
            <>
              <NavLink href="/dashboard/garage-owner" label="Dashboard" icon="dashboard" />
              <NavLink href="/dashboard/garage-owner/manage-parking" label="Manage Parking" icon="local_parking" />
              <NavLink href="/dashboard/garage-owner/bookings" label="Bookings" icon="list" />
              <NavLink href="/dashboard/garage-owner/earnings" label="Earnings" icon="attach_money" />
              <NavLink href="/dashboard/garage-owner/settings" label="Settings" icon="settings" />
            </>
          )}
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-outline-variant/30 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface group"
    >
      <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
