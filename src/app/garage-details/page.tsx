"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NebulaBackground from "@/components/NebulaBackground";
import AuthGateButton from "@/components/AuthGateButton";
import LocationPreviewMap from "@/components/LocationPreviewMap";

type GarageDetails = {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ratings?: { average?: number; count?: number };
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  capacity: number;
  availableSpots: number;
};

type ParkingItem = {
  _id: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  totalSpots?: number;
  availableSpots?: number;
  images?: string[];
};

export default function GarageDetailsPage() {
  return (
    <Suspense fallback={<GarageDetailsLoadingFallback />}>
      <GarageDetailsContent />
    </Suspense>
  );
}

function GarageDetailsLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />
      <main className="pt-32 pb-24 max-w-6xl mx-auto w-full px-6 md:px-8 relative z-10">
        <div className="text-on-surface-variant">Loading garage details...</div>
      </main>
      <Footer />
    </div>
  );
}

function GarageDetailsContent() {
  const searchParams = useSearchParams();
  const ownerId = searchParams.get("ownerId") || "";

  const [garage, setGarage] = useState<GarageDetails | null>(null);
  const [parkings, setParkings] = useState<ParkingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!ownerId) {
        setError("Garage details not found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/garages/${encodeURIComponent(ownerId)}`);
        const data = (await res.json()) as {
          garage?: GarageDetails;
          parkings?: ParkingItem[];
          error?: string;
        };

        if (!res.ok || !data.garage) {
          setError(data.error || "Failed to load garage details.");
          setLoading(false);
          return;
        }

        setGarage(data.garage);
        setParkings(data.parkings || []);
      } catch {
        setError("Failed to load garage details.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [ownerId]);

  const headline = useMemo(() => garage?.name || "Garage", [garage]);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />

      <main className="pt-32 pb-24 max-w-6xl mx-auto w-full px-6 md:px-8 relative z-10">
        {loading && <div className="text-on-surface-variant">Loading garage details...</div>}

        {!loading && error && (
          <div className="rounded-2xl border border-error/30 bg-error/10 px-6 py-4 text-error">{error}</div>
        )}

        {!loading && !error && garage && (
          <div className="space-y-10">
            <section className="glass-card rounded-3xl border border-outline-variant/20 p-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">Garage Profile</p>
                  <h1 className="text-4xl font-bold font-[family-name:var(--font-headline)] mt-2">{headline}</h1>
                  <p className="text-on-surface-variant mt-2">
                    {garage.location}, {garage.city}
                  </p>
                </div>
                <Link href="/search-parking" className="px-4 py-2 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors text-sm font-semibold">
                  Back to Map
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="rounded-xl bg-surface-container-high p-4 border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">Owner</p>
                  <p className="font-semibold mt-1">{garage.ownerName}</p>
                </div>
                <div className="rounded-xl bg-surface-container-high p-4 border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">Rated</p>
                  <p className="font-semibold mt-1">{(garage.ratings?.average || 5).toFixed(1)} ({garage.ratings?.count || 0} reviews)</p>
                </div>
                <div className="rounded-xl bg-surface-container-high p-4 border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">Capacity</p>
                  <p className="font-semibold mt-1">{garage.capacity || 0} total, {garage.availableSpots || 0} available</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)] mb-4">Garage Location</h2>
              <LocationPreviewMap
                latitude={garage.latitude}
                longitude={garage.longitude}
                title={garage.name}
                subtitle={`${garage.location}, ${garage.city}`}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)] mb-5">Available Parking Listings</h2>
              {parkings.length === 0 && (
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container p-5 text-on-surface-variant text-sm">
                  No active parking listings for this garage yet.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {parkings.map((parking) => (
                  <article key={parking._id} className="rounded-2xl border border-outline-variant/20 bg-surface-container p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-surface-container-high">
                        <Image
                          src={parking.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuD-w5IMCEqd2sdOUxfTmlMwaerP4rNQ0KKA946DH1Nas7xo61e-mUbRdEggOtEzxxPNZZtc1Z3sODDCUqHvDzn95Y80MzrX8EPztxn-4bnidl-xSy9OzDpW1bWjY5wgraQLVWeZlI83gBlZg_lhkrMiYKXdbo2X4mdeSEdxSzdWltwtyJAsxNqN635hkiUjPHv56grY1TMCkun0jj40g1c_-KZ6MJUWEaZm8-CiTPSicMUPA_trOHNohnxA_e43hvbudhHZ2tOyNIo"}
                          alt={parking.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{parking.name}</h3>
                        <p className="text-xs text-on-surface-variant mt-1">{parking.location}, {parking.city}</p>
                        <p className="text-sm text-primary font-bold mt-2">BDT {parking.pricePerHour}/hr</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/parking-details?parkingId=${encodeURIComponent(parking._id)}`}
                        className="text-center py-2 rounded-lg bg-surface-container-highest border border-outline-variant/20 text-sm font-semibold"
                      >
                        View Details
                      </Link>
                      <AuthGateButton
                        href={`/checkout?parkingId=${encodeURIComponent(parking._id)}&parkingName=${encodeURIComponent(parking.name)}&location=${encodeURIComponent(`${parking.location}, ${parking.city}`)}&rate=${parking.pricePerHour}&date=${new Date().toISOString().slice(0, 10)}&start=14:00&end=18:00&currency=BDT`}
                        returnTo={`/garage-details?ownerId=${encodeURIComponent(garage.ownerId)}`}
                        className="text-center py-2 rounded-lg bg-primary text-white text-sm font-semibold"
                      >
                        Book Now
                      </AuthGateButton>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
