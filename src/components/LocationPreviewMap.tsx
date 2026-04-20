"use client";

import { useEffect, useRef, useState } from "react";

type LocationPreviewMapProps = {
  latitude?: number;
  longitude?: number;
  title: string;
  subtitle?: string;
  className?: string;
  markerColor?: string;
};

export default function LocationPreviewMap({
  latitude,
  longitude,
  title,
  subtitle,
  className,
  markerColor = "#d32f2f",
}: LocationPreviewMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

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
    script.onload = () => setMapReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapReady || !mapContainer.current || !latitude || !longitude) return;

    const L = (window as any).L;
    if (!L) return;

    if (!map.current) {
      map.current = L.map(mapContainer.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([latitude, longitude], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current);
    } else {
      map.current.setView([latitude, longitude], 15);
    }

    if (marker.current) {
      map.current.removeLayer(marker.current);
    }

    marker.current = L.circleMarker([latitude, longitude], {
      radius: 10,
      fillColor: markerColor,
      color: "#111827",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.95,
    })
      .addTo(map.current)
      .bindPopup(
        `<div style=\"padding:8px;color:#111827;\"><strong>${title}</strong><br/><span style=\"font-size:12px;\">${subtitle || "Pinned location"}</span></div>`
      );
  }, [mapReady, latitude, longitude, title, subtitle, markerColor]);

  if (!latitude || !longitude) {
    return (
      <div className={className || "w-full h-80 rounded-3xl bg-surface-container border border-outline-variant/20 flex items-center justify-center"}>
        <p className="text-sm text-on-surface-variant">Location not available for this listing.</p>
      </div>
    );
  }

  return <div ref={mapContainer} className={className || "w-full h-80 rounded-3xl overflow-hidden border border-outline-variant/20"} />;
}
