"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Booking = {
  _id: string;
  status: string;
  paymentStatus: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  duration: number;
  vehicleDetails?: {
    model?: string;
    licensePlate?: string;
    color?: string;
  };
  parkingId?: {
    _id: string;
    name: string;
    location: string;
    city: string;
    images?: string[];
  };
};

const fallbackImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCtNKLctsxMcamNRfBpNrhXWZUoNRKAGwRUzGIB5BfHw4mupF_FJCkbHLrK7VGTRmg2o_ByYr95kCdNLVWv-WiwNHLdKOcgn6OwFXK80GJf9b_P64ZHySrlzmSFpTasQfnNV_f5rCZJH5Q48J-8mjiyGawzMLULUpQ3j1NMUAYx9D8nC9_Z7jNGwSExKVAgqrUEM2B7E4sfLDWoeoBd24hD1naLcUwVfPZ1GSyy8IV-Knp4K-horTVl3wjPDyPDwSPVWv50o-iP58I";

function formatBDT(value: number) {
  return `BDT ${value.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function getBookingStatus(booking: Booking) {
  const now = new Date();
  const startTime = new Date(booking.startTime);
  const endTime = new Date(booking.endTime);

  if (now >= startTime && now <= endTime) return { label: "Active", color: "primary" };
  if (startTime > now) return { label: "Upcoming", color: "secondary" };
  return { label: "Completed", color: "tertiary" };
}

export default function MyBookingsContent() {
  const [activeTab, setActiveTab] = useState<"Active" | "Upcoming" | "Past">("Active");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, hours: 0, thisMonth: 0 });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setError("Please log in to view your bookings.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/bookings/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setError("Failed to load bookings.");
          setLoading(false);
          return;
        }

        const data = (await response.json()) as { data?: Booking[] };
        setBookings(data.data || []);

        // Calculate stats
        let totalHours = 0;
        let thisMonthHours = 0;
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        (data.data || []).forEach((b) => {
          totalHours += b.duration || 0;
          const bookingDate = new Date(b.startTime);
          if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
            thisMonthHours += b.duration || 0;
          }
        });

        setStats({
          total: data.data?.length || 0,
          hours: Math.round(totalHours),
          thisMonth: Math.round(thisMonthHours),
        });
      } catch (err) {
        setError("An error occurred while loading bookings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getTabButtonClasses = (tab: "Active" | "Upcoming" | "Past") =>
    `px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(163,166,255,0.3)] shrink-0 ${
      activeTab === tab
        ? "bg-primary-fixed text-on-primary-fixed"
        : "glass-card text-on-surface hover:bg-surface-container-highest"
    }`;

  const filteredBookings = bookings.filter((booking) => {
    const status = getBookingStatus(booking);
    return status.label === activeTab;
  });

  const displayBookings = activeTab === "Active" ? bookings.filter(b => {
    const now = new Date();
    const startTime = new Date(b.startTime);
    const endTime = new Date(b.endTime);
    return now >= startTime && now <= endTime;
  }) : activeTab === "Upcoming" ? bookings.filter(b => {
    const now = new Date();
    const startTime = new Date(b.startTime);
    return startTime > now;
  }) : bookings.filter(b => {
    const now = new Date();
    const endTime = new Date(b.endTime);
    return endTime <= now;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <span className="material-symbols-outlined text-primary text-5xl animate-pulse">bookmark</span>
        <p className="text-on-surface-variant">Loading your bookings...</p>
      </div>
    );
  }

  if (error && bookings.length === 0) {
    return (
      <div className="rounded-xl border border-error/30 bg-error/10 px-6 py-8 text-center">
        <span className="material-symbols-outlined text-error text-4xl mb-4">warning</span>
        <p className="text-on-surface">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Tabbed Navigation */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
        <button onClick={() => setActiveTab("Active")} className={getTabButtonClasses("Active")}>
          Active
        </button>
        <button onClick={() => setActiveTab("Upcoming")} className={getTabButtonClasses("Upcoming")}>
          Upcoming
        </button>
        <button onClick={() => setActiveTab("Past")} className={getTabButtonClasses("Past")}>
          Past
        </button>
      </div>

      {/* Booking List Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {displayBookings.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">calendar_today</span>
              <p className="text-on-surface-variant">No {activeTab.toLowerCase()} bookings at the moment.</p>
              <Link href="/search-parking" className="mt-6 inline-block px-6 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:scale-105 transition-transform">
                Find Parking
              </Link>
            </div>
          ) : (
            displayBookings.map((booking) => {
              const parkingImage = booking.parkingId?.images?.[0] || fallbackImage;
              const statusInfo = getBookingStatus(booking);
              const isBorderPrimary = statusInfo.label === "Active";

              return (
                <div
                  key={booking._id}
                  className={`glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden ${
                    isBorderPrimary ? "border-primary/30" : "border-outline-variant/10"
                  } border`}
                >
                  <div className={`absolute inset-0 ${isBorderPrimary ? "bg-gradient-to-r from-primary/5 to-transparent" : ""} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={parkingImage}
                      alt="Parking"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline text-2xl font-bold text-on-surface">
                          {booking.parkingId?.name || "Parking Space"}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                            statusInfo.color === "primary"
                              ? "bg-primary/20 text-primary"
                              : statusInfo.color === "secondary"
                              ? "bg-secondary/20 text-secondary"
                              : "bg-tertiary/20 text-tertiary"
                          }`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-y-2 gap-x-6 text-on-surface-variant mb-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span className="text-sm">{booking.parkingId?.location || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span className="text-sm">{formatDate(booking.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          <span className="text-sm">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">payments</span>
                          <span className="text-sm font-semibold text-on-surface">{formatBDT(booking.totalPrice)}</span>
                        </div>
                      </div>
                      {booking.vehicleDetails && (
                        <p className="text-xs text-on-surface-variant">
                          {booking.vehicleDetails.model} • {booking.vehicleDetails.licensePlate}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {statusInfo.label === "Active" && (
                        <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-primary-dim text-white font-medium hover:brightness-110 active:scale-95 transition-all">
                          Extend Time
                        </button>
                      )}
                      <Link
                        href={`/parking-details?parkingId=${booking.parkingId?._id}`}
                        className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-all"
                      >
                        View Details
                      </Link>
                      {statusInfo.label !== "Completed" && (
                        <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-error/30 text-error hover:bg-error/10 active:scale-95 transition-all">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Info (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Stats */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-primary relative overflow-hidden">
            <h4 className="font-headline font-bold text-lg mb-4 text-on-surface">Booking Metrics</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Total Bookings</span>
                <span className="text-xl font-bold text-primary">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Hours Logged</span>
                <span className="text-xl font-bold text-secondary">{stats.hours}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">This Month</span>
                <span className="text-xl font-bold text-tertiary">{stats.thisMonth}h</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(163,166,255,0.5)]"
                  style={{ width: `${Math.min((stats.hours / 200) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Assistance Card */}
          <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-primary/10 to-transparent border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              help
            </span>
            <h4 className="font-headline font-bold text-lg mb-2 text-on-surface">Need Help?</h4>
            <p className="text-sm text-on-surface-variant mb-6">Our support team is available 24/7 to assist with your bookings.</p>
            <Link href="/help-support" className="w-full block text-center py-2.5 rounded-lg bg-surface-container-highest text-primary font-semibold hover:bg-primary-container/20 transition-all border border-primary/20">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}