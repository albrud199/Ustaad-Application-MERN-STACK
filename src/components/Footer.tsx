import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0B0E14]">
      <div className="max-w-7xl mx-auto px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-primary-dim font-[family-name:var(--font-headline)] uppercase tracking-tighter"
          >
            Ustaad
          </Link>
          <p className="font-[family-name:var(--font-headline)] text-xs tracking-normal text-gray-500 max-w-xs text-center md:text-left">
            © 2024 Ustaad. Navigating the Celestial Void.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Legal", "Twitter", "LinkedIn"].map((item) => (
            <Link
              key={item}
              href="#"
              className="font-[family-name:var(--font-headline)] text-xs tracking-normal text-gray-500 hover:text-primary transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
