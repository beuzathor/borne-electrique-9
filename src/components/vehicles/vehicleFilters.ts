```typescript
import type { ElectricVehicle } from '../../lib/data/electricVehicles';

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

export function initializeFilters() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const filters = getActiveFilters();
      document.dispatchEvent(new CustomEvent('vehicle-filter', {
        detail: { filters }
      }));
    });
  });
}

function getActiveFilters(): Filters {
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
  const priceCheckboxes = document.querySelectorAll('input[name="priceRange"]:checked');

  return {
    categories: Array.from(categoryCheckboxes).map(cb => (cb as HTMLInputElement).value),
    priceRanges: Array.from(priceCheckboxes).map(cb => {
      const [min, max] = (cb as HTMLInputElement).value.split('-');
      return {
        min: parseInt(min),
        max: max === 'Infinity' ? Infinity : parseInt(max)
      };
    })
  };
}
```