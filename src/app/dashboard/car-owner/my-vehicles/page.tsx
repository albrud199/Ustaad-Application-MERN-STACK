"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";

interface Vehicle {
  vehicleId?: string;
  licensePlate: string;
  model: string;
  year?: number;
  color?: string;
}

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    licensePlate: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
  });

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const response = await fetch("/api/dashboard/car-owner/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = (await response.json().catch(() => ({}))) as { vehicles?: Vehicle[]; error?: string };
        if (response.ok) {
          setVehicles(payload.vehicles || []);
        } else if (payload.error) {
          setMessage(payload.error);
        }
      } catch {
        setMessage("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleAddVehicle = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/dashboard/car-owner/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => ({}))) as { vehicles?: Vehicle[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to add vehicle");
      }

      setVehicles(payload.vehicles || []);
      setFormData({ licensePlate: "", model: "", year: new Date().getFullYear(), color: "" });
      setShowAddForm(false);
      setMessage("Vehicle saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to add vehicle");
    }
  };

  const handleDeleteVehicle = async (vehicleId?: string) => {
    if (!vehicleId) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/dashboard/car-owner/vehicles?vehicleId=${encodeURIComponent(vehicleId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = (await response.json().catch(() => ({}))) as { vehicles?: Vehicle[]; error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to delete vehicle");
      }

      setVehicles(payload.vehicles || []);
      setMessage("Vehicle removed successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete vehicle");
    }
  };

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">My Vehicles</h1>
          <p className="text-on-surface-variant">Manage your registered vehicles</p>
        </header>

        {message && <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">{message}</div>}

        <button onClick={() => setShowAddForm(!showAddForm)} className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add Vehicle
        </button>

        {showAddForm && (
          <div className="glass-card rounded-xl p-6 border border-primary/30 backdrop-blur-xl max-w-2xl">
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">License Plate</label>
                <input type="text" placeholder="e.g., ABC-1234" value={formData.licensePlate} onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Vehicle Model</label>
                <input type="text" placeholder="e.g., Toyota Corolla" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Color</label>
                <input type="text" placeholder="e.g., White" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Year</label>
                <input type="number" min="1990" max={new Date().getFullYear()} value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })} className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" required />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors">Add Vehicle</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold hover:bg-surface-container-high transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center text-on-surface-variant">Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">🚗</p>
            <p className="text-on-surface-variant">No vehicles added yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Add your first vehicle to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.vehicleId || `${vehicle.licensePlate}-${vehicle.model}`} className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">🚗</span>
                  <button onClick={() => handleDeleteVehicle(vehicle.vehicleId)} className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                </div>
                <p className="font-semibold text-lg mb-1">{vehicle.model}</p>
                <p className="text-sm text-on-surface-variant mb-2">Plate: {vehicle.licensePlate}</p>
                <p className="text-sm text-on-surface-variant">Year: {vehicle.year || "Unknown"}</p>
                {vehicle.color && <p className="text-sm text-on-surface-variant">Color: {vehicle.color}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}