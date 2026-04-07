"use client";

import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface AdminDataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onPageChange?: (page: number) => void;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  loading?: boolean;
  actions?: (row: Record<string, unknown>) => React.ReactNode;
  emptyMessage?: string;
  filters?: React.ReactNode;
}

export default function AdminDataTable({
  columns,
  data,
  searchPlaceholder = "Search...",
  onSearch,
  onPageChange,
  pagination,
  loading = false,
  actions,
  emptyMessage = "No data found",
  filters,
}: AdminDataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    onSearch?.(q);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      {/* Search & Filters Bar */}
      <div className="p-4 lg:p-6 border-b border-white/5 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-3 bg-surface-container-highest border border-outline-variant/15 rounded-xl px-4 py-2.5 w-full lg:w-80">
          <span className="material-symbols-outlined text-outline text-lg">search</span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-on-surface w-full placeholder:text-outline outline-none text-sm"
          />
          {searchQuery && (
            <button onClick={() => handleSearch("")} className="text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
        {filters && <div className="flex items-center gap-3 flex-wrap">{filters}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-high/30 border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 font-[family-name:var(--font-headline)] font-semibold text-[10px] text-slate-500 uppercase tracking-[0.15em]"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 font-[family-name:var(--font-headline)] font-semibold text-[10px] text-slate-500 uppercase tracking-[0.15em] text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-5">
                      <div className="h-4 bg-surface-container-highest rounded w-3/4"></div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-5 text-right">
                      <div className="h-4 bg-surface-container-highest rounded w-16 ml-auto"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-outline/30">inbox</span>
                    <p className="text-slate-400 text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={(row._id as string) || idx} className="hover:bg-white/[0.03] transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 bg-surface-container-high/20 flex items-center justify-between border-t border-white/5">
          <span className="text-sm text-slate-400">
            Showing{" "}
            <span className="text-on-surface font-semibold">
              {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of {pagination.total}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg hover:bg-surface-variant text-slate-400 disabled:opacity-30 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange?.(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    pagination.page === pageNum
                      ? "bg-primary text-on-primary-container"
                      : "hover:bg-surface-variant text-slate-400"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg hover:bg-surface-variant text-slate-400 disabled:opacity-30 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
