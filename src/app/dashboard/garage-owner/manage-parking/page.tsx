"use client";

import DashboardLayout from "@/components/DashboardLayout";
import GarageLocationPicker from "@/components/GarageLocationPicker";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

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

interface ParkingSpot {
  _id?: string;
  name: string;
  city: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  images?: string[];
  status: "pending" | "active" | "inactive";
}

export default function ManageParking() {
  const [parkings, setParkings] = useState<ParkingSpot[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ latitude: number; longitude: number; locationName: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    totalSpots: 1,
    pricePerHour: 0,
  });
  const [files, setFiles] = useState<File[]>([]);
  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  useEffect(() => {
    const loadParkings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/dashboard/garage-owner/parkings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { parkings?: ParkingSpot[]; error?: string };
        if (response.ok) {
          setParkings(payload.parkings || []);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load parkings");
      } finally {
        setLoading(false);
      }
    };

    loadParkings();
  }, []);

  const handleAddSpot = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedCoordinates) {
      setMessage("Please select a location on the map");
      return;
    }

    try {
      const imagePayload = await Promise.all(files.map((file) => fileToDataUrl(file)));
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/parkings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          location: selectedCoordinates.locationName,
          latitude: selectedCoordinates.latitude,
          longitude: selectedCoordinates.longitude,
          description: "",
          facilities: [],
          allowedVehicleTypes: ["sedan", "suv", "truck", "ev", "motorbike"],
          images: imagePayload,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { parking?: ParkingSpot; error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to add parking");
      }

      setParkings((current) => [payload.parking as ParkingSpot, ...current]);
      setFormData({ name: "", city: "", location: "", totalSpots: 1, pricePerHour: 0 });
      setFiles([]);
      setSelectedCoordinates(null);
      setShowAddForm(false);
      setShowLocationPicker(false);
      setMessage("Parking saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to add parking");
    }
  };

  const handleDeleteSpot = async (id?: string) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/dashboard/garage-owner/parkings?parkingId=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to delete parking");
      }

      setParkings((current) => current.filter((parking) => parking._id !== id));
      setMessage("Parking removed successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete parking");
    }
  };

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Manage Parking Spots</h1>
          <p className="text-on-surface-variant">Add, edit, or remove parking spaces</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        <button onClick={() => setShowAddForm(!showAddForm)} className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add Parking Spot
        </button>

        {showAddForm && (
          <div className="glass-card rounded-xl p-6 border border-primary/30 backdrop-blur-xl max-w-4xl">
            <form onSubmit={handleAddSpot} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Parking Name</label>
                <input type="text" placeholder="e.g., Gulshan Smart Garage" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">City</label>
                <input type="text" placeholder="e.g., Dhaka" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location (Map-based)</label>
                {!showLocationPicker ? (
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(true)}
                    className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface hover:border-primary transition-colors text-left flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    {selectedCoordinates
                      ? `Selected: ${selectedCoordinates.locationName}`
                      : "Click to select location on map"}
                  </button>
                ) : (
                  <div className="space-y-4 p-4 rounded-lg bg-surface-container border border-primary/30">
                    <GarageLocationPicker
                      onLocationSelect={(location) => {
                        setSelectedCoordinates(location);
                        setShowLocationPicker(false);
                      }}
                      initialLocation={selectedCoordinates}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Total Spots</label>
                  <input type="number" min="1" value={formData.totalSpots} onChange={(e) => setFormData({ ...formData, totalSpots: parseInt(e.target.value, 10) })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price / Hour</label>
                  <input type="number" min="0" value={formData.pricePerHour} onChange={(e) => setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Garage Pictures</label>
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
                <p className="text-xs text-on-surface-variant mt-2">Upload up to 6 photos. These will be visible on the parking details page.</p>
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative w-full h-24 rounded-lg border border-outline-variant/20 overflow-hidden">
                        <Image src={src} alt={`Garage preview ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors">Add Spot</button>
                <button type="button" onClick={() => { setShowAddForm(false); setShowLocationPicker(false); setSelectedCoordinates(null); }} className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold hover:bg-surface-container-high transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading parkings...</div>
        ) : parkings.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">🅿️</p>
            <p className="text-on-surface-variant">No parking spots added yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Add your first parking spot to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parkings.map((spot) => (
              <div key={spot._id || spot.name} className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors">
                {spot.images?.[0] && (
                  <div className="relative w-full h-32 rounded-lg border border-outline-variant/20 mb-4 overflow-hidden">
                    <Image src={spot.images[0]} alt={`${spot.name} cover`} fill className="object-cover" />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{spot.name}</p>
                    <p className="text-xs text-on-surface-variant capitalize">{spot.city}</p>
                  </div>
                  <button onClick={() => handleDeleteSpot(spot._id)} className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                </div>
                <div className="space-y-2 text-sm text-on-surface-variant">
                  <p>Total Spots: {spot.totalSpots}</p>
                  <p>Available: {spot.availableSpots}</p>
                  <p>Price / Hour: BDT {spot.pricePerHour.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}