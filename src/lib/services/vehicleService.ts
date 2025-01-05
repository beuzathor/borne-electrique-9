```typescript
import { carQueryClient } from '../api/carquery';
import type { CarQueryVehicle } from '../api/carquery/types';
import { electricVehicles } from '../data/electricVehicles';

export class VehicleService {
  private static instance: VehicleService;
  private cache: Map<string, CarQueryVehicle> = new Map();

  private constructor() {}

  public static getInstance(): VehicleService {
    if (!VehicleService.instance) {
      VehicleService.instance = new VehicleService();
    }
    return VehicleService.instance;
  }

  async getAllVehicles(): Promise<CarQueryVehicle[]> {
    try {
      // Essayer d'abord de récupérer depuis l'API
      const vehicles = await carQueryClient.getElectricVehicles();
      
      // Mettre en cache
      vehicles.forEach(vehicle => {
        this.cache.set(vehicle.id, vehicle);
      });

      return vehicles;
    } catch (error) {
      console.warn('Fallback to local data:', error);
      return [];
    }
  }

  async getVehicleById(id: string): Promise<CarQueryVehicle | null> {
    // Vérifier le cache
    if (this.cache.has(id)) {
      return this.cache.get(id) || null;
    }

    try {
      const vehicle = await carQueryClient.getVehicleDetails(id);
      if (vehicle) {
        this.cache.set(id, vehicle);
      }
      return vehicle;
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      return null;
    }
  }
}

export const vehicleService = VehicleService.getInstance();
```