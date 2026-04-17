"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/SettingsSidebar";
import {
  getLoggedInUser,
  persistLoggedInUser,
  type LoggedInUser,
} from "@/lib/auth";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedUser = getLoggedInUser();
    if (!loggedUser) {
      router.replace("/login");
      return;
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    setUser(loggedUser);

    const loadProfile = async () => {
      try {
        const response = await fetch("/api/dashboard/car-owner/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const payload = (await response.json().catch(() => ({}))) as {
          user?: { name?: string; email?: string; phone?: string; role?: LoggedInUser["role"]; id?: string };
        };

        if (response.ok && payload.user) {
          const nextUser: LoggedInUser = {
            id: payload.user.id || loggedUser.id,
            name: payload.user.name || loggedUser.name,
            email: payload.user.email || loggedUser.email,
            role: payload.user.role || loggedUser.role,
          };

          setUser(nextUser);
          persistLoggedInUser(nextUser);
          setProfileName(nextUser.name);
          setProfileEmail(nextUser.email);
          setProfilePhone(payload.user.phone || "");
          return;
        }
      } catch {
        // Keep local fallback values below.
      }

      setProfileName(loggedUser.name);
      setProfileEmail(loggedUser.email);
      setProfilePhone("");
    };

    loadProfile();
  }, [router]);

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Please login again.");
      router.replace("/login");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/dashboard/car-owner/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileName,
          email: profileEmail,
          phone: profilePhone,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        user?: { id: string; name: string; email: string; role: LoggedInUser["role"]; phone?: string };
      };

      if (!response.ok || !payload.user) {
        throw new Error(payload.error || "Failed to update profile");
      }

      const nextUser: LoggedInUser = {
        id: payload.user.id,
        name: payload.user.name,
        email: payload.user.email,
        role: payload.user.role,
      };

      setUser(nextUser);
      persistLoggedInUser(nextUser);
      setProfilePhone(payload.user.phone || "");
      setMessage(payload.message || "Profile updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">hourglass_bottom</span>
      </div>
    );
  }

  const roleLabel =
    user.role === "car_owner"
      ? "Car Owner"
      : user.role === "garage_owner"
      ? "Garage Owner"
      : "Admin";

  const paymentHint = user.role === "garage_owner" ? "Use this method for payouts and fee settlements." : "Use this method for bookings and subscriptions.";
  const canEditProfile = user.role === "car_owner";

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      <DashboardNavbar />
      <SettingsSidebar activePath="/user-profile" />

      <main className="flex-1 lg:ml-64 pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
        <section className="glass-card rounded-3xl p-8 border border-outline-variant/15 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight text-on-surface">
                {user.name}
              </h1>
              <p className="text-sm uppercase tracking-[0.15em] text-on-surface-variant mt-1">{roleLabel}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg border border-primary/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </section>

        <section className="glass-card rounded-3xl p-8 border border-outline-variant/15 mb-6">
          <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-6">Profile Information</h2>
          {canEditProfile ? (
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Name</p>
                  <input
                    value={profileName}
                    onChange={(event) => setProfileName(event.target.value)}
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Email</p>
                  <input
                    value={profileEmail}
                    onChange={(event) => setProfileEmail(event.target.value)}
                    type="email"
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Phone</p>
                  <input
                    value={profilePhone}
                    onChange={(event) => setProfilePhone(event.target.value)}
                    className="mt-2 w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface"
                    placeholder="+8801XXXXXXXXX"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Role</p>
                  <p className="text-lg font-medium text-on-surface mt-3">{roleLabel}</p>
                </div>
              </div>

              {message && <p className="text-sm text-green-400">{message}</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-primary text-on-primary-fixed font-bold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Name</p>
                <p className="text-lg font-medium text-on-surface mt-1">{user.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Email</p>
                <p className="text-lg font-medium text-on-surface mt-1">{user.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Phone</p>
                <p className="text-lg font-medium text-on-surface mt-1">{profilePhone || "Not added yet"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Role</p>
                <p className="text-lg font-medium text-on-surface mt-1">{roleLabel}</p>
              </div>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-8 border border-outline-variant/15">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-3">Subscription</h3>
            <p className="text-sm text-on-surface-variant mb-6">View and choose a plan that matches your usage.</p>
            <Link
              href="/subscription-plans"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary-fixed font-bold text-sm"
            >
              Manage Subscription
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div id="payment-methods" className="glass-card rounded-3xl p-8 border border-outline-variant/15 scroll-mt-28">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-3">Payment Methods</h3>
            <p className="text-sm text-on-surface-variant mb-6">{paymentHint}</p>
            <Link
              href="/checkout?returnTo=/user-profile"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 font-bold text-sm"
            >
              Add Payment Method
              <span className="material-symbols-outlined text-base">credit_card</span>
            </Link>
          </div>
        </section>
      </main>

      <div className="lg:ml-64 relative z-20"><Footer /></div>
    </div>
  );
}
