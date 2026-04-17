"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { useEffect } from "react";
import { getLoggedInUser } from "@/lib/auth";

interface GarageSettings {
  garageName: string;
  location: string;
  capacity: number;
  openingHour: string;
  closingHour: string;
  phone: string;
  email: string;
}

export default function GarageSettings() {
  const [settings, setSettings] = useState<GarageSettings>({
    garageName: "",
    location: "",
    capacity: 0,
    openingHour: "08:00",
    closingHour: "20:00",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getAuthToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("auth_token") || getLoggedInUser()?.id || "";
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;
        const res = await fetch("/api/dashboard/garage-owner/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { settings: GarageSettings };
        if (data.settings) setSettings(data.settings);
      } catch {
        // ignore initial load failures
      }
    };

    loadSettings();
  }, []);

  const handleChange = (field: keyof GarageSettings, value: string | number) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = getAuthToken();
      const response = await fetch("/api/dashboard/garage-owner/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Settings</h1>
          <p className="text-on-surface-variant">Manage your garage information and preferences</p>
        </header>

        {/* Success/Error Message */}
        {message && (
          <div className={`px-6 py-3 rounded-lg font-semibold text-sm ${
            message.includes("success")
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}>
            {message}
          </div>
        )}

        {/* Settings Form */}
        <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Garage Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Garage Name</label>
              <input
                type="text"
                value={settings.garageName}
                onChange={(e) => handleChange("garageName", e.target.value)}
                placeholder="Enter garage name"
                className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter garage location"
                className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Total Capacity */}
            <div>
              <label className="block text-sm font-semibold mb-2">Total Capacity (Spots)</label>
              <input
                type="number"
                min="1"
                value={settings.capacity}
                onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
                placeholder="Enter total parking spots"
                className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Opening Hour</label>
                <input
                  type="time"
                  value={settings.openingHour}
                  onChange={(e) => handleChange("openingHour", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Closing Hour</label>
                <input
                  type="time"
                  value={settings.closingHour}
                  onChange={(e) => handleChange("closingHour", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="reset"
                className="px-6 py-3 bg-surface-container text-on-surface rounded-lg font-semibold hover:bg-surface-container-high transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="glass-card rounded-xl p-6 border border-error/30 backdrop-blur-xl max-w-2xl">
          <h3 className="text-lg font-bold text-error mb-4 font-[family-name:var(--font-headline)]">Danger Zone</h3>
          <p className="text-on-surface-variant text-sm mb-4">Permanently delete your garage account and all associated data</p>
          <button className="px-6 py-2 bg-error/10 text-error hover:bg-error/20 rounded-lg font-semibold transition-colors">
            Delete Garage Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
