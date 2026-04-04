"use client";

import NebulaBackground from "@/components/NebulaBackground";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ResetStep = "email" | "newPassword" | "success";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"info" | "error" | "success">("info");
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Forgot password modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("email");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState("");

  const showNotification = (msg: string, type: "info" | "error" | "success" = "info") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleGoogleLogin = () => {
    showNotification("Google Sign-In is coming soon! Please use email & password for now.");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("ustaad_accounts") || "[]");
    if (accounts.length === 0) {
      showNotification("No account found. Please register first.", "error");
      return;
    }

    const matchedUser = accounts.find(
      (acc: any) =>
        acc.email?.toLowerCase() === email.toLowerCase() &&
        acc.password === password
    );

    if (!matchedUser) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 2) {
        showNotification("Incorrect credentials again. Use 'Forgot Password?' below to reset.", "error");
      } else {
        showNotification(`Incorrect email or password. ${2 - newAttempts} attempt(s) remaining.`, "error");
      }
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    }));

    // Set auth flag for auth-gated components
    localStorage.setItem("ustaad_logged_in", "true");

    setFailedAttempts(0);

    // Redirect based on role
    if (returnTo) {
      router.push(returnTo);
    } else if (matchedUser.role === "garage_owner") {
      router.push("/dashboard/garage-owner");
    } else {
      router.push("/dashboard/car-owner");
    }
  };

  // --- Forgot Password Handlers ---
  const openResetModal = () => {
    setResetStep("email");
    setResetEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setResetError("");
    setShowResetModal(true);
  };

  const handleVerifyEmail = () => {
    setResetError("");
    if (!resetEmail) { setResetError("Please enter your email address."); return; }
    const accounts = JSON.parse(localStorage.getItem("ustaad_accounts") || "[]");
    const found = accounts.find((acc: any) => acc.email?.toLowerCase() === resetEmail.toLowerCase());
    if (!found) { setResetError("No account found with this email address."); return; }
    setResetStep("newPassword");
  };

  const handleResetPassword = () => {
    setResetError("");
    if (!newPassword) { setResetError("Please enter a new password."); return; }
    if (newPassword.length < 6) { setResetError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setResetError("Passwords do not match."); return; }

    // Update password in ustaad_accounts
    const accounts = JSON.parse(localStorage.getItem("ustaad_accounts") || "[]");
    const updated = accounts.map((acc: any) =>
      acc.email?.toLowerCase() === resetEmail.toLowerCase()
        ? { ...acc, password: newPassword }
        : acc
    );
    localStorage.setItem("ustaad_accounts", JSON.stringify(updated));
    setResetStep("success");
    setFailedAttempts(0);
  };

  const toastColors: Record<string, string> = {
    info: "text-secondary",
    error: "text-red-400",
    success: "text-green-400",
  };
  const toastIcons: Record<string, string> = {
    info: "info",
    error: "error",
    success: "check_circle",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <NebulaBackground />

      {/* Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center gap-3 bg-surface-container-high border border-outline-variant/30 text-on-surface px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm">
          <span className={`material-symbols-outlined text-xl flex-shrink-0 ${toastColors[toastType]}`}>{toastIcons[toastType]}</span>
          <p className="text-sm font-medium font-[family-name:var(--font-body)]">{toastMsg}</p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl border border-outline-variant/20 relative">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-surface-container-high rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-xl text-outline">close</span>
            </button>

            {/* Step 1: Enter Email */}
            {resetStep === "email" && (
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
                  </div>
                  <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-1">Reset Password</h2>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-body)]">Enter the email address linked to your Ustaad account.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                  <div className="flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                    <span className="material-symbols-outlined text-outline mr-3 text-xl">alternate_email</span>
                    <input
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                      placeholder="navigator@ustaad.io"
                      type="email"
                    />
                  </div>
                  {resetError && <p className="text-red-400 text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-sm">warning</span>{resetError}</p>}
                </div>
                <button
                  onClick={handleVerifyEmail}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold rounded-xl font-[family-name:var(--font-headline)] transition-all hover:shadow-lg"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Set New Password */}
            {resetStep === "newPassword" && (
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-secondary text-2xl">key</span>
                  </div>
                  <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-1">New Password</h2>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-body)]">Set a strong new password for <span className="text-primary font-semibold">{resetEmail}</span></p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">New Password</label>
                    <div className="flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-secondary">
                      <span className="material-symbols-outlined text-outline mr-3 text-xl">lock</span>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                        placeholder="Min. 6 characters"
                        type={showNewPassword ? "text" : "password"}
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-outline hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-xl">{showNewPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Confirm Password</label>
                    <div className="flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-secondary">
                      <span className="material-symbols-outlined text-outline mr-3 text-xl">lock_clock</span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                        placeholder="Repeat your password"
                        type="password"
                      />
                    </div>
                  </div>
                  {resetError && <p className="text-red-400 text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-sm">warning</span>{resetError}</p>}
                </div>
                <button
                  onClick={handleResetPassword}
                  className="w-full py-3.5 bg-gradient-to-r from-secondary to-tertiary-dim text-on-secondary-fixed font-bold rounded-xl font-[family-name:var(--font-headline)] transition-all hover:shadow-lg"
                >
                  Reset Password
                </button>
              </div>
            )}

            {/* Step 3: Success */}
            {resetStep === "success" && (
              <div className="space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-1">Password Reset!</h2>
                    <p className="text-on-surface-variant text-sm font-[family-name:var(--font-body)]">Your password has been updated. You can now log in with your new password.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold rounded-xl font-[family-name:var(--font-headline)] transition-all hover:shadow-lg"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
        {/* Brand & Editorial Section */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold tracking-tighter text-primary font-[family-name:var(--font-headline)]">Ustaad</span>
          </Link>
          <h1 className="font-[family-name:var(--font-headline)] text-6xl font-extrabold leading-tight tracking-tight text-on-surface">
            Navigate the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Celestial</span>{" "}
            Frontier.
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-md">
            Securely manage your orbital assets and navigation services with the next generation of celestial tracking.
          </p>
          <div className="pt-8 flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">person</span>
                </div>
              ))}
            </div>
            <span className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant tracking-wide uppercase">Trusted by 10k+ Navigators</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[480px] p-10 rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="lg:hidden mb-8">
              <Link href="/"><span className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)]">Ustaad</span></Link>
            </div>
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-[family-name:var(--font-label)] text-sm tracking-tight">Enter your credentials to access the console.</p>
            </div>

            {/* Failed attempts warning banner — shows after 2 failures */}
            {failedAttempts >= 2 && (
              <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-pulse-slow">
                <span className="material-symbols-outlined text-red-400 text-xl flex-shrink-0 mt-0.5">security</span>
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-bold font-[family-name:var(--font-headline)]">Having trouble logging in?</p>
                  <p className="text-red-300/80 text-xs mt-0.5 font-[family-name:var(--font-body)]">
                    You&apos;ve failed {failedAttempts} times.{" "}
                    <button onClick={openResetModal} className="underline font-bold hover:text-red-200 transition-colors">
                      Reset your password now
                    </button>
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Email or Phone</label>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">alternate_email</span>
                  <input
                    name="email"
                    className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                    placeholder="navigator@ustaad.io"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Password</label>
                  <button
                    type="button"
                    onClick={openResetModal}
                    className={`text-xs font-semibold transition-colors tracking-tight ${
                      failedAttempts >= 2
                        ? "text-red-400 hover:text-red-300 animate-pulse"
                        : "text-primary-dim hover:text-primary"
                    }`}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="input-glow group flex items-center bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3.5 transition-all focus-within:border-primary">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 text-xl">lock</span>
                  <input
                    name="password"
                    className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-[family-name:var(--font-body)] placeholder:text-outline"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button className="text-outline hover:text-on-surface transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
                {/* Attempt counter hint */}
                {failedAttempts === 1 && (
                  <p className="text-red-400 text-xs font-medium flex items-center gap-1 ml-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    1 failed attempt — 1 more and the reset option will be highlighted.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-10 h-5 bg-surface-container-high rounded-full border border-outline-variant peer-checked:bg-primary-dim transition-all" />
                    <div className="absolute left-1 top-1 w-3 h-3 bg-on-surface-variant rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-white" />
                  </div>
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
                </label>
              </div>
              <button
                type="submit"
                className="block w-full text-center bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold py-4 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.3)] active:scale-95 transition-all hover:shadow-[0_12px_32px_rgba(99,102,241,0.4)]"
              >
                Login to Console
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30" /></div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-transparent text-xs font-semibold uppercase tracking-[0.2em] text-outline">or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-3 bg-surface-container-high border border-outline-variant/20 py-3.5 rounded-xl hover:bg-surface-variant transition-all group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path className="text-[#4285F4]" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                  <path className="text-[#34A853]" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                  <path className="text-[#FBBC05]" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                  <path className="text-[#EA4335]" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                </svg>
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">Continue with Google</span>
                <span className="absolute right-3 text-[10px] font-bold uppercase tracking-widest text-outline border border-outline-variant/30 px-2 py-0.5 rounded-full font-[family-name:var(--font-label)]">Soon</span>
              </button>
            </div>
            <p className="text-center mt-10 text-sm text-on-surface-variant">
              Don&apos;t have a beacon yet?{" "}
              <Link className="text-primary-dim font-bold hover:underline" href="/register">Join Ustaad</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-primary text-5xl animate-pulse">lock</span>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}