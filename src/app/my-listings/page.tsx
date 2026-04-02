import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "My Listings | Ustaad" };

export default function MyListingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden relative">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-8 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Hero Header Section */}
        <div className="mb-16">
            <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-on-surface">
                My <span className="text-primary">Listings</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl font-[family-name:var(--font-body)]">
                Manage your parking inventory across the city. Monitor real-time status, adjust pricing, and track your celestial revenue streams.
            </p>
        </div>

        {/* Management Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Listing Card 1: Active */}
            <div className="glass-card rounded-xl p-6 flex flex-col group hover:border-primary/30 transition-all duration-500 border border-outline-variant/15">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhci0AppFM8N3hVk-WhjXqT8Zwc9HsdrE_D8FsGuGvPelpKlT6bWHno7MBMtMIcqjRniBNjyh_Pe1YcfoCSLIB59jMI8VJlQWghmjnETkkmQ4eWPwb5_6lZRZ4k8BS165l35nU0JUD2xJcc3ycxkIbdhu1qOd7ejMP_GD7DyOaC7OmrqZz8tkwWOTRkeCcfK3kWnAwRPQ4njnsVGkmcsxKZ67xPrS3TSQ0RBvlz9x7QQQ3Db4lI9ln3EQCLeGE80ZPyoYSY-oyFPM" alt="Parking" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-secondary px-3 py-1 rounded-full text-[10px] font-bold text-on-secondary tracking-widest uppercase shadow-lg">
                        Active
                    </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold mb-1 text-on-surface">Galaxy Point North</h3>
                        <p className="text-on-surface-variant text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Banani Block C, Dhaka
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold">4.5</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Hourly</div>
                        <div className="text-primary-fixed-dim font-[family-name:var(--font-headline)] font-bold">৳50</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Daily</div>
                        <div className="text-primary-fixed-dim font-[family-name:var(--font-headline)] font-bold">৳400</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Monthly</div>
                        <div className="text-primary-fixed-dim font-[family-name:var(--font-headline)] font-bold">৳8.5k</div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant text-sm">Monthly Revenue</span>
                        <span className="text-on-surface font-[family-name:var(--font-headline)] font-extrabold text-lg">৳45,000</span>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/edit-parking" className="flex-1 bg-surface-container-highest hover:bg-surface-variant text-on-surface py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center border border-outline-variant/30">Edit</Link>
                        <Link href="/garage-analytics" className="p-2 bg-primary-dim/20 text-primary-fixed-dim rounded-xl flex items-center justify-center hover:bg-primary-dim/30 transition-all">
                            <span className="material-symbols-outlined">analytics</span>
                        </Link>
                        <button className="p-2 bg-error/10 text-error-dim rounded-xl hover:bg-error/20 transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined">block</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Listing Card 2: Pending Approval */}
            <div className="glass-card rounded-xl p-6 flex flex-col group hover:border-tertiary/30 transition-all duration-500 opacity-90 border border-outline-variant/15">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFq8oS6aFCWKeJKEWHnKbbbDGkmfQ9Wcd0g6kzqkWsRwk44urTxXHRw5LHBuKqa4mQcsaey-We2HmIBDyVgxhzcqp9zP86BbDwt30PJHJCAXFoCeGzIQTNkfDOxmLm71X42iX2EQO2LWmRQMahKzvCUR1sHlBOK_gmeSMdbqWLTroWGg-XeF0eNiHBkuuUS7muq0OhWWWx4MzDaGN0HSQBn6Nstv6BqpGwAQPTLK3mtiZFdNREwRmq40l4svX8pTDDo6rX4E0ZHpI" alt="Pending Parking" fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.3]" />
                    <div className="absolute top-4 right-4 bg-tertiary px-3 py-1 rounded-full text-[10px] font-bold text-on-tertiary tracking-widest uppercase shadow-lg">
                        Pending Approval
                    </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold mb-1 text-on-surface">Orbit Plaza</h3>
                        <p className="text-on-surface-variant text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Gulshan 2, Dhaka
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/40">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold">--</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Hourly</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳80</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Daily</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳600</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Monthly</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳12k</div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center italic">
                        <span className="text-on-surface-variant text-sm">Awaiting verification...</span>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/edit-parking" className="flex-1 bg-surface-container-highest hover:bg-surface-variant text-on-surface py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center border border-outline-variant/30">Edit Details</Link>
                        <button className="p-2 bg-surface-container-highest text-outline rounded-xl cursor-not-allowed flex items-center justify-center border border-outline-variant/30 opacity-50">
                            <span className="material-symbols-outlined">analytics</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Listing Card 3: Inactive */}
            <div className="glass-card rounded-xl p-6 flex flex-col group hover:border-error/30 transition-all duration-500 opacity-60 border border-outline-variant/15 hover:opacity-100">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA75bRjpQ1lp6Bx35KqW7U_1I1S-yaTkbu8POgrj_k7TKCgUd3SFKTARwRpmbGc0vEiDQrNaxxGhapGMKX43CEszrxD6x8hzLJBKOH-e9mMCIx8YIAiSsGMMkwQMsr-BKGy-gGNLCsrRn5SEZr1xMA2iz6cPOj9TDX_1CypoAFbT-DufUBC4ldm1X2ofjkk1G8De3F4bR0rzOh-lGXZ0rnAzs6mQ_iVTzpAOuuj7eVOs8JP928Sq3WG6oZYkOBVM0RAnNrpjqeMQ8g" alt="Inactive Parking" fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale" />
                    <div className="absolute top-4 right-4 bg-outline-variant px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant tracking-widest uppercase shadow-lg">
                        Inactive
                    </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold mb-1 text-on-surface">Starlight Gated</h3>
                        <p className="text-on-surface-variant text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Uttara Sector 7
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold">4.8</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Hourly</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳40</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Daily</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳300</div>
                    </div>
                    <div className="bg-surface-container-high rounded-lg p-2 border border-outline-variant/10">
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Monthly</div>
                        <div className="text-on-surface-variant font-[family-name:var(--font-headline)] font-bold">৳6k</div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant text-sm">Last Mth Revenue</span>
                        <span className="text-on-surface-variant font-[family-name:var(--font-headline)] font-extrabold text-lg">৳22,500</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-primary text-on-primary py-2 rounded-xl text-sm font-semibold transition-all hover:brightness-110">Enable Listing</button>
                        <Link href="/edit-parking" className="p-2 bg-surface-container-highest text-on-surface rounded-xl hover:bg-surface-variant transition-all border border-outline-variant/30 flex items-center justify-center">
                            <span className="material-symbols-outlined">edit</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Action Card: New Listing */}
            <Link href="/add-parking" className="border-2 border-dashed border-outline-variant/30 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[400px] h-full">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/20 transition-all shadow-lg">
                    <span className="material-symbols-outlined text-3xl text-primary">add_circle</span>
                </div>
                <div className="text-center">
                    <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface">Add New Space</h3>
                    <p className="text-on-surface-variant text-sm mt-2">Monetize your empty parking slot</p>
                </div>
            </Link>

        </div>
      </main>

      {/* FAB */}
      <Link href="/add-parking" className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-fixed to-primary-dim rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-on-primary-fixed hover:scale-110 active:scale-90 transition-all z-40">
          <span className="material-symbols-outlined text-3xl">add</span>
      </Link>

      <Footer />
    </div>
  );
}
