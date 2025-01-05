```typescript
import type { ElectricVehicle } from '../data/electricVehicles';

export interface VehicleFilters {
  categories: string[];
  priceRanges: Array<{
    min: number;
    max: number;
  }>;
  search?: string;
}

export function useVehicleFilters(vehicles: ElectricVehicle[]) {
  function applyFilters(filters: VehicleFilters): ElectricVehicle[] {
    return vehicles.filter(vehicle => {
      if (filters.categories.length > 0 && !filters.categories.includes(vehicle.category)) {
        return false;
      }

      if (filters.priceRanges.length > 0) {
        const price = vehicle.price.withBonus || vehicle.price.base;
        const matchesPrice = filters.priceRanges.some(range => 
          price >= range.min && price < range.max
        );
        if (!matchesPrice) return false;
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchString = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
        return searchString.includes(searchTerm);
      }

      return true;
    });
  }

  return { applyFilters };
}
```