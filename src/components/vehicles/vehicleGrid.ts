```typescript
import type { ElectricVehicle } from '../../lib/data/electricVehicles';
import { filterVehicles } from './vehicleFilters';

export function initializeVehicleGrid() {
  let vehicles: ElectricVehicle[] = [];
  const grid = document.getElementById('vehicleGrid');
  
  if (grid?.dataset.vehicles) {
    vehicles = JSON.parse(grid.dataset.vehicles);
  }

  function updateGrid(filteredVehicles: ElectricVehicle[]) {
    if (!grid) return;
    
    grid.innerHTML = filteredVehicles.map(vehicle => 
      createVehicleCard(vehicle)
    ).join('');
  }

  // Écouteurs d'événements pour les filtres et la recherche
  document.addEventListener('vehicle-filter', ((e: CustomEvent) => {
    const filteredVehicles = filterVehicles(vehicles, e.detail.filters);
    updateGrid(filteredVehicles);
  }) as EventListener);

  document.addEventListener('vehicle-search', ((e: CustomEvent) => {
    const filteredVehicles = filterVehicles(vehicles, {
      categories: [],
      priceRanges: [],
      search: e.detail.query
    });
    updateGrid(filteredVehicles);
  }) as EventListener);
}

function createVehicleCard(vehicle: ElectricVehicle): string {
  return `
    <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div class="aspect-w-16 aspect-h-9 bg-gray-200">
        <img 
          src="/vehicles/${vehicle.id}.jpg"
          alt="${vehicle.brand} ${vehicle.model}"
          class="w-full h-full object-cover"
          onerror="this.src='/vehicles/placeholder.jpg'"
        />
      </div>
      
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900">${vehicle.brand} ${vehicle.model}</h3>
            <p class="text-sm text-gray-600">${vehicle.year}</p>
          </div>
          <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium capitalize">
            ${vehicle.category}
          </span>
        </div>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Autonomie WLTP</span>
            <span class="font-medium">${vehicle.range.wltp} km</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Batterie</span>
            <span class="font-medium">${vehicle.batteryCapacity} kWh</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Consommation</span>
            <span class="font-medium">${vehicle.consumption} kWh/100km</span>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-100">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-2xl font-bold text-gray-900">${vehicle.price.base.toLocaleString()}€</p>
              ${vehicle.price.withBonus ? `
                <p class="text-sm text-green-600">
                  ${vehicle.price.withBonus.toLocaleString()}€ avec bonus
                </p>
              ` : ''}
            </div>
            <a 
              href="/vehicules/${vehicle.id}"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}
```