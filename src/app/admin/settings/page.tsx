"use client";

import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/lib/auth";
import AdminModal from "@/components/AdminModal";

export default function SettingsPage() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [showSeedModal, setShowSeedModal] = useState(false);
  const [seedResult, setSeedResult] = useState("");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const user = getLoggedInUser();
      if (user) {
        setAdminName(user.name);
        setAdminEmail(user.email);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleSeedAdmin = async () => {
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      setSeedResult(data.message || "Done");
    } catch (err) {
      setSeedResult("Failed to seed admin: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">Settings</h1>
        <p className="text-on-surface-variant mt-1">Admin account and platform configuration</p>
      </div>

      {/* Admin Profile */}
      <section className="glass-card rounded-2xl p-6 lg:p-8 border border-outline-variant/15">
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span> Admin Profile
        </h2>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary font-bold text-3xl shadow-lg">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-on-surface">{adminName}</h3>
            <p className="text-sm text-slate-400 font-mono">{adminEmail}</p>
            <p className="text-xs text-primary mt-1 font-bold uppercase tracking-widest">Administrator</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Display Name</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <button className="mt-6 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all text-sm">
          Update Profile
        </button>
      </section>

      {/* Platform Configuration */}
      <section className="glass-card rounded-2xl p-6 lg:p-8 border border-outline-variant/15">
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">tune</span> Platform Configuration
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
            <div>
              <p className="text-sm font-semibold text-on-surface">Auto-approve Verified Hosts</p>
              <p className="text-xs text-slate-400 mt-0.5">Skip review for hosts with verified NID</p>
            </div>
            <div className="relative">
              <input className="sr-only peer" type="checkbox" id="autoApprove" />
              <label htmlFor="autoApprove" className="block w-11 h-6 bg-surface-container-high rounded-full border border-outline-variant peer-checked:bg-primary-dim transition-all cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-white pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
            <div>
              <p className="text-sm font-semibold text-on-surface">Email Notifications</p>
              <p className="text-xs text-slate-400 mt-0.5">Receive alerts for new registrations</p>
            </div>
            <div className="relative">
              <input className="sr-only peer" type="checkbox" id="emailNotif" defaultChecked />
              <label htmlFor="emailNotif" className="block w-11 h-6 bg-surface-container-high rounded-full border border-outline-variant peer-checked:bg-primary-dim transition-all cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-white pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
            <div>
              <p className="text-sm font-semibold text-on-surface">Maintenance Mode</p>
              <p className="text-xs text-slate-400 mt-0.5">Temporarily disable user access</p>
            </div>
            <div className="relative">
              <input className="sr-only peer" type="checkbox" id="maintenance" />
              <label htmlFor="maintenance" className="block w-11 h-6 bg-surface-container-high rounded-full border border-outline-variant peer-checked:bg-error-dim transition-all cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-white pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="glass-card rounded-2xl p-6 lg:p-8 border border-error/10">
        <h2 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">code</span> Developer Tools
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
            <div>
              <p className="text-sm font-semibold text-on-surface">Seed Admin Account</p>
              <p className="text-xs text-slate-400 mt-0.5">Create default admin in MongoDB (admin@ustaad.io)</p>
            </div>
            <button onClick={() => setShowSeedModal(true)} className="px-4 py-2 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20">
              Run Seed
            </button>
          </div>
        </div>
      </section>

      {/* Seed Modal */}
      <AdminModal open={showSeedModal} onClose={() => { setShowSeedModal(false); setSeedResult(""); }} title="Seed Admin Account" size="sm">
        <div className="space-y-6 text-center">
          {!seedResult ? (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
              </div>
              <div>
                <p className="text-on-surface font-semibold mb-2">Create Admin Account</p>
                <p className="text-sm text-slate-400">This will create an admin user in MongoDB with:</p>
                <div className="mt-3 bg-surface-container-highest p-4 rounded-xl text-left">
                  <p className="text-xs text-slate-400"><strong className="text-on-surface">Email:</strong> admin@ustaad.io</p>
                  <p className="text-xs text-slate-400 mt-1"><strong className="text-on-surface">Password:</strong> admin123</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSeedModal(false)} className="flex-1 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-colors text-sm">Cancel</button>
                <button onClick={handleSeedAdmin} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold hover:shadow-lg transition-all text-sm">Seed Now</button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-green-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <p className="text-on-surface font-semibold">{seedResult}</p>
              <button onClick={() => { setShowSeedModal(false); setSeedResult(""); }} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold hover:shadow-lg transition-all text-sm">Done</button>
            </>
          )}
        </div>
      </AdminModal>
    </div>
  );
}
