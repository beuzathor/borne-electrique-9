```typescript
import { z } from 'zod';
import type { EVDBResponse, EVDBVehicle } from './types';

const API_ENDPOINTS = {
  vehicles: 'https://ev-database.org/api/v1/vehicles',
  details: 'https://ev-database.org/api/v1/vehicles/:id'
} as const;

export class EVDBClient {
  private static instance: EVDBClient;
  private cache: Map<string, EVDBVehicle> = new Map();
  private lastFetch: Date | null = null;
  private readonly cacheDuration = 24 * 60 * 60 * 1000; // 24 heures

  private constructor() {}

  public static getInstance(): EVDBClient {
    if (!EVDBClient.instance) {
      EVDBClient.instance = new EVDBClient();
    }
    return EVDBClient.instance;
  }

  async getVehicles(options: { 
    page?: number; 
    pageSize?: number;
    forceRefresh?: boolean;
  } = {}): Promise<EVDBResponse> {
    const { page = 1, pageSize = 50, forceRefresh = false } = options;

    // Vérifier le cache
    if (!forceRefresh && this.lastFetch && 
        (new Date().getTime() - this.lastFetch.getTime() < this.cacheDuration)) {
      // Retourner les données du cache
      const vehicles = Array.from(this.cache.values());
      return {
        vehicles: this.paginateVehicles(vehicles, page, pageSize),
        pagination: {
          total: vehicles.length,
          page,
          pageSize
        }
      };
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.vehicles}?page=${page}&limit=${pageSize}`);
      if (!response.ok) throw new Error('Failed to fetch vehicles');

      const data = await response.json();
      const vehicles = this.validateAndTransformVehicles(data);

      // Mettre à jour le cache
      this.cache.clear();
      vehicles.forEach(vehicle => this.cache.set(vehicle.id, vehicle));
      this.lastFetch = new Date();

      return {
        vehicles,
        pagination: {
          total: data.total,
          page,
          pageSize
        }
      };
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }

  async getVehicleById(id: string): Promise<EVDBVehicle | null> {
    // Vérifier le cache d'abord
    if (this.cache.has(id)) {
      return this.cache.get(id) || null;
    }

    try {
      const response = await fetch(API_ENDPOINTS.details.replace(':id', id));
      if (!response.ok) return null;

      const data = await response.json();
      const vehicle = this.validateAndTransformVehicle(data);

      // Mettre en cache
      this.cache.set(vehicle.id, vehicle);

      return vehicle;
    } catch (error) {
      console.error(`Error fetching vehicle ${id}:`, error);
      return null;
    }
  }

  private paginateVehicles(vehicles: EVDBVehicle[], page: number, pageSize: number): EVDBVehicle[] {
    const start = (page - 1) * pageSize;
    return vehicles.slice(start, start + pageSize);
  }

  private validateAndTransformVehicles(data: any): EVDBVehicle[] {
    // Implémentez la validation avec Zod ici
    return data.vehicles.map(this.validateAndTransformVehicle);
  }

  private validateAndTransformVehicle(data: any): EVDBVehicle {
    // Implémentez la validation avec Zod ici
    return data as EVDBVehicle;
  }
}

export const evdbClient = EVDBClient.getInstance();
```