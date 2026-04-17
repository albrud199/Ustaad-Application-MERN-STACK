"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useEffect, useMemo, useState } from "react";

interface RepairshopSettings {
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  services: string[];
  emergencyAvailable: boolean;
  responseTimeMinutes: number;
  phone: string;
  email: string;
  openingHour: string;
  closingHour: string;
  description: string;
}

export default function RepairshopSettingsPage() {
  const [settings, setSettings] = useState<RepairshopSettings>({
    name: "",
    location: "",
    city: "",
    latitude: 0,
    longitude: 0,
    services: ["general", "emergency"],
    emergencyAvailable: true,
    responseTimeMinutes: 30,
    phone: "",
    email: "",
    openingHour: "08:00",
    closingHour: "20:00",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [servicesText, setServicesText] = useState("general, emergency");
  const inputClassName = "w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors";

  const token = useMemo(() => (typeof window === "undefined" ? "" : localStorage.getItem("auth_token") || ""), []);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/dashboard/repairshop-owner/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { settings: RepairshopSettings };
        if (payload.settings) {
          setSettings(payload.settings);
          setServicesText(payload.settings.services.join(", "));
        }
      } catch {
        // ignore initial load failures
      }
    };

    loadSettings();
  }, [token]);

  const handleChange = (field: keyof RepairshopSettings, value: string | number | boolean | string[]) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/dashboard/repairshop-owner/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...settings,
          services: servicesText.split(",").map((service) => service.trim()).filter(Boolean),
        }),
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
    <ProtectedPage requiredRole="repairshop_owner">
      <DashboardLayout requiredRole="repairshop_owner">
        <div className="space-y-6 max-w-3xl">
          <header>
            <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Settings</h1>
            <p className="text-on-surface-variant">Manage your repair shop details and emergency coverage.</p>
          </header>

          {message && (
            <div className={`px-6 py-3 rounded-lg font-semibold text-sm ${message.includes("success") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {message}
            </div>
          )}

          <div className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Repair Shop Name">
                <input value={settings.name} onChange={(event) => handleChange("name", event.target.value)} className={inputClassName} />
              </Field>

              <Field label="Description">
                <textarea value={settings.description} onChange={(event) => handleChange("description", event.target.value)} rows={4} className={inputClassName} />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Location">
                  <input value={settings.location} onChange={(event) => handleChange("location", event.target.value)} className={inputClassName} />
                </Field>
                <Field label="City">
                  <input value={settings.city} onChange={(event) => handleChange("city", event.target.value)} className={inputClassName} />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Latitude">
                  <input type="number" value={settings.latitude} onChange={(event) => handleChange("latitude", Number(event.target.value))} className={inputClassName} />
                </Field>
                <Field label="Longitude">
                  <input type="number" value={settings.longitude} onChange={(event) => handleChange("longitude", Number(event.target.value))} className={inputClassName} />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Opening Hour">
                  <input type="time" value={settings.openingHour} onChange={(event) => handleChange("openingHour", event.target.value)} className={inputClassName} />
                </Field>
                <Field label="Closing Hour">
                  <input type="time" value={settings.closingHour} onChange={(event) => handleChange("closingHour", event.target.value)} className={inputClassName} />
                </Field>
              </div>

              <Field label="Services">
                <input value={servicesText} onChange={(event) => setServicesText(event.target.value)} className={inputClassName} placeholder="general, emergency, repair" />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phone Number">
                  <input value={settings.phone} onChange={(event) => handleChange("phone", event.target.value)} className={inputClassName} />
                </Field>
                <Field label="Email">
                  <input type="email" value={settings.email} onChange={(event) => handleChange("email", event.target.value)} className={inputClassName} />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Emergency Response Time (minutes)">
                  <input type="number" min={1} value={settings.responseTimeMinutes} onChange={(event) => handleChange("responseTimeMinutes", Number(event.target.value))} className={inputClassName} />
                </Field>
                <Field label="Emergency Available">
                  <select value={settings.emergencyAvailable ? "true" : "false"} onChange={(event) => handleChange("emergencyAvailable", event.target.value === "true")} className={inputClassName}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </Field>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">save</span>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-semibold mb-2">{label}</span>
      {children}
    </label>
  );
}
