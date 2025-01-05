```typescript
export interface CarQueryVehicle {
  id: string;
  make_id: string;
  make_display: string;
  model_name: string;
  model_year: string;
  model_body: string;
  model_engine_fuel: string;
  model_transmission_type: string;
  model_seats: string;
  model_doors: string;
  model_trim: string;
  model_make_display: string;
}

export interface CarQueryResponse {
  Items: CarQueryVehicle[];
  SearchCriteria: string;
}
```