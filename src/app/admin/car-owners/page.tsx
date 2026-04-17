"use client";

import { useState, useEffect, useCallback } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import AdminModal from "@/components/AdminModal";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  nidNumber?: string;
  nidDocuments?: {
    frontImage?: string;
    backImage?: string;
    selfieImage?: string;
  };
  status: string;
  nidStatus: string;
  createdAt: string;
  vehicles?: { licensePlate?: string; model?: string }[];
}

export default function CarOwnersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "confirm" | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: string; userId: string } | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", status: "", nidStatus: "" });

  const fetchUsers = useCallback(async (page = 1, searchQuery = search, status = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        role: "car_owner",
        page: String(page),
        limit: "10",
      });
      if (searchQuery) params.set("search", searchQuery);
      if (status) params.set("status", status);

      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch car owners:", err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearch = (q: string) => {
    setSearch(q);
    fetchUsers(1, q, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    fetchUsers(1, search, status);
  };

  const handleUpdateUser = async (id: string, updates: Record<string, string>) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        fetchUsers(pagination.page);
        setModalType(null);
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers(pagination.page);
        setModalType(null);
        setConfirmAction(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email, phone: user.phone || "", status: user.status, nidStatus: user.nidStatus });
    setModalType("edit");
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: "bg-green-500/10 text-green-400 border-green-500/20",
      suspended: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      banned: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || map.active}`}>
        {status}
      </span>
    );
  };

  const nidBadge = (nidStatus: string) => {
    const map: Record<string, string> = {
      verified: "bg-green-500/10 text-green-400 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[nidStatus] || map.pending}`}>
        {nidStatus}
      </span>
    );
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (_: unknown, row: Record<string, unknown>) => {
        const u = row as unknown as User;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs">
              {u.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-on-surface text-sm">{u.name}</p>
              <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    { key: "phone", label: "Phone", render: (val: unknown) => <span className="text-on-surface-variant text-sm">{(val as string) || "N/A"}</span> },
    { key: "status", label: "Status", render: (val: unknown) => statusBadge(val as string) },
    { key: "nidStatus", label: "NID", render: (val: unknown) => nidBadge(val as string) },
    {
      key: "createdAt",
      label: "Joined",
      render: (val: unknown) => (
        <span className="text-slate-400 text-xs">
          {new Date(val as string).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] tracking-tight text-on-surface">
            Car Owners
          </h1>
          <p className="text-on-surface-variant mt-1">Manage all registered car owners</p>
        </div>
        <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
          {pagination.total} Total
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        data={users as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search by name, email, phone..."
        onSearch={handleSearch}
        onPageChange={(p) => fetchUsers(p)}
        pagination={pagination}
        loading={loading}
        emptyMessage="No car owners found"
        filters={
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        }
        actions={(row) => {
          const u = row as unknown as User;
          return (
            <>
              <button onClick={() => { setSelectedUser(u); setModalType("view"); }} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary transition-all" title="View">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
              </button>
              <button onClick={() => openEdit(u)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-tertiary transition-all" title="Edit">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                onClick={() => handleUpdateUser(u._id, { status: u.status === "suspended" ? "active" : "suspended" })}
                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-yellow-400 transition-all"
                title={u.status === "suspended" ? "Activate" : "Suspend"}
              >
                <span className="material-symbols-outlined text-[18px]">{u.status === "suspended" ? "check_circle" : "block"}</span>
              </button>
              <button
                onClick={() => { setConfirmAction({ action: "delete", userId: u._id }); setModalType("confirm"); }}
                className="p-2 hover:bg-error/10 rounded-lg text-slate-400 hover:text-error transition-all"
                title="Delete"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </>
          );
        }}
      />

      {/* View Modal */}
      <AdminModal open={modalType === "view" && !!selectedUser} onClose={() => { setModalType(null); setSelectedUser(null); }} title="Car Owner Details" size="md">
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary font-bold text-2xl">
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface">{selectedUser.name}</h3>
                <p className="text-sm text-slate-400 font-mono">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                <p className="text-sm font-semibold text-on-surface">{selectedUser.phone || "N/A"}</p>
              </div>
              <div className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Status</p>
                {statusBadge(selectedUser.status)}
              </div>
              <div className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">NID Status</p>
                {nidBadge(selectedUser.nidStatus)}
              </div>
              <div className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Joined</p>
                <p className="text-sm font-semibold text-on-surface">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-surface-container-highest p-4 rounded-xl col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">NID Number</p>
                <p className="text-sm font-semibold text-on-surface">{selectedUser.nidNumber || "Not submitted"}</p>
              </div>
            </div>

            {(selectedUser.profilePicture ||
              selectedUser.nidDocuments?.frontImage ||
              selectedUser.nidDocuments?.backImage ||
              selectedUser.nidDocuments?.selfieImage) && (
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-3">Verification Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedUser.profilePicture && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Profile</p>
                      <img src={selectedUser.profilePicture} alt="Profile" className="w-full h-24 rounded-lg object-cover border border-outline-variant/20" />
                    </div>
                  )}
                  {selectedUser.nidDocuments?.frontImage && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">NID Front</p>
                      <img src={selectedUser.nidDocuments.frontImage} alt="NID front" className="w-full h-24 rounded-lg object-cover border border-outline-variant/20" />
                    </div>
                  )}
                  {selectedUser.nidDocuments?.backImage && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">NID Back</p>
                      <img src={selectedUser.nidDocuments.backImage} alt="NID back" className="w-full h-24 rounded-lg object-cover border border-outline-variant/20" />
                    </div>
                  )}
                  {selectedUser.nidDocuments?.selfieImage && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Selfie</p>
                      <img src={selectedUser.nidDocuments.selfieImage} alt="NID selfie" className="w-full h-24 rounded-lg object-cover border border-outline-variant/20" />
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedUser.vehicles && selectedUser.vehicles.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-3">Vehicles</h4>
                <div className="space-y-2">
                  {selectedUser.vehicles.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 bg-surface-container-highest p-3 rounded-xl">
                      <span className="material-symbols-outlined text-primary">directions_car</span>
                      <span className="text-sm text-on-surface">{v.model || "Unknown"} — {v.licensePlate || "N/A"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal open={modalType === "edit" && !!selectedUser} onClose={() => { setModalType(null); setSelectedUser(null); }} title="Edit Car Owner" size="md">
        <div className="space-y-4">
          {[
            { label: "Name", key: "name" as const, type: "text" },
            { label: "Email", key: "email" as const, type: "email" },
            { label: "Phone", key: "phone" as const, type: "text" },
          ].map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">{field.label}</label>
              <input
                type={field.type}
                value={editForm[field.key]}
                onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Status</label>
              <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none cursor-pointer">
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">NID Status</label>
              <select value={editForm.nidStatus} onChange={(e) => setEditForm({ ...editForm, nidStatus: e.target.value })} className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface outline-none cursor-pointer">
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={() => setModalType(null)} className="flex-1 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-colors text-sm">
              Cancel
            </button>
            <button
              onClick={() => selectedUser && handleUpdateUser(selectedUser._id, editForm)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold hover:shadow-lg transition-all text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirm Modal */}
      <AdminModal open={modalType === "confirm" && !!confirmAction} onClose={() => { setModalType(null); setConfirmAction(null); }} title="Confirm Delete" size="sm">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-error/10 border border-error/20 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-error text-3xl">warning</span>
          </div>
          <p className="text-on-surface-variant">Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => { setModalType(null); setConfirmAction(null); }} className="flex-1 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-bold hover:bg-white/5 transition-colors text-sm">
              Cancel
            </button>
            <button
              onClick={() => confirmAction && handleDeleteUser(confirmAction.userId)}
              className="flex-1 py-3 rounded-xl bg-error text-white font-bold hover:bg-error/80 transition-colors text-sm"
            >
              Delete User
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
