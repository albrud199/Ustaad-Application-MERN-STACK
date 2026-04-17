"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getLoggedInUser, logout } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const user = getLoggedInUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const profileHref =
    user?.role === "car_owner"
      ? "/user-profile"
      : user?.role === "garage_owner"
      ? "/dashboard/garage-owner/settings"
      : user?.role === "admin"
      ? "/admin/settings"
      : "/login";

  const roleLabel =
    user?.role === "car_owner"
      ? "Car Owner"
      : user?.role === "garage_owner"
      ? "Garage Owner"
      : user?.role === "admin"
      ? "Admin"
      : "";

  const dashboardHref =
    user?.role === "car_owner"
      ? "/dashboard/car-owner"
      : user?.role === "garage_owner"
      ? "/dashboard/garage-owner"
      : user?.role === "admin"
      ? "/admin"
      : "/";

  const homeHref =
    user?.role === "car_owner"
      ? "/search-parking"
      : user?.role === "garage_owner"
      ? "/dashboard/garage-owner"
      : user?.role === "admin"
      ? "/admin"
      : "/";

  const navLinks = [
    { href: homeHref, label: "Home" },
    ...(homeHref === "/search-parking" ? [] : [{ href: "/search-parking", label: "Parking" }]),
    { href: "/request-service", label: "Services" },
  ];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link
            href={homeHref}
            className="text-2xl font-extrabold tracking-tighter text-primary font-[family-name:var(--font-headline)]"
          >
            Ustaad
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight font-[family-name:var(--font-headline)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase tracking-widest font-bold text-xs transition-all duration-300 ${
                  pathname === link.href
                    ? "text-primary border-b-2 border-primary/30 pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <div className="flex items-center gap-2">
                <Link
                  href={profileHref}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl border border-outline-variant/20 bg-surface-container-highest/30 hover:border-primary/40 hover:bg-primary/10 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-on-surface font-[family-name:var(--font-headline)]">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">
                      {roleLabel}
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="h-10 w-10 rounded-xl border border-outline-variant/20 bg-surface-container-highest/30 hover:border-primary/40 hover:bg-primary/10 transition-all flex items-center justify-center"
                  aria-label="Open user menu"
                  aria-expanded={menuOpen}
                >
                  <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                </button>
              </div>

              <div
                className={`absolute right-0 mt-2 w-56 rounded-xl border border-outline-variant/20 bg-surface-container-highest/95 backdrop-blur-xl shadow-2xl p-2 transition-all ${
                  menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <Link
                  href={profileHref}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-sm text-on-surface"
                >
                  <span className="material-symbols-outlined text-base text-primary">person</span>
                  Profile
                </Link>
                <Link
                  href={dashboardHref}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-sm text-on-surface"
                >
                  <span className="material-symbols-outlined text-base text-primary">dashboard</span>
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error/10 text-sm text-error"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-on-surface-variant hover:text-white transition-colors font-[family-name:var(--font-headline)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-primary-fixed to-primary-dim text-on-primary-fixed px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(163,166,255,0.4)] transition-all duration-300 font-[family-name:var(--font-headline)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-primary-dim/10 to-transparent h-px w-full absolute bottom-0" />
    </header>
  );
}
