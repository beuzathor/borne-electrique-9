```typescript
import type { CarQueryResponse, CarQueryVehicle } from './types';

const API_URL = 'https://www.carqueryapi.com/api/0.3/';

export class CarQueryClient {
  private static instance: CarQueryClient;

  private constructor() {}

  public static getInstance(): CarQueryClient {
    if (!CarQueryClient.instance) {
      CarQueryClient.instance = new CarQueryClient();
    }
    return CarQueryClient.instance;
  }

  async getElectricVehicles(year: number = new Date().getFullYear()): Promise<CarQueryVehicle[]> {
    try {
      const params = new URLSearchParams({
        cmd: 'getModels',
        year,
        fuel_type: 'Electric',
        body: 'SUV,Sedan,Hatchback',
        sold_in_us: '1'
      });

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch vehicles');

      const data: CarQueryResponse = await response.json();
      return data.Items.filter(vehicle => 
        vehicle.model_engine_fuel?.toLowerCase().includes('electric')
      );
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  }

  async getVehicleDetails(modelId: string): Promise<CarQueryVehicle | null> {
    try {
      const params = new URLSearchParams({
        cmd: 'getModel',
        model: modelId
      });

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) return null;

      const data = await response.json();
      return data[0] || null;
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      return null;
    }
  }
}

export const carQueryClient = CarQueryClient.getInstance();
```