"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search-parking", label: "Parking" },
  { href: "/request-service", label: "Services" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link
            href="/"
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
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-primary-dim/10 to-transparent h-px w-full absolute bottom-0" />
    </header>
  );
}
