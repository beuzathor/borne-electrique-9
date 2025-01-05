import type { Map, Marker } from 'leaflet';
import type { ChargingStation } from '../../lib/api/types/chargingStation';
import { createStationMarker } from './ChargingStationMarker';

export function updateMarkers(
  stations: ChargingStation[],
  markers: Map<number, Marker>,
  map: Map
): void {
  try {
    // Remove old markers that are not in the new stations list
    const newStationIds = new Set(stations.map(s => s.ID));
    for (const [id, marker] of markers.entries()) {
      if (!newStationIds.has(id)) {
        marker.remove();
        markers.delete(id);
      }
    }

    // Add or update markers for new stations
    for (const station of stations) {
      if (!markers.has(station.ID)) {
        const marker = createStationMarker(station, map);
        if (marker) {
          markers.set(station.ID, marker);
        }
      }
    }
  } catch (error) {
    console.error('Error updating markers:', error);
  }
}