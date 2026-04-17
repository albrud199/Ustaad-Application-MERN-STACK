"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";
import { getLoggedInUser } from "@/lib/auth";
import { useState } from "react";

export default function SecurityPasswordClientPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getAuthToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("auth_token") || getLoggedInUser()?.id || "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to update password");
      }

      setMessage(payload.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <div className="fixed w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full top-[-200px] right-[-100px] -z-10 pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full bottom-[-100px] left-[-100px] -z-10 pointer-events-none"></div>

      <DashboardNavbar />
      <SettingsSidebar activePath="/security-password" />

      <main className="flex-1 lg:ml-64 pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)] tracking-tighter text-on-surface mb-4">Security & Password</h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed font-[family-name:var(--font-body)]">Update your password regularly to keep your account protected.</p>
        </header>

        <section className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)]">Change Password</h2>
          </div>

          {message && <div className="mb-6 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">Current Password</label>
              <input type="password" placeholder="••••••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">New Password</label>
                <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1 font-[family-name:var(--font-label)]">Confirm Password</label>
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="mt-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 w-full md:w-auto disabled:opacity-60">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>
      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}