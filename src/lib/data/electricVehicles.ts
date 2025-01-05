export interface ElectricVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'citadine' | 'berline' | 'suv' | 'luxe';
  batteryCapacity: number;
  range: {
    wltp: number;
    real: number;
  };
  charging: {
    acPower: number;
    dcPower?: number;
    timeToCharge: {
      ac: number;
      dc?: number;
    };
  };
  consumption: number;
  price: {
    base: number;
    withBonus?: number;
  };
}

export const electricVehicles: ElectricVehicle[] = [
  {
    id: 'renault-zoe-r135',
    brand: 'Renault',
    model: 'Zoe R135',
    year: 2024,
    category: 'citadine',
    batteryCapacity: 52,
    range: {
      wltp: 386,
      real: 330
    },
    charging: {
      acPower: 22,
      dcPower: 50,
      timeToCharge: {
        ac: 3,
        dc: 30
      }
    },
    consumption: 17.2,
    price: {
      base: 35100,
      withBonus: 28100
    }
  },
  {
    id: 'tesla-model3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    category: 'berline',
    batteryCapacity: 60,
    range: {
      wltp: 513,
      real: 450
    },
    charging: {
      acPower: 11,
      dcPower: 250,
      timeToCharge: {
        ac: 6,
        dc: 20
      }
    },
    consumption: 14.9,
    price: {
      base: 42990,
      withBonus: 35990
    }
  },
  {
    id: 'peugeot-e208',
    brand: 'Peugeot',
    model: 'e-208',
    year: 2024,
    category: 'citadine',
    batteryCapacity: 51,
    range: {
      wltp: 400,
      real: 340
    },
    charging: {
      acPower: 11,
      dcPower: 100,
      timeToCharge: {
        ac: 5,
        dc: 25
      }
    },
    consumption: 15.5,
    price: {
      base: 35900,
      withBonus: 28900
    }
  },
  {
    id: 'volkswagen-id4',
    brand: 'Volkswagen',
    model: 'ID.4',
    year: 2024,
    category: 'suv',
    batteryCapacity: 77,
    range: {
      wltp: 530,
      real: 450
    },
    charging: {
      acPower: 11,
      dcPower: 135,
      timeToCharge: {
        ac: 7.5,
        dc: 30
      }
    },
    consumption: 18.3,
    price: {
      base: 47000
    }
  },
  {
    id: 'bmw-i4',
    brand: 'BMW',
    model: 'i4',
    year: 2024,
    category: 'berline',
    batteryCapacity: 83.9,
    range: {
      wltp: 590,
      real: 520
    },
    charging: {
      acPower: 11,
      dcPower: 200,
      timeToCharge: {
        ac: 8.5,
        dc: 25
      }
    },
    consumption: 16.1,
    price: {
      base: 57900
    }
  },
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2024,
    category: 'luxe',
    batteryCapacity: 93.4,
    range: {
      wltp: 505,
      real: 430
    },
    charging: {
      acPower: 11,
      dcPower: 270,
      timeToCharge: {
        ac: 9,
        dc: 22
      }
    },
    consumption: 22.5,
    price: {
      base: 96000
    }
  },
  {
    id: 'hyundai-ioniq5',
    brand: 'Hyundai',
    model: 'IONIQ 5',
    year: 2024,
    category: 'suv',
    batteryCapacity: 77.4,
    range: {
      wltp: 507,
      real: 430
    },
    charging: {
      acPower: 11,
      dcPower: 220,
      timeToCharge: {
        ac: 7.5,
        dc: 18
      }
    },
    consumption: 17.9,
    price: {
      base: 49900
    }
  },
  {
    id: 'kia-ev6',
    brand: 'Kia',
    model: 'EV6',
    year: 2024,
    category: 'suv',
    batteryCapacity: 77.4,
    range: {
      wltp: 528,
      real: 450
    },
    charging: {
      acPower: 11,
      dcPower: 240,
      timeToCharge: {
        ac: 7.5,
        dc: 18
      }
    },
    consumption: 17.2,
    price: {
      base: 47990
    }
  },
  {
    id: 'mercedes-eqe',
    brand: 'Mercedes',
    model: 'EQE',
    year: 2024,
    category: 'luxe',
    batteryCapacity: 90.6,
    range: {
      wltp: 639,
      real: 550
    },
    charging: {
      acPower: 11,
      dcPower: 170,
      timeToCharge: {
        ac: 8.5,
        dc: 32
      }
    },
    consumption: 15.9,
    price: {
      base: 76000
    }
  },
  {
    id: 'audi-q4-etron',
    brand: 'Audi',
    model: 'Q4 e-tron',
    year: 2024,
    category: 'suv',
    batteryCapacity: 82,
    range: {
      wltp: 534,
      real: 450
    },
    charging: {
      acPower: 11,
      dcPower: 135,
      timeToCharge: {
        ac: 7.5,
        dc: 36
      }
    },
    consumption: 17.2,
    price: {
      base: 53700
    }
  }
];

export function getVehicleById(id: string): ElectricVehicle | undefined {
  return electricVehicles.find(vehicle => vehicle.id === id);
}

export function getVehiclesByCategory(category: ElectricVehicle['category']): ElectricVehicle[] {
  return electricVehicles.filter(vehicle => vehicle.category === category);
}

export function searchVehicles(query: string): ElectricVehicle[] {
  const searchTerm = query.toLowerCase();
  return electricVehicles.filter(vehicle => 
    vehicle.brand.toLowerCase().includes(searchTerm) ||
    vehicle.model.toLowerCase().includes(searchTerm)
  );
}