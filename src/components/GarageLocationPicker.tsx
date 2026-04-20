// src/components/GarageLocationPicker.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type GarageLocationPickerProps = {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    locationName: string;
  }) => void;
  initialLocation?: { latitude: number; longitude: number };
};

// Popular Dhaka locations for quick selection
const DHAKA_LOCATIONS = {
  DOHS: { lat: 23.8337, lng: 90.4057 },
  Gulshan: { lat: 23.8103, lng: 90.4169 },
  Banani: { lat: 23.8206, lng: 90.4235 },
  Dhanmondi: { lat: 23.7461, lng: 90.3714 },
  Mirpur: { lat: 23.8041, lng: 90.3503 },
  Uttara: { lat: 23.875, lng: 90.4144 },
  Mohakhali: { lat: 23.8007, lng: 90.4236 },
  Motijheel: { lat: 23.7452, lng: 90.4078 },
  Farmgate: { lat: 23.7575, lng: 90.3868 },
  "Kawran Bazar": { lat: 23.7667, lng: 90.3667 },
  Kalabagan: { lat: 23.7654, lng: 90.3803 },
  Karail: { lat: 23.8062, lng: 90.3905 },
  Kurmitola: { lat: 23.8153, lng: 90.4078 },
  "Naya Paltan": { lat: 23.7441, lng: 90.4039 },
  Shahbag: { lat: 23.7296, lng: 90.3807 },
  Ramna: { lat: 23.7337, lng: 90.3901 },
};

export default function GarageLocationPicker({
  onLocationSelect,
  initialLocation,
}: GarageLocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(
    initialLocation
      ? { lat: initialLocation.latitude, lng: initialLocation.longitude }
      : null,
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const selectedMarker = useRef<any>(null);

  // Load Leaflet library
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setMapReady(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => {
      setMapReady(true);
    };
    document.body.appendChild(script);
  }, []);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(DHAKA_LOCATIONS["DOHS"]);
      setShowLocationMenu(true);
      return;
    }

    const geoOptions = {
      timeout: 10000,
      enableHighAccuracy: false,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setUserLocation(DHAKA_LOCATIONS["DOHS"]);
        setShowLocationMenu(true);
      },
      geoOptions,
    );
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapReady || !mapContainer.current || !userLocation) return;

    const L = (window as any).L;
    if (!L) return;

    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(
        [userLocation.lat, userLocation.lng],
        14,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current);

      // Handle map clicks to select location
      map.current.on("click", (event: any) => {
        const { lat, lng } = event.latlng;
        handleLocationPick(lat, lng);
      });
    } else {
      map.current.setView([userLocation.lat, userLocation.lng], 14);
    }

    // If initial location was provided, show it
    if (selectedLocation && !selectedMarker.current) {
      addSelectedLocationMarker(selectedLocation.lat, selectedLocation.lng);
    }
  }, [mapReady, userLocation]);

  const addSelectedLocationMarker = (lat: number, lng: number) => {
    const L = (window as any).L;
    if (!L || !map.current) return;

    // Remove old marker if exists
    if (selectedMarker.current) {
      map.current.removeLayer(selectedMarker.current);
    }

    selectedMarker.current = L.circleMarker([lat, lng], {
      radius: 12,
      fillColor: "#1a73e8",
      color: "#0d47a1",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9,
    });

    selectedMarker.current.bindPopup(
      `<div style="padding: 8px; text-align: center; color: #000;">
        <div style="font-weight: bold; margin-bottom: 4px;">Selected Location</div>
        <div style="font-size: 12px;">Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}</div>
      </div>`,
    );

    selectedMarker.current.addTo(map.current);
    selectedMarker.current.openPopup();
    map.current.setView([lat, lng], 16);
  };

  const handleLocationPick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    addSelectedLocationMarker(lat, lng);
  };

  const handleQuickLocationSelect = (locationName: string) => {
    const location =
      DHAKA_LOCATIONS[locationName as keyof typeof DHAKA_LOCATIONS];
    if (location) {
      handleLocationPick(location.lat, location.lng);
      setSearchTerm("");
      setShowLocationMenu(false);
    }
  };

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      alert("Please select a location on the map");
      return;
    }

    // Try to reverse geocode to get location name
    const getLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.lat}&lon=${selectedLocation.lng}`,
        );
        const data = await response.json();
        const locationName =
          data.address?.road ||
          data.address?.village ||
          data.address?.suburb ||
          "Selected Location";
        onLocationSelect({
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
          locationName,
        });
      } catch (error) {
        console.error("Failed to reverse geocode:", error);
        onLocationSelect({
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
          locationName: `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`,
        });
      }
    };

    getLocationName();
  };

  const filteredLocations = Object.keys(DHAKA_LOCATIONS).filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="w-full h-80 rounded-lg border border-outline-variant/30 bg-surface-container overflow-hidden"
        style={{ minHeight: "400px" }}
      />

      {/* Location Info */}
      {selectedLocation && (
        <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30">
          <p className="text-sm font-semibold text-on-surface mb-2">
            Selected Location:
          </p>
          <p className="text-sm text-on-surface-variant">
            Latitude: {selectedLocation.lat.toFixed(6)}, Longitude:{" "}
            {selectedLocation.lng.toFixed(6)}
          </p>
          <p className="text-xs text-on-surface-variant mt-2">
            Click on map to change location
          </p>
        </div>
      )}

      {/* Quick Location Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">
          Quick Select Locations
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowLocationMenu(true);
            }}
            onFocus={() => setShowLocationMenu(true)}
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
          />

          {showLocationMenu && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-surface-container border border-outline-variant/30 rounded-lg shadow-lg z-50">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => handleQuickLocationSelect(location)}
                  className="w-full px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-high transition-colors border-b border-outline-variant/20 last:border-b-0"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        type="button"
        onClick={handleConfirmLocation}
        className="w-full px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Confirm Location
      </button>

      {/* Instructions */}
      <p className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-lg">
        📍 Click on the map to select your garage location, or use quick select
        options. Your location will be displayed as a blue marker on the map.
      </p>
    </div>
  );
}
