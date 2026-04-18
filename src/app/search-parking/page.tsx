"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import ParkingMap from "@/components/ParkingMap";
import AuthGateButton from "@/components/AuthGateButton";
import Link from "next/link";
import Image from "next/image";

type VehicleType = "sedan" | "suv" | "truck" | "ev" | "motorbike";

type ParkingItem = {
  _id: string;
  name: string;
  location: string;
  city: string;
  latitude?: number;
  longitude?: number;
  pricePerHour: number;
  ratings?: { average?: number; count?: number };
  images?: string[];
  allowedVehicleTypes?: string[];
  facilities?: string[];
};

const fallbackCoverImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuD-w5IMCEqd2sdOUxfTmlMwaerP4rNQ0KKA946DH1Nas7xo61e-mUbRdEggOtEzxxPNZZtc1Z3sODDCUqHvDzn95Y80MzrX8EPztxn-4bnidl-xSy9OzDpW1bWjY5wgraQLVWeZlI83gBlZg_lhkrMiYKXdbo2X4mdeSEdxSzdWltwtyJAsxNqN635hkiUjPHv56grY1TMCkun0jj40g1c_-KZ6MJUWEaZm8-CiTPSicMUPA_trOHNohnxA_e43hvbudhHZ2tOyNIo";

function imageLoader({ src }: { src: string }) {
  return src;
}

export default function SearchParkingPage() {
  const [parkings, setParkings] = useState<ParkingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParkingId, setSelectedParkingId] = useState<string>("");

  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState<VehicleType>("sedan");
  const [minPrice, setMinPrice] = useState(5);
  const [maxPrice, setMaxPrice] = useState(60);

  useEffect(() => {
    const loadParkings = async () => {
      try {
        const res = await fetch("/api/parkings?status=active&limit=100");
        const data = (await res.json()) as { data?: ParkingItem[] };
        setParkings(data.data || []);
      } catch {
        setParkings([]);
      } finally {
        setLoading(false);
      }
    };

    loadParkings();
  }, []);

  const filtered = useMemo(() => {
    return parkings.filter((p) => {
      if (destination) {
        const hay = `${p.name} ${p.city} ${p.location}`.toLowerCase();
        if (!hay.includes(destination.toLowerCase())) return false;
      }

      if (p.pricePerHour < minPrice || p.pricePerHour > maxPrice) return false;

      const allowed = p.allowedVehicleTypes || ["sedan", "suv", "truck", "ev", "motorbike"];
      if (!allowed.includes(vehicle)) return false;

      return true;
    });
  }, [parkings, destination, minPrice, maxPrice, vehicle]);

  const reset = () => {
    setDestination("");
    setVehicle("sedan");
    setMinPrice(5);
    setMaxPrice(60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />

      <main className="pt-[80px] flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative z-10">
        <aside className="w-full md:w-[360px] bg-surface-variant/40 backdrop-blur-3xl border-r border-outline-variant/15 p-6 overflow-y-auto flex flex-col gap-8 z-40">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-xl font-bold text-on-surface tracking-tight">Navigation Filters</h2>
            <button onClick={reset} className="text-xs font-label uppercase tracking-widest text-primary hover:text-primary-container transition-colors">Reset All</button>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Destination</label>
            <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Area, city, or garage name" className="w-full bg-surface-container-highest/50 border border-outline-variant/15 rounded-xl py-3 px-4 text-sm text-on-surface" />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Vehicle Type</label>
            <div className="flex flex-wrap gap-2">
              {(["sedan", "suv", "truck", "ev", "motorbike"] as VehicleType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicle(type)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border ${
                    vehicle === type
                      ? "bg-primary-container text-on-primary-container border-primary/20"
                      : "bg-surface-container-highest/50 text-on-surface-variant border-outline-variant/15"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Price Range</label>
              <span className="text-xs text-primary font-medium">BDT {minPrice} - BDT {maxPrice}/hr</span>
            </div>
            <input type="range" min={5} max={100} value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
            <input type="range" min={5} max={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </div>

          <button className="mt-auto w-full py-4 bg-linear-to-r from-primary-dim to-primary text-on-primary-fixed font-bold rounded-xl">
            {loading ? "Loading..." : `${filtered.length} Parking Option(s)`}
          </button>
        </aside>

        <section className="flex-1 relative flex flex-col md:flex-row gap-0">
          {/* Map Section */}
          <div className="hidden md:flex flex-1 relative border-l border-outline-variant/15 z-20">
            <ParkingMap 
              parkings={filtered} 
              selectedId={selectedParkingId}
              onSelectParking={setSelectedParkingId}
            />
          </div>

          {/* List Section */}
          <div className="w-full md:w-[360px] bg-surface-variant/40 backdrop-blur-3xl border-l border-outline-variant/15 flex flex-col z-30 h-full">
            <div className="p-6 border-b border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg">Foundations ({filtered.length})</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!loading && filtered.length === 0 && (
                <div className="p-6 rounded-xl border border-outline-variant/20 text-on-surface-variant text-sm text-center">
                  No parking space matches your selected filters.
                </div>
              )}

              {filtered.map((parking) => {
                const cover = parking.images?.find((image) => Boolean(image?.trim()))?.trim() || fallbackCoverImage;
                const isSelected = selectedParkingId === parking._id;
                
                return (
                  <div 
                    key={parking._id} 
                    onClick={() => setSelectedParkingId(parking._id)}
                    className={`group p-4 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(163,166,255,0.3)]"
                        : "bg-surface-container-low/60 border-outline-variant/10 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 relative">
                        <Image
                          src={cover}
                          alt="Parking spot"
                          fill
                          loader={imageLoader}
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-on-surface truncate pr-2">{parking.name}</h4>
                          <div className="text-primary font-bold text-lg leading-none">BDT {parking.pricePerHour}<span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-tighter ml-0.5">/hr</span></div>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">{parking.location}, {parking.city}</p>
                        <p className="text-[11px] text-on-surface-variant mt-2">Allowed: {(parking.allowedVehicleTypes || []).join(", ")}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/parking-details?parkingId=${encodeURIComponent(parking._id)}`} className="flex-1 py-2 bg-surface-container-highest flex justify-center text-on-surface rounded-lg text-xs font-bold hover:bg-surface-bright transition-colors">Details</Link>
                      <AuthGateButton href={`/checkout?parkingId=${parking._id}&parkingName=${encodeURIComponent(parking.name)}&location=${encodeURIComponent(`${parking.location}, ${parking.city}`)}&rate=${parking.pricePerHour}&date=${new Date().toISOString().slice(0, 10)}&start=14:00&end=18:00&currency=BDT`} returnTo="/search-parking" className="flex-1 py-2 bg-primary-dim text-white rounded-lg text-xs font-bold hover:bg-primary transition-colors">Book Spot</AuthGateButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
