"use client";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  color?: "primary" | "secondary" | "tertiary" | "error";
}

const colorMap = {
  primary: { bg: "text-primary", trendBg: "text-primary" },
  secondary: { bg: "text-secondary", trendBg: "text-secondary" },
  tertiary: { bg: "text-tertiary", trendBg: "text-tertiary" },
  error: { bg: "text-error", trendBg: "text-error" },
};

export default function AdminStatsCard({
  title,
  value,
  icon,
  trend,
  trendDirection = "neutral",
  color = "primary",
}: AdminStatsCardProps) {
  const colors = colorMap[color];
  const trendIcon =
    trendDirection === "up" ? "trending_up" : trendDirection === "down" ? "trending_down" : "remove";

  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500">
        <span className="material-symbols-outlined text-6xl">{icon}</span>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1 font-[family-name:var(--font-body)]">{title}</p>
      <h3 className="text-3xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface tracking-tight">
        {value}
      </h3>
      {trend && (
        <div className={`mt-3 flex items-center gap-1.5 ${colors.trendBg} text-xs font-bold`}>
          <span className="material-symbols-outlined text-sm">{trendIcon}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
