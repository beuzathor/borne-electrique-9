import type { ElectricVehicle } from '../data/electricVehicles';

interface Filters {
  categories: string[];
  priceRanges: Array<{
    min: number;
    max: number;
  }>;
  search?: string;
}

export function filterVehicles(vehicles: ElectricVehicle[], filters: Filters): ElectricVehicle[] {
  return vehicles.filter(vehicle => {
    // Filtre par catégorie
    if (filters.categories.length > 0 && !filters.categories.includes(vehicle.category)) {
      return false;
    }

    // Filtre par prix
    if (filters.priceRanges.length > 0) {
      const price = vehicle.price.withBonus || vehicle.price.base;
      const matchesPrice = filters.priceRanges.some(range => 
        price >= range.min && price < range.max
      );
      if (!matchesPrice) return false;
    }

    // Filtre par recherche
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchString = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
      return searchString.includes(searchTerm);
    }

    return true;
  });
}