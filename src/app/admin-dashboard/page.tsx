"use client";

import { ProtectedPage } from "@/components/ProtectedPage";
import AdminLayout from "@/components/AdminLayout";
import { getLoggedInUser } from "@/lib/auth";

export default function AdminDashboard() {
  const user = getLoggedInUser();

  return (
    <ProtectedPage requiredRole="admin">
      <AdminLayout>
        <main className="p-8">
          <h1 className="text-4xl font-bold text-on-surface mb-8">
            Admin Dashboard 👑
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Total Parkings</h3>
              <p className="text-3xl font-bold text-secondary">0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Pending Verification</h3>
              <p className="text-3xl font-bold text-tertiary">0</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-lg font-semibold text-on-surface mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-orange-400">BDT 0</p>
            </div>
          </div>
        </main>
      </AdminLayout>
    </ProtectedPage>
  );
}
