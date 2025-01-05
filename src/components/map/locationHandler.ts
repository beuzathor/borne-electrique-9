import type { Map } from 'leaflet';

const DEFAULT_LOCATION = {
  lat: 48.8566, // Paris
  lng: 2.3522,
  zoom: 13
};

export async function setInitialLocation(map: Map): Promise<void> {
  try {
    if ('geolocation' in navigator) {
      const position = await getCurrentPosition();
      map.setView([position.coords.latitude, position.coords.longitude], 13);
    } else {
      map.setView([DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng], DEFAULT_LOCATION.zoom);
    }
  } catch (error) {
    console.warn('Could not get user location, using default:', error);
    map.setView([DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng], DEFAULT_LOCATION.zoom);
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
}