// src/components/ParkingMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type ParkingMarker = {
  _id: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
};

type ParkingMapProps = {
  parkings: ParkingMarker[];
  selectedId?: string;
  onSelectParking?: (parkingId: string) => void;
};

// Popular Dhaka locations for quick selection
const DHAKA_LOCATIONS = {
  "DOHS": { lat: 23.8337, lng: 90.4057 },
  "Gulshan": { lat: 23.8103, lng: 90.4169 },
  "Banani": { lat: 23.8206, lng: 90.4235 },
  "Dhanmondi": { lat: 23.7461, lng: 90.3714 },
  "Mirpur": { lat: 23.8041, lng: 90.3503 },
  "Uttara": { lat: 23.8750, lng: 90.4144 },
  "Mohakhali": { lat: 23.8007, lng: 90.4236 },
  "Motijheel": { lat: 23.7452, lng: 90.4078 },
  "Farmgate": { lat: 23.7575, lng: 90.3868 },
  "Kawran Bazar": { lat: 23.7667, lng: 90.3667 },
  "Kalabagan": { lat: 23.7654, lng: 90.3803 },
  "Karail": { lat: 23.8062, lng: 90.3905 },
  "Kurmitola": { lat: 23.8153, lng: 90.4078 },
  "Naya Paltan": { lat: 23.7441, lng: 90.4039 },
  "Shahbag": { lat: 23.7296, lng: 90.3807 },
  "Ramna": { lat: 23.7337, lng: 90.3901 },
};

export default function ParkingMap({ parkings, selectedId, onSelectParking }: ParkingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userMarker = useRef<any>(null);

  // Load Leaflet library
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setMapReady(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => {
      setMapReady(true);
    };
    document.body.appendChild(script);
  }, []);

  // Get user's current location
  useEffect(() => {
    console.log("🔍 Starting geolocation...");
    
    if (!navigator.geolocation) {
      console.warn("❌ Geolocation not supported");
      setUserLocation(DHAKA_LOCATIONS["DOHS"]);
      setShowLocationMenu(true);
      return;
    }

    const geoOptions = {
      timeout: 10000,
      enableHighAccuracy: false,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("✅ Geolocation success:", position.coords);
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationGranted(true);
      },
      (error) => {
        console.error("❌ Geolocation error:", error.code, error.message);
        console.warn(`Error details: ${error.message}`);
        
        // Set default to DOHS if geolocation fails
        setUserLocation(DHAKA_LOCATIONS["DOHS"]);
        setShowLocationMenu(true);
      },
      geoOptions
    );
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapReady || !mapContainer.current || !parkings.length || !userLocation) return;

    const L = (window as any).L;
    if (!L) return;

    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([userLocation.lat, userLocation.lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);
    } else {
      map.current.setView([userLocation.lat, userLocation.lng], 14);
    }

    // Add or update user location marker
    if (userMarker.current) {
      map.current.removeLayer(userMarker.current);
    }

    userMarker.current = L.circleMarker([userLocation.lat, userLocation.lng], {
      radius: 10,
      fillColor: "#4CAF50",
      color: "#2E7D32",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9,
    });

    userMarker.current.bindPopup(
      `<div style="padding: 8px; text-align: center; color: #000;">
        <div style="font-weight: bold; margin-bottom: 4px;">Your Location</div>
      </div>`
    );
    userMarker.current.addTo(map.current);

    // Clear existing markers
    if (map.current._markers) {
      map.current._markers.forEach((marker: any) => map.current.removeLayer(marker));
      map.current._markers = [];
    } else {
      map.current._markers = [];
    }

    // Calculate distance
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLng = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const bounds = L.latLngBounds([[userLocation.lat, userLocation.lng]]);
    
    parkings.forEach((parking) => {
      if (!parking.latitude || !parking.longitude) return;

      const isSelected = selectedId === parking._id;
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        parking.latitude,
        parking.longitude
      );

      const markerColor = isSelected ? "#1a73e8" : "#d32f2f";

      const marker = L.circleMarker([parking.latitude, parking.longitude], {
        radius: isSelected ? 12 : 8,
        fillColor: markerColor,
        color: isSelected ? "#0d47a1" : "#b71c1c",
        weight: 2,
        opacity: 1,
        fillOpacity: isSelected ? 0.9 : 0.7,
      });

      const popupContent = `
        <div style="padding: 10px; max-width: 220px; color: #000;">
          <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">${parking.name}</div>
          <div style="font-size: 12px; color: #666; margin-bottom: 4px;">${parking.location}</div>
          <div style="font-size: 13px; color: #E91E63; font-weight: bold; margin-bottom: 6px;">BDT ${parking.pricePerHour}/hr</div>
          <div style="font-size: 12px; background-color: #f5f5f5; padding: 4px 8px; border-radius: 4px; color: #333;">📍 ${distance.toFixed(1)} km away</div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("click", () => {
        onSelectParking?.(parking._id);
      });

      marker.addTo(map.current);
      map.current._markers.push(marker);
      bounds.extend([parking.latitude, parking.longitude]);
    });

    if (bounds.isValid()) {
      map.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mapReady, parkings, selectedId, onSelectParking, userLocation]);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setUserLocation(location);
    setShowLocationMenu(false);
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-surface-container">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
      
      {/* Location Info Badge */}
      {userLocation && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm z-40 text-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">📍</span>
            <div>
              <div className="font-semibold">Your Location</div>
              <div className="text-xs text-gray-600">
                {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Menu Button */}
      <div className="absolute bottom-4 left-4 z-40">
        <button
          onClick={() => setShowLocationMenu(!showLocationMenu)}
          className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow flex items-center gap-2 font-medium text-gray-800"
        >
          <span className="text-lg">📌</span>
          Change Location
        </button>

        {/* Location Dropdown */}
        {showLocationMenu && (
          <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-xl z-50 mt-2 w-56 border border-gray-200 max-h-96 flex flex-col">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <div className="text-xs text-gray-500 mt-2">
                📍 Popular Areas: {Object.keys(DHAKA_LOCATIONS).length} locations
              </div>
            </div>

            {/* Location List */}
            <div className="overflow-y-auto flex-1">
              {Object.entries(DHAKA_LOCATIONS)
                .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(([name, coords]) => (
                  <button
                    key={name}
                    onClick={() => {
                      handleLocationSelect(coords);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm text-gray-700 border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">
                      {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
                    </div>
                  </button>
                ))}
              {Object.entries(DHAKA_LOCATIONS).filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  No areas found matching "{searchTerm}"
                </div>
              )}
            </div>

            {/* Manual Coordinate Input */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Manual Entry</div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Lat"
                  step="0.0001"
                  min="23.5"
                  max="24.0"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                  id="manual-lat"
                />
                <input
                  type="number"
                  placeholder="Lng"
                  step="0.0001"
                  min="90.0"
                  max="90.5"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                  id="manual-lng"
                />
                <button
                  onClick={() => {
                    const lat = parseFloat((document.getElementById("manual-lat") as HTMLInputElement)?.value || "23.8103");
                    const lng = parseFloat((document.getElementById("manual-lng") as HTMLInputElement)?.value || "90.4125");
                    if (lat && lng) {
                      handleLocationSelect({ lat, lng });
                      setSearchTerm("");
                    }
                  }}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors font-medium"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location Status */}
      {!locationGranted && (
        <div className="absolute top-4 left-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm z-40 text-yellow-800 max-w-xs">
          <div className="font-semibold mb-1">📍 Location Access</div>
          <div className="text-xs">
            Using default location. Click "Change Location" to select your area manually.
          </div>
        </div>
      )}
    </div>
  );
}
