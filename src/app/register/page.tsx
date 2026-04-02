import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";

export const metadata = {
  title: "Register | Ustaad",
  description: "Create your Ustaad account and join the celestial navigation network.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NebulaBackground />
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
        {/* Brand Section */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <Link href="/">
            <span className="text-3xl font-extrabold tracking-tighter text-primary font-[family-name:var(--font-headline)]">Ustaad</span>
          </Link>
          <h1 className="font-[family-name:var(--font-headline)] text-6xl font-extrabold leading-tight tracking-tight text-on-surface">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-secondary">Celestial</span> Fleet.
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-md">
            Choose your path — whether you park or provide space, your journey begins here.
          </p>
        </div>

        {/* Registration Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[520px] p-10 rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="lg:hidden mb-8">
              <Link href="/"><span className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)]">Ustaad</span></Link>
            </div>
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface mb-2">Create Account</h2>
              <p className="text-on-surface-variant font-[family-name:var(--font-label)] text-sm tracking-tight">Begin your celestial navigation journey.</p>
            </div>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="p-4 rounded-xl border-2 border-primary/40 bg-primary/5 flex flex-col items-center gap-2 transition-all hover:bg-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                <span className="font-[family-name:var(--font-headline)] text-sm font-bold text-primary">Car Owner</span>
              </button>
              <button className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-high flex flex-col items-center gap-2 transition-all hover:border-secondary/40 hover:bg-secondary/5">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>garage</span>
                <span className="font-[family-name:var(--font-headline)] text-sm font-bold text-on-surface-variant">Garage Owner</span>
              </button>
            </div>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                  <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                    <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="Stellar" type="text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                  <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                    <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="Navigator" type="text" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">alternate_email</span>
                  <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="navigator@ustaad.io" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">phone</span>
                  <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="+880 1XXX-XXXXXX" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">lock</span>
                  <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="••••••••" type="password" />
                </div>
              </div>
              <Link href="/nid-verification" className="block w-full text-center bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold py-4 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.3)] active:scale-[0.98] transition-all font-[family-name:var(--font-headline)] tracking-tight mt-4">
                Create Account
              </Link>
            </form>
            <p className="text-center mt-8 text-sm text-on-surface-variant">
              Already a navigator? <Link className="text-primary-dim font-bold hover:underline" href="/login">Login</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
