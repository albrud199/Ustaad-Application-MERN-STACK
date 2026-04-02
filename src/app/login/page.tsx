import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";

export const metadata = {
  title: "Login | Ustaad",
  description: "Login to your Ustaad account to access the celestial navigation console.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NebulaBackground />
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
        {/* Brand & Editorial Section */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold tracking-tighter text-primary font-[family-name:var(--font-headline)]">
              Ustaad
            </span>
          </Link>
          <h1 className="font-[family-name:var(--font-headline)] text-6xl font-extrabold leading-tight tracking-tight text-on-surface">
            Navigate the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Celestial
            </span>{" "}
            Frontier.
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-md">
            Securely manage your orbital assets and navigation services with the
            next generation of celestial tracking.
          </p>
          <div className="pt-8 flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-primary text-sm">person</span>
                </div>
              ))}
            </div>
            <span className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant tracking-wide uppercase">
              Trusted by 10k+ Navigators
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[480px] p-10 rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="lg:hidden mb-8">
              <Link href="/">
                <span className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)]">
                  Ustaad
                </span>
              </Link>
            </div>
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface mb-2">
                Welcome Back
              </h2>
              <p className="text-on-surface-variant font-[family-name:var(--font-label)] text-sm tracking-tight">
                Enter your credentials to access the console.
              </p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">
                  Email or Phone
                </label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">
                    alternate_email
                  </span>
                  <input
                    className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                    placeholder="navigator@ustaad.io"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                    Password
                  </label>
                  <a
                    className="text-xs font-semibold text-primary-dim hover:text-primary transition-colors tracking-tight"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">
                    lock
                  </span>
                  <input
                    className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button className="text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-10 h-5 bg-surface-container-high rounded-full border border-outline-variant peer-checked:bg-primary-dim transition-all" />
                    <div className="absolute left-1 top-1 w-3 h-3 bg-on-surface-variant rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-white" />
                  </div>
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Remember Me
                  </span>
                </label>
              </div>
              <Link
                href="/dashboard"
                className="block w-full text-center bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold py-4 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.3)] active:scale-[0.98] transition-all font-[family-name:var(--font-headline)] tracking-tight"
              >
                Login to Console
              </Link>
            </form>
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-transparent text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center justify-center space-x-3 bg-surface-container-high border border-outline-variant/20 py-3.5 rounded-xl hover:bg-surface-variant transition-all group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path className="text-[#4285F4]" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                  <path className="text-[#34A853]" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                  <path className="text-[#FBBC05]" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                  <path className="text-[#EA4335]" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                </svg>
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  Google
                </span>
              </button>
            </div>
            <p className="text-center mt-10 text-sm text-on-surface-variant">
              Don&apos;t have a beacon yet?{" "}
              <Link className="text-primary-dim font-bold hover:underline" href="/register">
                Join Ustaad
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
