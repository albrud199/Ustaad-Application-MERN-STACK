"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ownerNavLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/search-parking", label: "Parking", icon: "local_parking" },
  { href: "/my-bookings", label: "Bookings", icon: "event" },
  { href: "/request-service", label: "Services", icon: "handyman" },
];

export default function DashboardNavbar({ userType = "car-owner" }: { userType?: string }) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)]"
          >
            Ustaad
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight font-[family-name:var(--font-headline)]">
            {ownerNavLinks.map((link) => (
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
          <button className="p-2 text-gray-400 hover:bg-primary/10 rounded-lg transition-all active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-gray-400 hover:bg-primary/10 rounded-lg transition-all active:scale-95 duration-200">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-primary-dim/10 to-transparent h-px w-full absolute bottom-0" />
    </header>
  );
}
