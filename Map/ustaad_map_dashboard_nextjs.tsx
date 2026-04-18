"use client";

import {
  CarFront,
  LocateFixed,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
    initUstaadMap?: () => void;
  }
}

type Role = "car" | "garage";

type GaragePin = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  createdAt: number;
};

const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 }; // Dhaka
const STORAGE_KEY = "ustaad_garage_pins_v1";

const starterPins: GaragePin[] = [
  {
    id: "1",
    name: "Ustaad Auto Care",
    address: "Gulshan, Dhaka",
    lat: 23.7925,
    lng: 90.4078,
    createdAt: Date.now(),
  },
  {
    id: "2",
    name: "Premium Garage Hub",
    address: "Dhanmondi, Dhaka",
    lat: 23.7461,
    lng: 90.3742,
    createdAt: Date.now(),
  },
];

function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined")
      return reject(new Error("Window is unavailable."));
    if (window.google?.maps) return resolve();

    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps.")),
        {
          once: true,
        },
      );
      return;
    }

    window.initUstaadMap = () => resolve();
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initUstaadMap&libraries=places,marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps."));
    document.head.appendChild(script);
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function UstaadMapDashboard() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const routeRendererRef = useRef<any>(null);
  const garageMarkersRef = useRef<any[]>([]);
  const geocoderRef = useRef<any>(null);
  const placeAutocompleteRef = useRef<any>(null);
  const pinSearchAutocompleteRef = useRef<any>(null);

  const [role, setRole] = useState<Role>("car");
  const [pins, setPins] = useState<GaragePin[]>(starterPins);
  const [search, setSearch] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState("Ready to find a garage.");
  const [selectedPinId, setSelectedPinId] = useState<string | null>(
    starterPins[0]?.id ?? null,
  );
  const [addingMode, setAddingMode] = useState(false);
  const [garageName, setGarageName] = useState("");
  const [garageAddress, setGarageAddress] = useState("");
  const [garageLatLng, setGarageLatLng] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const filteredPins = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return pins;
    return pins.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.address.toLowerCase().includes(term) ||
        `${p.lat},${p.lng}`.includes(term),
    );
  }, [pins, search]);

  const selectedPin = filteredPins.find((p) => p.id === selectedPinId) || null;

  // Load from localStorage for a persistent demo experience.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as GaragePin[];
        if (Array.isArray(saved) && saved.length) {
          setPins(saved);
          setSelectedPinId(saved[0].id);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
    } catch {
      // ignore
    }
  }, [pins]);

  useEffect(() => {
    const key =
      apiKey || (import.meta as any)?.env?.VITE_GOOGLE_MAPS_API_KEY || "";
    if (!key) return;

    let mounted = true;

    loadGoogleMaps(key)
      .then(() => {
        if (!mounted || !mapRef.current || !window.google?.maps) return;

        const google = window.google;
        geocoderRef.current = new google.maps.Geocoder();

        const map = new google.maps.Map(mapRef.current, {
          center: DEFAULT_CENTER,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#0f172a" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#94a3b8" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#1e293b" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#06263f" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#132238" }],
            },
          ],
        });
        mapInstanceRef.current = map;

        routeRendererRef.current = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeWeight: 5,
          },
        });

        map.addListener("click", (e: any) => {
          if (role === "garage" && addingMode) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setGarageLatLng({ lat, lng });
            setStatus("Pin location selected. Add a name and save it.");

            if (geocoderRef.current) {
              geocoderRef.current.geocode(
                { location: { lat, lng } },
                (results: any, geocodeStatus: string) => {
                  if (geocodeStatus === "OK" && results?.[0]) {
                    setGarageAddress(results[0].formatted_address);
                  } else {
                    setGarageAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
                  }
                },
              );
            }
          }
        });

        const renderPins = () => {
          garageMarkersRef.current.forEach((m) =>
            m.setMap ? m.setMap(null) : null,
          );
          garageMarkersRef.current = [];

          const bounds = new google.maps.LatLngBounds();
          pins.forEach((pin) => {
            const marker = new google.maps.marker.AdvancedMarkerElement({
              map,
              position: { lat: pin.lat, lng: pin.lng },
              title: pin.name,
            });

            const info = new google.maps.InfoWindow({
              content: `
                <div style="font-family: Inter, Arial, sans-serif; min-width: 220px; padding: 4px 2px;">
                  <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">${pin.name}</div>
                  <div style="font-size: 13px; opacity: .85; margin-bottom: 8px;">${pin.address}</div>
                  <div style="font-size: 12px; color: #475569; margin-bottom: 10px;">${pin.lat.toFixed(5)}, ${pin.lng.toFixed(5)}</div>
                </div>
              `,
            });

            marker.addListener?.("click", () => {
              info.open({ map, anchor: marker });
              setSelectedPinId(pin.id);
            });

            garageMarkersRef.current.push(marker);
            bounds.extend(new google.maps.LatLng(pin.lat, pin.lng));
          });

          if (currentLocation)
            bounds.extend(
              new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
            );
          if (!bounds.isEmpty()) map.fitBounds(bounds, 64);
        };

        renderPins();

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const loc = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              };
              setCurrentLocation(loc);
              map.setCenter(loc);

              userMarkerRef.current?.setMap?.(null);
              userMarkerRef.current = new google.maps.Marker({
                map,
                position: loc,
                title: "Your location",
              });
            },
            () => {
              setStatus(
                "Location access is off. You can still search garages.",
              );
            },
            { enableHighAccuracy: true, timeout: 8000 },
          );
        }

        // Search box autocomplete for the user's destination.
        const searchInput = document.getElementById(
          "ustaad-search-input",
        ) as HTMLInputElement | null;
        if (searchInput && google.maps.places) {
          placeAutocompleteRef.current = new google.maps.places.Autocomplete(
            searchInput,
            {
              fields: ["geometry", "formatted_address", "name"],
            },
          );
          placeAutocompleteRef.current.addListener("place_changed", () => {
            const place = placeAutocompleteRef.current.getPlace();
            if (!place?.geometry?.location) return;
            const loc = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            map.panTo(loc);
            map.setZoom(14);
          });
        }

        const pinSearchInput = document.getElementById(
          "ustaad-pin-search",
        ) as HTMLInputElement | null;
        if (pinSearchInput && google.maps.places) {
          pinSearchAutocompleteRef.current =
            new google.maps.places.Autocomplete(pinSearchInput, {
              fields: ["geometry", "formatted_address", "name"],
            });
          pinSearchAutocompleteRef.current.addListener("place_changed", () => {
            const place = pinSearchAutocompleteRef.current.getPlace();
            if (!place?.geometry?.location) return;
            map.panTo({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
            map.setZoom(15);
            setStatus(
              `Found: ${place.name || place.formatted_address || "Pinned location"}`,
            );
          });
        }

        // keep markers synced when pins change
        const observer = new MutationObserver(() => renderPins());
        observer.observe(document.body, { childList: false, subtree: false });
      })
      .catch((err) => setStatus(err.message));

    return () => {
      mounted = false;
    };
  }, [apiKey, role, pins, addingMode, currentLocation]);

  function goToSelectedPin() {
    const map = mapInstanceRef.current;
    if (!map || !selectedPin) return;
    map.panTo({ lat: selectedPin.lat, lng: selectedPin.lng });
    map.setZoom(16);
    setStatus(`Navigated to ${selectedPin.name}.`);
  }

  function routeToSelectedPin() {
    const map = mapInstanceRef.current;
    if (!map || !window.google || !selectedPin || !currentLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination: { lat: selectedPin.lat, lng: selectedPin.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: string) => {
        if (status === "OK") {
          routeRendererRef.current?.setDirections(result);
          setStatus(`Route ready to ${selectedPin.name}.`);
        } else {
          setStatus("Could not build route right now.");
        }
      },
    );
  }

  function saveGaragePin() {
    if (!garageLatLng || !garageName.trim()) return;
    const newPin: GaragePin = {
      id: uid(),
      name: garageName.trim(),
      address:
        garageAddress.trim() ||
        `${garageLatLng.lat.toFixed(6)}, ${garageLatLng.lng.toFixed(6)}`,
      lat: garageLatLng.lat,
      lng: garageLatLng.lng,
      createdAt: Date.now(),
    };
    setPins((prev) => [newPin, ...prev]);
    setSelectedPinId(newPin.id);
    setGarageName("");
    setGarageAddress("");
    setGarageLatLng(null);
    setAddingMode(false);
    setStatus("Garage pin saved.");
  }

  function removeSelectedPin() {
    if (!selectedPin) return;
    setPins((prev) => prev.filter((p) => p.id !== selectedPin.id));
    setSelectedPinId((prev) => {
      const next = filteredPins.filter((p) => p.id !== prev);
      return next[0]?.id ?? null;
    });
    setStatus("Garage pin removed.");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-4 p-4 lg:grid-cols-[380px_1fr]">
        <aside className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="border-b border-white/10 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Ustaad Map
                </h1>
                <p className="text-sm text-slate-300">
                  Garage pins, smart search, and route navigation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-900/70 p-2">
              <button
                onClick={() => setRole("car")}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  role === "car"
                    ? "bg-white text-slate-950 shadow"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <CarFront className="h-4 w-4" /> Car Owner
              </button>
              <button
                onClick={() => setRole("garage")}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  role === "garage"
                    ? "bg-white text-slate-950 shadow"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Store className="h-4 w-4" /> Garage Owner
              </button>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Search className="h-4 w-4" /> Search garage or place
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, area, or coordinates"
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>{filteredPins.length} pins found</span>
                <span>Real-time local demo</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-cyan-300" /> Role control
              </div>
              <p className="text-sm text-slate-300">
                Garage owners can add and remove permanent pins. Car owners can
                search and route to any active garage.
              </p>
            </div>

            {role === "garage" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Garage management</h2>
                    <p className="text-sm text-slate-400">
                      Tap the map to drop a pin.
                    </p>
                  </div>
                  <button
                    onClick={() => setAddingMode((v) => !v)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      addingMode
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-white/10 text-slate-100 hover:bg-white/15"
                    }`}
                  >
                    {addingMode ? "Placing pin" : "Add pin"}
                  </button>
                </div>

                <input
                  id="ustaad-pin-search"
                  placeholder="Search area to jump on map"
                  className="mb-3 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                <div className="space-y-3">
                  <input
                    value={garageName}
                    onChange={(e) => setGarageName(e.target.value)}
                    placeholder="Garage name"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400"
                  />
                  <textarea
                    value={garageAddress}
                    onChange={(e) => setGarageAddress(e.target.value)}
                    placeholder="Address / landmark"
                    rows={2}
                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={saveGaragePin}
                      disabled={!garageLatLng || !garageName.trim()}
                      className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Save permanent pin
                    </button>
                    <button
                      onClick={() => {
                        setGarageLatLng(null);
                        setGarageName("");
                        setGarageAddress("");
                        setAddingMode(false);
                      }}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Clear draft
                    </button>
                  </div>
                  {garageLatLng && (
                    <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-3 text-xs text-cyan-100">
                      Draft pin: {garageLatLng.lat.toFixed(6)},{" "}
                      {garageLatLng.lng.toFixed(6)}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Pinned garages</h2>
                <LocateFixed className="h-4 w-4 text-slate-400" />
              </div>

              <div className="max-h-[320px] space-y-2 overflow-auto pr-1">
                {filteredPins.map((pin) => {
                  const active = pin.id === selectedPinId;
                  return (
                    <button
                      key={pin.id}
                      onClick={() => {
                        setSelectedPinId(pin.id);
                        setStatus(`${pin.name} selected.`);
                      }}
                      className={`w-full rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-cyan-400/50 bg-cyan-400/10"
                          : "border-white/10 bg-slate-950/60 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{pin.name}</div>
                          <div className="mt-1 text-sm text-slate-400">
                            {pin.address}
                          </div>
                        </div>
                        <MapPin className="mt-1 h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Navigation className="h-4 w-4 text-cyan-300" /> Live status
              </div>
              <p className="text-sm text-slate-300">{status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={goToSelectedPin}
                className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Focus pin
              </button>
              {role === "car" ? (
                <button
                  onClick={routeToSelectedPin}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Route me
                </button>
              ) : (
                <button
                  onClick={removeSelectedPin}
                  className="flex-1 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <Trash2 className="h-4 w-4" /> Remove pin
                  </span>
                </button>
              )}
            </div>
          </div>
        </aside>

        <main className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="absolute left-4 top-4 z-10 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">
              Ustaad Live Map
            </div>
            <div className="mt-1 text-sm text-slate-200">
              {role === "garage"
                ? "Create and manage permanent garage pins"
                : "Search garages and get routed instantly"}
            </div>
          </div>

          <div className="absolute right-4 top-4 z-10 hidden rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 shadow-lg backdrop-blur-md md:block">
            API key: {apiKey ? "Connected" : "Add your Google Maps key below"}
          </div>

          <div className="h-[520px] w-full lg:h-full" ref={mapRef} />

          {!apiKey && (
            <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm text-amber-50 backdrop-blur-md">
              Add{" "}
              <code className="rounded bg-black/20 px-1 py-0.5">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
              </code>{" "}
              or paste a key below in the component to activate Google Maps.
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              id="ustaad-search-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Google Maps API key here for demo"
              className="rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-sm text-slate-300 md:min-w-[240px]">
              Selected:{" "}
              <span className="font-semibold text-white">
                {selectedPin?.name || "None"}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
