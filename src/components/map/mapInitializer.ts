import L from 'leaflet';
import { fetchNearbyStations } from '../../lib/api/openChargeMap';
import { createStationMarker } from './ChargingStationMarker';
import { setInitialLocation } from './locationHandler';
import { updateMarkers } from './markerManager';
import type { ChargingStation } from '../../lib/api/types/chargingStation';

export async function initializeMap(elementId: string) {
  const map = L.map(elementId);
  const markers = new Map<number, L.Marker>();

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Load stations in current view with debounce
  let loadingStations = false;
  const loadStationsInView = async () => {
    if (loadingStations) return;
    
    try {
      loadingStations = true;
      const center = map.getCenter();
      const bounds = map.getBounds();
      const radius = center.distanceTo(bounds.getNorthEast()) / 1000; // Convert to km

      const stations = await fetchNearbyStations({
        latitude: center.lat,
        longitude: center.lng,
        distance: Math.min(radius, 50), // Limit to 50km max
        maxResults: 100
      });

      updateMarkers(stations, markers, map);
    } catch (error) {
      console.error('Error loading stations:', error);
    } finally {
      loadingStations = false;
    }
  };

  // Handle map movement with debounce
  let timeout: number;
  map.on('moveend', () => {
    clearTimeout(timeout);
    timeout = setTimeout(loadStationsInView, 500);
  });

  // Initial location
  await setInitialLocation(map);
  await loadStationsInView();

  return map;
}