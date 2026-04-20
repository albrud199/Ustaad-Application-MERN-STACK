"use client";

import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import AuthGateButton from "@/components/AuthGateButton";
import LocationPreviewMap from "@/components/LocationPreviewMap";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ParkingDetails = {
  _id: string;
  name: string;
  description?: string;
  location: string;
  city: string;
  latitude?: number;
  longitude?: number;
  pricePerHour: number;
  totalSpots?: number;
  availableSpots?: number;
  images?: string[];
  facilities?: string[];
  allowedVehicleTypes?: string[];
  ratings?: { average?: number; count?: number };
  status?: string;
};

const fallbackImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQKdWm-c57eSgYKuXMG0KV1JqevUADs2kr8ygd5HB6UNRrkqgf_cw7dFs2D6Vtk8Sdpudbri0ZM3265ZQFCguI5N3HypgeoY2lTVbh56FxiY5kL1svX-pjxP0ej8HiAtH5-ku4iW8p_YaTFX9BWQxOQ_f0Y0rhlq_-vz6oscSpWCyqJnUCgE7IyA_vyw3jOyt4wqLHOfxJzPUW8kG2ItKaVi8M0sPAqO6tcij0pYz4gPSF8aURc01j-NhChOGmIJz8MUgJ5YsiunY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAztVKt_6pSI0ZEv95khWl95mk8UyiCmmNNyvKgRjGgbVa4Fg6PoK0k9YEfj8y2_NcjSRsLPTlMPQ4rHT7ZHf_HaFLWtk2XXdKydOr_g7E7EGEFB_-KfovJxdioSeBj_YDtM40_Dx31LU4nMQxW9W5Yp_a_ANbCUxbDT2W13XnArRponW5R3K2TYw2ch42_s0KHhAkJPyEYte6FStrgZ85feJH1By8gm3f_WgVRfvdscJ2IiKmE-JtqaO1ls_9S5v9tHqdUQrlHlNc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqYRQFZ2QduwrwIvtG8ymwIpfmY1RikjyatWeJMZ3lzN2wU3VtDeB_7n6rJ60m__UbcKcl7tOlpQISWWuqXHoeooBKgNAZRNBREmRNuzGBuRNSJk_D7tj4zJjNEkrnl3AlTxVEBDZ0dLWgnEJwzFndJeS79re7khBtyAZPvqteqWjUdHwQTJ1vFTJQ5dU5bj5cVWxuuT9L93P01pgmSo8um8Kw3odvb1RqV7eo8hSDXyi8NdahBtS2Crzf17GMImK2P4wKCQuNA7g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBSlCFx3AokK3PHk1c5_PGJSLExqTAGwJJ-YE7Ci5PEZvFok69K1n_CBM-fjvm94ECkhPsTHOwGzVuPCbcXsj2rPi-0rEMf6yW-4I_1P56VLyPQkA9zYCQlSHp4V9pJYiwKgeNlXLvFBpf10BADRed_zNUwTih2jyqniKbqFGvyujz2m3UxhwHdfh3WIVIUX23ShvUvbS41hpYD3cPx0XNKsXXPPUrngMFALaC6qRuV2iWSXZxlgwTn3DYmTVDHvu4AbNRAA8YU6Xc",
];

function facilityIcon(name: string) {
  const key = name.toLowerCase();
  if (key.includes("cctv") || key.includes("camera")) return "videocam";
  if (key.includes("ev") || key.includes("charg")) return "ev_station";
  if (key.includes("guard") || key.includes("security")) return "security";
  if (key.includes("light")) return "emoji_objects";
  return "check_circle";
}

function hoursBetween(startTime: string, endTime: string) {
  if (!startTime || !endTime) return 4;

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const start = startHours + startMinutes / 60;
  let end = endHours + endMinutes / 60;

  if (end <= start) end += 24;
  return Math.max(0.5, end - start);
}

export default function ParkingDetailsPage() {
  const searchParams = useSearchParams();
  const parkingId = searchParams.get("parkingId") || "";

  const [parking, setParking] = useState<ParkingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    const loadParking = async () => {
      if (!parkingId) {
        setError("Parking details not found. Please open from Find Parking.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/parkings/${parkingId}`);
        const data = (await res.json()) as { data?: ParkingDetails; error?: string };
        if (!res.ok || !data.data) {
          setError(data.error || "Failed to load parking details.");
          setParking(null);
        } else {
          setParking(data.data);
        }
      } catch {
        setError("Failed to load parking details.");
        setParking(null);
      } finally {
        setLoading(false);
      }
    };

    loadParking();
  }, [parkingId]);

  const gallery = useMemo(() => {
    if (!parking?.images?.length) return fallbackImages;
    const cleaned = parking.images.filter(Boolean);
    return cleaned.length ? cleaned : fallbackImages;
  }, [parking]);

  const ratingAverage = parking?.ratings?.average ?? 5;
  const ratingCount = parking?.ratings?.count ?? 0;

  const durationHours = useMemo(() => hoursBetween(startTime, endTime), [startTime, endTime]);
  const subtotal = useMemo(() => (parking?.pricePerHour || 0) * durationHours, [parking?.pricePerHour, durationHours]);
  const serviceFee = useMemo(() => subtotal * 0.05, [subtotal]);
  const platformFee = useMemo(() => durationHours * 10, [durationHours]);
  const total = subtotal + serviceFee + platformFee;

  return (
    <>
      <NebulaBackground />
      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {loading && (
          <div className="mb-10 rounded-2xl border border-outline-variant/20 bg-surface-container-low px-6 py-5 text-on-surface-variant">
            Loading parking details...
          </div>
        )}

        {!loading && error && (
          <div className="mb-10 rounded-2xl border border-error/30 bg-error/10 px-6 py-5 text-error">
            {error}
          </div>
        )}

        {!loading && !error && parking && (
          <>
            <div className="mb-12">
              <div className="flex items-center gap-2 text-on-surface-variant mb-4 text-sm font-[family-name:var(--font-label)] uppercase tracking-widest">
                <Link href="/search-parking" className="hover:text-primary transition-colors">Parking</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>{parking.city}</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary">{parking.name}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-4 text-on-surface">{parking.name}</h1>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-bold text-lg">{ratingAverage.toFixed(1)}</span>
                      <span className="text-on-surface-variant font-normal text-sm ml-1">({ratingCount} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined">location_on</span>
                      <span>{parking.location}, {parking.city}, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-16 overflow-hidden rounded-3xl border border-outline-variant/20">
              <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
                <Image src={gallery[0]} alt={`${parking.name} main view`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden">
                <Image src={gallery[1] || gallery[0]} alt={`${parking.name} view 2`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden">
                <Image src={gallery[2] || gallery[0]} alt={`${parking.name} view 3`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="md:col-span-2 relative group cursor-pointer overflow-hidden">
                <Image src={gallery[3] || gallery[0]} alt={`${parking.name} wide view`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-16">
                <section>
                  <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold mb-6 text-on-surface">Space Description</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg mb-4">
                    {parking.description || `${parking.name} is a trusted parking location in ${parking.city}. Access is convenient from ${parking.location}, with easy booking and hourly BDT pricing.`}
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold mb-8 text-on-surface">Offered Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    {(parking.facilities?.length ? parking.facilities : ["CCTV", "Guarded", "Well Lit"]).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                          <span className="material-symbols-outlined">{facilityIcon(amenity)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{amenity}</div>
                          <div className="text-sm text-on-surface-variant">Available at this parking place</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold text-on-surface mb-6">Location</h3>
                  <LocationPreviewMap
                    latitude={parking.latitude}
                    longitude={parking.longitude}
                    title={parking.name}
                    subtitle={`${parking.location}, ${parking.city}`}
                  />
                </section>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-28 glass-card rounded-3xl p-8 shadow-2xl border border-primary/20 bg-surface-variant/30 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-3xl font-[family-name:var(--font-headline)] text-on-surface font-extrabold">BDT {parking.pricePerHour}</span>
                      <span className="text-on-surface-variant"> / hr</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-on-surface-variant ml-1">Select Date</label>
                      <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl py-3.5 px-4" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-on-surface-variant ml-1">Check-in</label>
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl py-3.5 px-4" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-on-surface-variant ml-1">Check-out</label>
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl py-3.5 px-4" />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/30 space-y-4">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>BDT {parking.pricePerHour} x {durationHours.toFixed(1)} hours</span>
                        <span>BDT {subtotal.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Service Fee (5%)</span>
                        <span>BDT {serviceFee.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Platform Fee (BDT 10/hour)</span>
                        <span>BDT {platformFee.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2 text-on-surface">
                        <span>Total</span>
                        <span className="text-primary">BDT {total.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <AuthGateButton
                      href={`/checkout?parkingId=${parking._id}&parkingName=${encodeURIComponent(parking.name)}&location=${encodeURIComponent(`${parking.location}, ${parking.city}`)}&rate=${parking.pricePerHour}&date=${bookingDate}&start=${startTime}&end=${endTime}&currency=BDT`}
                      returnTo={`/parking-details?parkingId=${encodeURIComponent(parking._id)}`}
                      className="w-full block text-center bg-linear-to-r from-primary to-primary-dim text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold py-4 rounded-xl"
                    >
                      Reserve Now
                    </AuthGateButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
