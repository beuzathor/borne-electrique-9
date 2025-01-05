import { z } from 'zod';
import { 
  chargingStationSchema, 
  type ChargingStation, 
  type FetchStationsParams 
} from './types/chargingStation';

const API_KEY = 'fd9f7884-2eb6-44da-a1d5-9f4e610fca41';
const BASE_URL = 'https://api.openchargemap.io/v3';

export async function fetchNearbyStations({
  latitude,
  longitude,
  distance,
  maxResults = 100
}: FetchStationsParams): Promise<ChargingStation[]> {
  try {
    const url = new URL(`${BASE_URL}/poi/`);
    const params = new URLSearchParams({
      output: 'json',
      key: API_KEY,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      distance: distance.toString(),
      maxresults: maxResults.toString(),
      compact: 'true',
      verbose: 'false'
    });
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return z.array(chargingStationSchema).parse(data);
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    return [];
  }
}