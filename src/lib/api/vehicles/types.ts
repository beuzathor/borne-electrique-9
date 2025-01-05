```typescript
export interface EVDBVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  battery: {
    capacity: number;
    usableCapacity: number;
  };
  range: {
    wltp: number;
    real: number;
  };
  charging: {
    maxAC: number;
    maxDC?: number;
    timeToCharge: {
      ac: number;
      dc?: number;
    };
  };
  performance: {
    acceleration: number;
    topSpeed: number;
  };
  consumption: number;
  price: {
    base: number;
    withBonus?: number;
  };
  lastUpdated: string;
}

export interface EVDBResponse {
  vehicles: EVDBVehicle[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}
```