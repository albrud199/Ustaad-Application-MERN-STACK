"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

interface ParkingSpot {
  id: string;
  spotNumber: string;
  status: "available" | "occupied" | "maintenance";
  type: "standard" | "compact" | "handicap";
}

export default function ManageParking() {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    spotNumber: "",
    type: "standard" as const,
  });

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSpot: ParkingSpot = {
      id: Date.now().toString(),
      spotNumber: formData.spotNumber,
      type: formData.type,
      status: "available",
    };
    setParkingSpots([...parkingSpots, newSpot]);
    setFormData({ spotNumber: "", type: "standard" });
    setShowAddForm(false);
  };

  const handleDeleteSpot = (id: string) => {
    setParkingSpots(parkingSpots.filter(s => s.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400";
      case "occupied":
        return "bg-red-500/20 text-red-400";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout requiredRole="garage_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">Manage Parking Spots</h1>
          <p className="text-on-surface-variant">Add, edit, or remove parking spaces</p>
        </header>

        {/* Add Spot Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Parking Spot
        </button>

        {/* Add Spot Form */}
        {showAddForm && (
          <div className="glass-card rounded-xl p-6 border border-primary/30 backdrop-blur-xl">
            <form onSubmit={handleAddSpot} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Spot Number</label>
                <input
                  type="text"
                  placeholder="e.g., A-01"
                  value={formData.spotNumber}
                  onChange={(e) => setFormData({ ...formData, spotNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Spot Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "standard" | "compact" | "handicap" })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="standard">Standard</option>
                  <option value="compact">Compact</option>
                  <option value="handicap">Handicap</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Add Spot
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Parking Spots Grid */}
        {parkingSpots.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">🅿️</p>
            <p className="text-on-surface-variant">No parking spots added yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Add your first parking spot to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parkingSpots.map((spot) => (
              <div
                key={spot.id}
                className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{spot.spotNumber}</p>
                    <p className="text-xs text-on-surface-variant capitalize">{spot.type}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteSpot(spot.id)}
                    className="text-on-surface-variant hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(spot.status)} capitalize`}>
                    {spot.status}
                  </span>
                  <span className="text-xl">🅿️</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}