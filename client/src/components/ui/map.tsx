import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

// Leaflet map component
export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined" || !mapRef.current || mapInstance.current) {
        return;
      }

      try {
        // Dynamic import of Leaflet
        const L = await import("leaflet");
        
        // Import Leaflet CSS
        await import("leaflet/dist/leaflet.css");

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        // Initialize map centered on Cornetu, Ilfov (approximate coordinates)
        const map = L.map(mapRef.current).setView([44.3333, 26.0], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add marker for Top Beton location
        const marker = L.marker([44.3333, 26.0]).addTo(map);
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">Top Beton SRL</h3>
            <p class="text-xs text-gray-600">Str. Barajului nr. 7, Cornetu, Ilfov</p>
            <p class="text-xs text-blue-600 mt-1">
              <a href="tel:0752400200">0752 400 200</a>
            </p>
          </div>
        `).openPopup();

        mapInstance.current = map;
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="h-96 w-full rounded-xl bg-muted"
        data-testid="map-container"
      >
        {/* Fallback content while map loads */}
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Se încarcă harta...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
