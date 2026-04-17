import Link from "next/link";

interface SettingsSidebarProps {
  activePath: string;
}

export default function SettingsSidebar({ activePath }: SettingsSidebarProps) {
  const links = [
    { name: "User Profile", path: "/user-profile", icon: "person" },
    { name: "Security", path: "/security-password", icon: "security" },
    { name: "Notifications", path: "/notification-settings", icon: "notifications" },
    { name: "Subscription Plans", path: "/subscription-plans", icon: "stars" },
  ];

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/10 bg-surface pt-24 pb-8 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="px-6 mb-8 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2 font-[family-name:var(--font-label)]">Navigator</p>
        <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl border border-primary/10">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface font-[family-name:var(--font-headline)]">Celestial Tier</p>
            <p className="text-[10px] text-outline font-[family-name:var(--font-body)]">Active Member</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 font-[family-name:var(--font-body)]">
        {links.map((link) => {
          const isActive = activePath === link.path;
          return (
            <Link 
              key={link.path} 
              href={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-primary/10 text-primary border-r-2 border-primary font-bold shadow-sm" 
                  : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface font-medium"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {link.icon}
              </span>
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-6 mt-auto">
        <Link
          href="/user-profile#payment-methods"
          className="block w-full text-center py-3 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl border border-primary/20 transition-all font-[family-name:var(--font-label)] uppercase tracking-widest"
        >
          Add Payment Method
        </Link>
      </div>
    </aside>
  );
}
