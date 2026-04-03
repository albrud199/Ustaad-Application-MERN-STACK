import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = { title: "Booking Management | Ustaad" };

export default function BookingManagementPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-2 text-on-surface font-[family-name:var(--font-headline)]">
                    Booking <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Management</span>
                </h1>
                <p className="text-on-surface-variant text-lg font-[family-name:var(--font-body)]">Coordinate your parking space availability and incoming reservations.</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest border border-outline-variant/30 rounded-xl font-bold hover:bg-surface-variant transition-colors group text-sm">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">download</span>
                    Export Log
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold shadow-[0_4px_20px_rgba(163,166,255,0.2)] hover:shadow-[0_4px_25px_rgba(163,166,255,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Manual Entry
                </button>
            </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Calendar & Table */}
            <div className="xl:col-span-8 flex flex-col gap-8">
                
                {/* Calendar View Container */}
                <section className="glass-card rounded-3xl p-6 lg:p-8 border border-outline-variant/15 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">calendar_month</span>
                            Schedule View
                        </h3>
                        <div className="flex items-center gap-4 bg-surface-container-low rounded-lg p-1 border border-outline-variant/10">
                            <button className="p-1 rounded bg-surface shadow text-on-surface">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <span className="text-sm font-bold font-[family-name:var(--font-headline)] min-w-[100px] text-center">October 2023</span>
                            <button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Simplified Calendar Grid Layout */}
                    <div className="flex-1 border border-outline-variant/10 rounded-2xl overflow-hidden flex flex-col bg-surface/30">
                        {/* Days Header */}
                        <div className="grid grid-cols-7 border-b border-outline-variant/10 bg-surface-container-lowest/50">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-2 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)] border-r border-outline-variant/5 last:border-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {/* Calendar Body (Mockup of 2 weeks) */}
                        <div className="flex-1 grid grid-rows-2">
                            {/* Week 1 */}
                            <div className="grid grid-cols-7 border-b border-outline-variant/10">
                                <div className="p-2 border-r border-outline-variant/5 bg-surface-container-lowest/20"><span className="text-xs text-on-surface-variant/50">1</span></div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">2</span></div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">3</span></div>
                                <div className="p-2 border-r border-outline-variant/5 relative bg-primary/5">
                                    <span className="text-xs font-bold text-primary">4</span>
                                    <div className="mt-1 flex flex-col gap-1">
                                        <div className="h-1 w-full bg-primary rounded-full"></div>
                                        <div className="h-1 w-full bg-secondary rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">5</span></div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">6</span></div>
                                <div className="p-2"><span className="text-xs font-medium text-error">7</span></div>
                            </div>
                            {/* Week 2 */}
                            <div className="grid grid-cols-7 border-b border-outline-variant/10">
                                <div className="p-2 border-r border-outline-variant/5 relative">
                                    <span className="text-xs font-medium text-error">8</span>
                                    <div className="mt-1 flex flex-col gap-1"><div className="h-1 w-[80%] bg-tertiary rounded-full"></div></div>
                                </div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">9</span></div>
                                <div className="p-2 border-r border-outline-variant/5 relative">
                                    <span className="text-xs font-medium">10</span>
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                                </div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">11</span></div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">12</span></div>
                                <div className="p-2 border-r border-outline-variant/5"><span className="text-xs font-medium">13</span></div>
                                <div className="p-2"><span className="text-xs font-medium text-error">14</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Incoming Requests Table */}
                <section className="glass-card rounded-3xl p-6 lg:p-8 border border-outline-variant/15 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">Incoming Requests</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-lg border border-secondary/20">3 Pending</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-outline-variant/20 text-xs uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)]">
                                    <th className="font-medium py-3 px-4">Customer</th>
                                    <th className="font-medium py-3 px-4">Space & Time</th>
                                    <th className="font-medium py-3 px-4">Duration</th>
                                    <th className="font-medium py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-[family-name:var(--font-body)] text-sm divide-y divide-outline-variant/10">
                                {/* Row 1 */}
                                <tr className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer relative">
                                    <td className="py-4 px-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-on-surface select-none">
                                            MK
                                        </div>
                                        <div>
                                            <span className="block font-bold text-on-surface group-hover:text-primary transition-colors">Mirza Khan</span>
                                            <span className="text-xs text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">directions_car</span> Toyota Axio (2018)</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="block font-medium text-on-surface">Level 1 - Alpha</span>
                                        <span className="text-xs text-on-surface-variant">Today, 14:30 PM</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="block font-bold text-on-surface">4 Hours</span>
                                        <span className="text-xs text-on-surface-variant font-mono">৳ 320</span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary hover:text-on-primary transition-colors">Accept</button>
                                            <button className="px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-variant text-on-surface-variant text-xs transition-colors">Decline</button>
                                        </div>
                                        <div className="group-hover:hidden text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded inline-block border border-secondary/20">Needs Action</div>
                                    </td>
                                </tr>
                                
                                {/* Row 2 */}
                                <tr className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer relative">
                                    <td className="py-4 px-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-on-surface select-none">
                                            SJ
                                        </div>
                                        <div>
                                            <span className="block font-bold text-on-surface group-hover:text-primary transition-colors">Sonia Jahan</span>
                                            <span className="text-xs text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">directions_car</span> Honda Civic (2021)</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="block font-medium text-on-surface">EV Charging Hub</span>
                                        <span className="text-xs text-on-surface-variant">Oct 5, 09:00 AM</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="block font-bold text-on-surface">6 Hours</span>
                                        <span className="text-xs text-on-surface-variant font-mono">৳ 850</span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2 bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-lg border border-success/20 inline-flex">
                                            <span className="material-symbols-outlined text-sm">check_circle</span> Confirmed
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Right Column: Controls & Preview */}
            <div className="xl:col-span-4 flex flex-col gap-8">
                
                {/* Quick Capacity Control */}
                <section className="glass-card rounded-3xl p-6 lg:p-8 border border-outline-variant/15 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-[30px] pointer-events-none"></div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-6 text-on-surface">Capacity Status</h3>
                    
                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="relative w-36 h-36 flex items-center justify-center">
                            {/* Circular progress representation */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="72" cy="72" r="64" fill="none" className="stroke-surface-container-highest" strokeWidth="12" />
                                <circle cx="72" cy="72" r="64" fill="none" className="stroke-primary" strokeWidth="12" strokeDasharray="402.12" strokeDashoffset="80.42" strokeLinecap="round" />
                            </svg>
                            <div className="text-center relative z-10 flex flex-col items-center">
                                <span className="text-3xl font-extrabold font-[family-name:var(--font-headline)] text-on-surface tracking-tighter">80%</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-[family-name:var(--font-label)]">Full</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/10">
                            <span className="block text-2xl font-bold text-on-surface mb-1 font-[family-name:var(--font-headline)]">40</span>
                            <span className="text-[10px] uppercase text-on-surface-variant font-bold tracking-widest font-[family-name:var(--font-label)]">Occupied</span>
                        </div>
                        <div className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/10">
                            <span className="block text-2xl font-bold text-primary mb-1 font-[family-name:var(--font-headline)]">10</span>
                            <span className="text-[10px] uppercase text-primary font-bold tracking-widest font-[family-name:var(--font-label)]">Available</span>
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-surface-container-highest border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-sm">block</span>
                        Toggle Stop-Sell
                    </button>
                    <p className="text-[10px] text-center text-on-surface-variant mt-3 italic font-[family-name:var(--font-body)]">Pause all incoming requests temporarily.</p>
                </section>

                {/* Selected Booking Preview */}
                <section className="glass-card rounded-3xl p-6 lg:p-8 border border-outline-variant/15 flex-1 ring-1 ring-primary/20 shadow-[0_0_30px_rgba(163,166,255,0.05)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-lg font-bold font-[family-name:var(--font-headline)] text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary">visibility</span>
                            Details Preview
                        </h3>
                        <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-widest border border-primary/20">Selected</span>
                    </div>

                    <div className="relative h-32 rounded-xl overflow-hidden mb-6 border border-outline-variant/20 shadow-inner group-hover:border-primary/40 transition-colors">
                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXzL003juOJ1RdgiYBAuJb8zshl672PGWt17QjSk9QLVKyKDo3e9Id0JwmOWYIDNvgb5cxiPFAISzY_Qo78pjkuV65hGRXtZPQC756lXqmoFTf9ISddN1JCu30HHqxTuoR-IgyvOLEAz0KxDGYLEEbLt5djN1oUe4ai5qu6u-tMODgid7IgARY0WTaVK5rK-n2T4Pt4bc0x5utcKChYLg8MToJwDzav6vbtD8_Ge-Vz6Cjk0R9UQuHamQTn2Pjvy5qvTBQeM7yZI" alt="Location" fill className="object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-th from-surface to-transparent opacity-80"></div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-surface/80 backdrop-blur-md px-2 py-1.5 rounded-lg border border-outline-variant/20 shadow-sm">
                            <span className="material-symbols-outlined text-xs text-primary">pin_drop</span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">Level 1 - Alpha</span>
                        </div>
                    </div>

                    <div className="space-y-4 font-[family-name:var(--font-body)] relative z-10">
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)] mb-1">Customer Name</span>
                            <p className="font-semibold text-on-surface text-base">Mirza Khan</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)] mb-1">Vehicle Plate</span>
                                <p className="font-mono bg-surface-container-low px-2 py-1 rounded inline-block text-sm border border-outline-variant/10 text-on-surface">DHA-12-3456</p>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)] mb-1">Duration</span>
                                <p className="font-semibold text-on-surface text-sm">14:30 - 18:30 <span className="text-secondary ml-1">(4h)</span></p>
                            </div>
                        </div>
                        <div className="pt-4 mt-2 border-t border-outline-variant/10">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-[family-name:var(--font-label)] mb-1">Contact Info</span>
                            <p className="text-sm font-medium text-on-surface flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-[14px] text-primary">call</span> +880 1712-345678
                            </p>
                        </div>
                    </div>
                </section>

            </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
