// src/app/register/page.tsx
'use client';

import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type UserRole = "car_owner" | "garage_owner";

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("car_owner");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ ADD: Loading state
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const showNotification = (msg: string, type: "error" | "success" = "error") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // ===== STEP 1 HANDLER: STORE BASIC INFO AND CONTINUE TO NID STEP =====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    // ===== VALIDATION =====
    if (!firstName || !lastName || !email || !phone || !password) {
      showNotification("Please fill in all fields", "error");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters", "error");
      setIsLoading(false);
      return;
    }

    try {
      const registrationData = {
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone,
        password,
        role: selectedRole,
      };

      sessionStorage.setItem("registrationData", JSON.stringify(registrationData));
      showNotification("Step 1 complete. Continue with NID verification.", "success");
      setTimeout(() => router.push("/nid-verification"), 700);
    } catch (error) {
      console.error("Registration step error:", error);
      showNotification("Could not continue to NID verification. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NebulaBackground />

      {/* Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center gap-3 bg-surface-container-high border border-outline-variant/30 text-on-surface px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm">
          <span className={`material-symbols-outlined text-xl flex-shrink-0 ${toastType === "success" ? "text-green-400" : "text-red-400"}`}>
            {toastType === "success" ? "check_circle" : "error"}
          </span>
          <p className="text-sm font-medium font-[family-name:var(--font-body)]">{toastMsg}</p>
        </div>
      </div>

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
                onClick={() => setSelectedRole("car_owner")}
                disabled={isLoading}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 disabled:opacity-50 ${
                  selectedRole === "car_owner"
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(163,166,255,0.2)]"
                    : "border-outline-variant/30 bg-surface-container-high hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors ${selectedRole === "car_owner" ? "text-primary" : "text-on-surface-variant"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  directions_car
                </span>
                <span className={`font-[family-name:var(--font-headline)] text-sm font-bold transition-colors ${selectedRole === "car_owner" ? "text-primary" : "text-on-surface-variant"}`}>
                  Car Owner
                </span>
                {selectedRole === "car_owner" && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 font-[family-name:var(--font-label)]">Selected</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("garage_owner")}
                disabled={isLoading}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 disabled:opacity-50 ${
                  selectedRole === "garage_owner"
                    ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(246,115,183,0.2)]"
                    : "border-outline-variant/30 bg-surface-container-high hover:border-secondary/40 hover:bg-secondary/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors ${selectedRole === "garage_owner" ? "text-secondary" : "text-on-surface-variant"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  garage
                </span>
                <span className={`font-[family-name:var(--font-headline)] text-sm font-bold transition-colors ${selectedRole === "garage_owner" ? "text-secondary" : "text-on-surface-variant"}`}>
                  Garage Owner
                </span>
                {selectedRole === "garage_owner" && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 font-[family-name:var(--font-label)]">Selected</span>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                  <input 
                    name="firstName" 
                    required 
                    placeholder="First" 
                    disabled={isLoading}
                    className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary text-on-surface disabled:opacity-50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                  <input 
                    name="lastName" 
                    required 
                    placeholder="Last" 
                    disabled={isLoading}
                    className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary text-on-surface disabled:opacity-50" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  disabled={isLoading}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary text-on-surface disabled:opacity-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                <input 
                  name="phone" 
                  type="tel" 
                  required 
                  placeholder="+923001234567" 
                  disabled={isLoading}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary text-on-surface disabled:opacity-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
                <div className="flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <input 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••" 
                    disabled={isLoading}
                    className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full disabled:opacity-50" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-outline hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Selected role indicator */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-label)] border ${
                selectedRole === "garage_owner"
                  ? "text-secondary border-secondary/20 bg-secondary/5"
                  : "text-primary border-primary/20 bg-primary/5"
              }`}>
                <span className="material-symbols-outlined text-sm">
                  {selectedRole === "garage_owner" ? "garage" : "directions_car"}
                </span>
                Registering as: {selectedRole === "garage_owner" ? "Garage Owner" : "Car Owner"}
              </div>

              {/* ✅ UPDATE BUTTON: Show loading state */}
              <button
                type="submit"
                disabled={isLoading}
                className={`block w-full text-center font-bold py-4 rounded-xl active:scale-[0.98] transition-all font-[family-name:var(--font-headline)] tracking-tight mt-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedRole === "garage_owner"
                    ? "bg-gradient-to-r from-secondary to-tertiary-dim text-on-secondary-fixed shadow-[0_8px_24px_rgba(246,115,183,0.3)] hover:shadow-[0_12px_32px_rgba(246,115,183,0.4)]"
                    : "bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed shadow-[0_8px_24px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.4)]"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg animate-spin">
                      hourglass_empty
                    </span>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
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