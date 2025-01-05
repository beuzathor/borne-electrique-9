import L from 'leaflet';
import type { ChargingStation } from '../../lib/api/types/chargingStation';
import type { Marker, Map } from 'leaflet';

export function createStationMarker(station: ChargingStation, map: Map): Marker | null {
  try {
    if (!station.AddressInfo?.Latitude || !station.AddressInfo?.Longitude) {
      return null;
    }

    const marker = L.marker([
      station.AddressInfo.Latitude,
      station.AddressInfo.Longitude
    ]);

    const connections = station.Connections?.map(conn => 
      `${conn.ConnectionType?.Title || 'N/A'} ${conn.PowerKW ? `(${conn.PowerKW}kW)` : ''}`
    ).join(', ') || 'Information non disponible';

    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold">${station.AddressInfo.Title}</h3>
        ${station.AddressInfo.AddressLine1 ? `<p>${station.AddressInfo.AddressLine1}</p>` : ''}
        ${station.AddressInfo.Town ? `<p>${station.AddressInfo.Town}</p>` : ''}
        ${station.NumberOfPoints ? 
          `<p class="mt-2">Points de charge: ${station.NumberOfPoints}</p>` : 
          ''}
        <p class="mt-2 text-sm">Connecteurs: ${connections}</p>
        ${station.StatusType?.Title ? 
          `<p class="text-sm text-gray-600">Status: ${station.StatusType.Title}</p>` : 
          ''}
      </div>
    `;

    marker.bindPopup(popupContent).addTo(map);
    return marker;
  } catch (error) {
    console.error('Error creating marker:', error);
    return null;
  }
}