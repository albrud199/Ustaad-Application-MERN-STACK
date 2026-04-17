"use client";

import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/DashboardLayout";
import { getLoggedInUser } from "@/lib/auth";

export default function CarOwnerDashboard() {
  const user = getLoggedInUser();

  return (
    <ProtectedPage requiredRole="car_owner">
      <DashboardLayout requiredRole="car_owner">
        <main className="p-8">
          <h1 className="text-4xl font-bold text-on-surface mb-8">
            Welcome, {user?.name}! 🚗
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">My Bookings</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Wallet Balance</h3>
              <p className="text-3xl font-bold text-secondary">BDT 0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Service Requests</h3>
              <p className="text-3xl font-bold text-tertiary">0</p>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedPage>
  );
}
