"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  year: number;
}

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    model: "",
    year: new Date().getFullYear(),
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...formData,
    };
    setVehicles([...vehicles, newVehicle]);
    setFormData({ licensePlate: "", model: "", year: new Date().getFullYear() });
    setShowAddForm(false);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <DashboardLayout requiredRole="car_owner">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">My Vehicles</h1>
          <p className="text-on-surface-variant">Manage your registered vehicles</p>
        </header>

        {/* Add Vehicle Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Vehicle
        </button>

        {/* Add Vehicle Form */}
        {showAddForm && (
          <div className="glass-card rounded-xl p-6 border border-primary/30 backdrop-blur-xl">
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">License Plate</label>
                <input
                  type="text"
                  placeholder="e.g., ABC-1234"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Vehicle Model</label>
                <input
                  type="text"
                  placeholder="e.g., Toyota Corolla"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Year</label>
                <input
                  type="number"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Add Vehicle
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

        {/* Vehicles Grid */}
        {vehicles.length === 0 ? (
          <div className="glass-card rounded-xl p-12 border border-outline-variant/20 backdrop-blur-xl text-center">
            <p className="text-4xl mb-3">🚗</p>
            <p className="text-on-surface-variant">No vehicles added yet</p>
            <p className="text-xs text-on-surface-variant mt-2">Add your first vehicle to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="glass-card rounded-xl p-6 border border-outline-variant/20 backdrop-blur-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">🚗</span>
                  <button 
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="text-on-surface-variant hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <p className="font-semibold text-lg mb-1">{vehicle.model}</p>
                <p className="text-sm text-on-surface-variant mb-2">Plate: {vehicle.licensePlate}</p>
                <p className="text-sm text-on-surface-variant">Year: {vehicle.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}