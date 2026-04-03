import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import MyBookingsContent from "./my-bookings-content";

export const metadata = { title: "My Bookings | Ustaad" };

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-on-surface">My Bookings</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Track and manage your celestial reservations across all Ustaad services.</p>
        </div>

        {/* Content with state management */}
        <MyBookingsContent />
      </main>
      
      <Footer />
    </div>
  );
}
