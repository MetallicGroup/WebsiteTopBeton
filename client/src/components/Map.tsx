import { useEffect, useRef } from "react";

declare global {
  interface Window {
    L: any;
  }
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function Map({ 
  center = [44.3333, 26.0], 
  zoom = 13, 
  height = "400px" 
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    // Initialize map
    if (!mapInstance.current) {
      mapInstance.current = window.L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Add marker for Cornetu location
      window.L.marker(center)
        .addTo(mapInstance.current)
        .bindPopup('Top Beton SRL<br>Str. Barajului nr. 7, Cornetu, Ilfov')
        .openPopup();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      style={{ height }} 
      className="rounded-xl border border-border"
      data-testid="map-container"
    />
  );
}
