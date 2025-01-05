export const VEHICLE_CATEGORIES = ['citadine', 'berline', 'suv', 'luxe'] as const;

export const PRICE_RANGES = [
  { min: 0, max: 30000, label: 'Moins de 30 000€' },
  { min: 30000, max: 45000, label: '30 000€ - 45 000€' },
  { min: 45000, max: 60000, label: '45 000€ - 60 000€' },
  { min: 60000, max: Infinity, label: 'Plus de 60 000€' }
] as const;