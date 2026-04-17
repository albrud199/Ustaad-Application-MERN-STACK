// src/app/login/page.tsx
"use client";

import NebulaBackground from "@/components/NebulaBackground";
import {
  persistLoggedInUser,
  type LoggedInUser,
} from "@/lib/auth";
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
  const [isLoading, setIsLoading] = useState(false); // ✅ ADD: Loading state

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

  const redirectAfterLogin = (user: LoggedInUser) => {
    if (returnTo) {
      router.push(returnTo);
    } else if (user.role === "admin") {
      router.push("/admin");
    } else if (user.role === "garage_owner") {
      router.push("/dashboard/garage-owner");
    } else {
      router.push("/dashboard/car-owner");
    }
  };

  // ===== UPDATED: NEW LOGIN HANDLER USING API =====
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      showNotification("Please fill in all fields.", "error");
      setIsLoading(false);
      return;
    }

    try {
      // ===== STEP 1: CALL LOGIN API =====
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // ===== STEP 2: HANDLE ERROR RESPONSES =====
      if (!res.ok) {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (res.status === 403) {
          const errorBody = (await res.json()) as { error?: string };
          showNotification(
            errorBody.error || "This account cannot log in right now.",
            "error"
          );
          setIsLoading(false);
          return;
        }

        if (res.status === 401) {
          if (newAttempts >= 2) {
            showNotification(
              "Incorrect credentials again. Use 'Forgot Password?' below to reset.",
              "error"
            );
          } else {
            showNotification(
              `Incorrect email or password. ${2 - newAttempts} attempt(s) remaining.`,
              "error"
            );
          }
          setIsLoading(false);
          return;
        }

        showNotification("Login failed. Please try again.", "error");
        setIsLoading(false);
        return;
      }

      // ===== STEP 3: PARSE SUCCESSFUL RESPONSE =====
      const data = (await res.json()) as { 
        user: LoggedInUser;
        token: string;
      };

      // ===== STEP 4: SAVE USER AND TOKEN =====
      // Save user info to localStorage
      persistLoggedInUser(data.user);
      
      // ✅ SAVE TOKEN - this is important for authenticated requests
      localStorage.setItem("auth_token", data.token);
      
      // ✅ SAVE TOKEN TO COOKIE (for middleware to work)
      document.cookie = `auth_token=${data.token}; path=/; max-age=2592000; SameSite=Strict`;

      // ===== STEP 5: RESET AND REDIRECT =====
      setFailedAttempts(0);
      showNotification("✅ Login successful!", "success");
      
      // Small delay to show success message
      setTimeout(() => {
        redirectAfterLogin(data.user);
      }, 500);

    } catch (error) {
      console.error("Login error:", error);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      showNotification(
        newAttempts >= 2
          ? "Login failed again. Check your credentials or try again shortly."
          : "Unable to sign in right now. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- Forgot Password Handlers (keep as is, but updated for API in future) ---
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
    if (!resetEmail) { 
      setResetError("Please enter your email address."); 
      return; 
    }
    // TODO: In production, call API to verify email exists
    setResetStep("newPassword");
  };

  const handleResetPassword = () => {
    setResetError("");
    if (!newPassword) { 
      setResetError("Please enter a new password."); 
      return; 
    }
    if (newPassword.length < 6) { 
      setResetError("Password must be at least 6 characters."); 
      return; 
    }
    if (newPassword !== confirmPassword) { 
      setResetError("Passwords do not match."); 
      return; 
    }

    // TODO: In production, call API to reset password
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

      {/* Forgot Password Modal - KEEP EXISTING CODE */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          {/* ... keep existing modal code ... */}
        </div>
      )}

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
        {/* Brand & Editorial Section - KEEP EXISTING */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          {/* ... keep existing code ... */}
        </div>

        {/* Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[480px] p-10 rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="mb-8">
              <Link href="/" className="inline-block group">
                <span className="text-2xl font-bold tracking-tighter text-primary font-[family-name:var(--font-headline)] group-hover:text-primary-dim transition-colors">
                  Ustaad
                </span>
              </Link>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-on-surface-variant font-[family-name:var(--font-label)]">
                Smart Parking. Trusted Service.
              </p>
            </div>
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-[family-name:var(--font-label)] text-sm tracking-tight">Enter your credentials to access the console.</p>
            </div>

            {/* Failed attempts warning banner */}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
              
              {/* ✅ UPDATE BUTTON: Show loading state */}
              <button
                type="submit"
                disabled={isLoading}
                className="block w-full text-center bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold py-4 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-headline)] tracking-tight"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg animate-spin">
                      hourglass_empty
                    </span>
                    Signing in...
                  </span>
                ) : (
                  "Login to Console"
                )}
              </button>
            </form>

            {/* Rest of form - KEEP EXISTING */}
            <div className="relative my-10">
              {/* ... keep existing code ... */}
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