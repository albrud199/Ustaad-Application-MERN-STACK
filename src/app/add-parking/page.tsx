"use client";

import { useMemo, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import NebulaBackground from "@/components/NebulaBackground";
import { getLoggedInUser } from "@/lib/auth";

type VehicleType = "sedan" | "suv" | "truck" | "ev" | "motorbike";

async function fileToDataUrl(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return `data:${file.type};base64,${btoa(binary)}`;
}

export default function AddParkingPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [totalSpots, setTotalSpots] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(10);
  const [dailyRate, setDailyRate] = useState(60);
  const [monthlyRate, setMonthlyRate] = useState(1000);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(["sedan", "suv"]);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  const toggleVehicle = (type: VehicleType) => {
    setVehicleTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const getAuthToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("auth_token") || getLoggedInUser()?.id || "";
  };

  const submitParking = async () => {
    if (!name || !location || !city) {
      setMessage("Please fill name, location, and city.");
      return;
    }

    if (vehicleTypes.length === 0) {
      setMessage("Please select at least one allowed vehicle type.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const imagePayload = await Promise.all(files.map((file) => fileToDataUrl(file)));
      const token = getAuthToken();

      const res = await fetch("/api/parkings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          location,
          city,
          totalSpots,
          pricePerHour: hourlyRate,
          pricePerDay: dailyRate,
          pricePerMonth: monthlyRate,
          allowedVehicleTypes: vehicleTypes,
          images: imagePayload,
          facilities: ["Guarded", "CCTV"],
        }),
      });

      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setMessage(data.error || "Failed to create parking.");
        setSaving(false);
        return;
      }

      setMessage(data.message || "Parking created successfully.");
      setName("");
      setDescription("");
      setLocation("");
      setCity("");
      setFiles([]);
      setVehicleTypes(["sedan", "suv"]);
    } catch {
      setMessage("Failed to create parking.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar userType="garage-owner" />

      <main className="flex-1 pt-28 pb-16 px-6 max-w-5xl mx-auto w-full relative z-10 space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Add Parking Space</h1>
          <p className="text-on-surface-variant mt-2">Upload garage photos, choose allowed vehicles, and publish your listing.</p>
        </header>

        <section className="glass-card p-6 rounded-2xl border border-outline-variant/20 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Parking Name" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20" />
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20 md:col-span-2" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20 md:col-span-2" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="number" value={totalSpots} onChange={(e) => setTotalSpots(Number(e.target.value || 0))} placeholder="Total Spots" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20" />
            <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value || 0))} placeholder="Hourly Rate" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20" />
            <input type="number" value={dailyRate} onChange={(e) => setDailyRate(Number(e.target.value || 0))} placeholder="Daily Rate" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20" />
            <input type="number" value={monthlyRate} onChange={(e) => setMonthlyRate(Number(e.target.value || 0))} placeholder="Monthly Rate" className="w-full px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/20 md:col-span-3" />
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Allowed Vehicle Types</p>
            <div className="flex flex-wrap gap-2">
              {(["sedan", "suv", "truck", "ev", "motorbike"] as VehicleType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleVehicle(type)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold ${
                    vehicleTypes.includes(type)
                      ? "bg-primary/15 border-primary text-primary"
                      : "bg-surface-container-highest border-outline-variant/20 text-on-surface-variant"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Garage Pictures</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                setFiles(selected.slice(0, 6));
              }}
              className="w-full text-sm"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {previews.map((src, idx) => (
                <img key={idx} src={src} alt={`Garage ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border border-outline-variant/20" />
              ))}
            </div>
          </div>

          {message && <p className="text-sm font-medium text-primary">{message}</p>}

          <button
            type="button"
            onClick={submitParking}
            disabled={saving}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Parking Listing"}
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
