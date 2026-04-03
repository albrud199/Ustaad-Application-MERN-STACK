'use client';

import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type UserRole = "car-owner" | "garage-owner";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole>("car-owner");
  const [showPassword, setShowPassword] = useState(false);
  const returnTo = searchParams.get("returnTo");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      userType: selectedRole,
    };

    // Save to localStorage for the NID verification step
    localStorage.setItem("registrationData", JSON.stringify(userData));
    const nidVerificationUrl = `/nid-verification${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`;
    router.push(nidVerificationUrl);
  };

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
              <button
                type="button"
                onClick={() => setSelectedRole("car-owner")}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                  selectedRole === "car-owner"
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(163,166,255,0.2)]"
                    : "border-outline-variant/30 bg-surface-container-high hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors ${selectedRole === "car-owner" ? "text-primary" : "text-on-surface-variant"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  directions_car
                </span>
                <span className={`font-[family-name:var(--font-headline)] text-sm font-bold transition-colors ${selectedRole === "car-owner" ? "text-primary" : "text-on-surface-variant"}`}>
                  Car Owner
                </span>
                {selectedRole === "car-owner" && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 font-[family-name:var(--font-label)]">Selected</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("garage-owner")}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                  selectedRole === "garage-owner"
                    ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(246,115,183,0.2)]"
                    : "border-outline-variant/30 bg-surface-container-high hover:border-secondary/40 hover:bg-secondary/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors ${selectedRole === "garage-owner" ? "text-secondary" : "text-on-surface-variant"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  garage
                </span>
                <span className={`font-[family-name:var(--font-headline)] text-sm font-bold transition-colors ${selectedRole === "garage-owner" ? "text-secondary" : "text-on-surface-variant"}`}>
                  Garage Owner
                </span>
                {selectedRole === "garage-owner" && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 font-[family-name:var(--font-label)]">Selected</span>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                  <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                    <input name="firstName" required className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="Stellar" type="text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                  <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                    <input name="lastName" required className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="Navigator" type="text" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">alternate_email</span>
                  <input name="email" required className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="navigator@ustaad.io" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">phone</span>
                  <input name="phone" required className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="+880 1XXX-XXXXXX" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">lock</span>
                  <input name="password" required className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Selected role indicator */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-label)] border ${
                selectedRole === "garage-owner"
                  ? "text-secondary border-secondary/20 bg-secondary/5"
                  : "text-primary border-primary/20 bg-primary/5"
              }`}>
                <span className="material-symbols-outlined text-sm">
                  {selectedRole === "garage-owner" ? "garage" : "directions_car"}
                </span>
                Registering as: {selectedRole === "garage-owner" ? "Garage Owner" : "Car Owner"}
              </div>

              <button
                type="submit"
                className={`block w-full text-center font-bold py-4 rounded-xl active:scale-[0.98] transition-all font-[family-name:var(--font-headline)] tracking-tight mt-2 ${
                  selectedRole === "garage-owner"
                    ? "bg-gradient-to-r from-secondary to-tertiary-dim text-on-secondary-fixed shadow-[0_8px_24px_rgba(246,115,183,0.3)] hover:shadow-[0_12px_32px_rgba(246,115,183,0.4)]"
                    : "bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed shadow-[0_8px_24px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.4)]"
                }`}
              >
                Create Account
              </button>
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
