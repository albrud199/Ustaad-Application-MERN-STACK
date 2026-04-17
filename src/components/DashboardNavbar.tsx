"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth";

const carOwnerNavLinks = [
  { href: "/search-parking", label: "Parking", icon: "local_parking" },
  { href: "/request-service", label: "Services", icon: "build" },
  { href: "/dashboard/car-owner", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/car-owner/my-bookings", label: "My Bookings", icon: "event" },
  { href: "/dashboard/car-owner/my-vehicles", label: "My Vehicles", icon: "directions_car" },
  { href: "/dashboard/car-owner/payment-history", label: "Payment History", icon: "payments" },
];

const garageOwnerNavLinks = [
  { href: "/dashboard/garage-owner", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/garage-owner/bookings", label: "Bookings", icon: "event" },
  { href: "/dashboard/garage-owner/manage-parking", label: "Manage Parking", icon: "local_parking" },
  { href: "/dashboard/garage-owner/earnings", label: "Earnings", icon: "payments" },
  { href: "/dashboard/garage-owner/settings", label: "Settings", icon: "settings" },
];

const repairshopOwnerNavLinks = [
  { href: "/dashboard/repairshop-owner", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/repairshop-owner/requests", label: "Requests", icon: "build" },
  { href: "/dashboard/repairshop-owner/history", label: "History", icon: "history" },
  { href: "/dashboard/repairshop-owner/settings", label: "Settings", icon: "settings" },
];

export default function DashboardNavbar({ userType }: { userType?: "car-owner" | "garage-owner" | "repairshop-owner" }) {
  const pathname = usePathname();
  const user = getLoggedInUser();
  const resolvedUserType =
    userType ?? (user?.role === "garage_owner" ? "garage-owner" : user?.role === "repairshop_owner" ? "repairshop-owner" : "car-owner");
  const navLinks =
    resolvedUserType === "garage-owner"
      ? garageOwnerNavLinks
      : resolvedUserType === "repairshop-owner"
        ? repairshopOwnerNavLinks
        : carOwnerNavLinks;
  const homeHref =
    user?.role === "car_owner"
      ? "/search-parking"
      : user?.role === "garage_owner"
      ? "/dashboard/garage-owner"
      : user?.role === "repairshop_owner"
      ? "/dashboard/repairshop-owner"
      : user?.role === "admin"
      ? "/admin"
      : "/";

  const profileHref =
    user?.role === "garage_owner"
      ? "/dashboard/garage-owner/settings"
      : user?.role === "repairshop_owner"
      ? "/dashboard/repairshop-owner/settings"
      : user?.role === "admin"
      ? "/admin/settings"
      : "/user-profile";

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="fixed right-4 top-4 z-50 text-xs text-on-surface-variant">{resolvedUserType}</div>
      <div className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link
            href={homeHref}
            className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)]"
          >
            Ustaad
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight font-[family-name:var(--font-headline)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/15">
            <span className="material-symbols-outlined text-outline text-lg">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-48 text-on-surface placeholder:text-outline ml-2"
              placeholder="Quick search..."
              type="text"
            />
          </div>
          <Link
            href="/notification-settings"
            className="p-2 text-gray-400 hover:bg-primary/10 rounded-lg transition-all active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">notifications</span>
          </Link>
          <Link
            href="/security-password"
            className="p-2 text-gray-400 hover:bg-primary/10 rounded-lg transition-all active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <Link
            href={profileHref}
            className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-highest flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">person</span>
          </Link>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-primary-dim/10 to-transparent h-px w-full absolute bottom-0" />
    </header>
  );
}
