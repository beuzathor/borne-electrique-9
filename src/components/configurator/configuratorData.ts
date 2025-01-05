export interface Option {
  value: string;
  label: string;
  description?: string;
}

export interface Step {
  id: string;
  question: string;
  options: Option[];
}

export interface Answer {
  questionId: string;
  value: string;
  label: string;
}

export const steps: Step[] = [
  {
    id: 'vehicle',
    question: "Quel véhicule électrique possédez-vous ou envisagez-vous d'acheter ?",
    options: [
      {
        value: 'small',
        label: 'Citadine électrique',
        description: 'Ex: Renault Zoe, Peugeot e-208, Fiat 500e'
      },
      {
        value: 'medium',
        label: 'Berline/SUV compact',
        description: 'Ex: Tesla Model 3, Volkswagen ID.4, Hyundai Kona'
      },
      {
        value: 'large',
        label: 'Grand SUV/Berline premium',
        description: 'Ex: Tesla Model S/X, Audi e-tron, Mercedes EQC'
      }
    ]
  },
  {
    id: 'usage',
    question: 'Quelle est votre utilisation principale ?',
    options: [
      {
        value: 'daily',
        label: 'Trajets quotidiens courts',
        description: 'Moins de 50km par jour, recharge principalement la nuit'
      },
      {
        value: 'mixed',
        label: 'Usage mixte',
        description: 'Trajets variés, besoin de recharge régulière'
      },
      {
        value: 'intensive',
        label: 'Utilisation intensive',
        description: 'Grands trajets fréquents, besoin de recharge rapide'
      }
    ]
  },
  {
    id: 'power',
    question: 'Quel type d\'installation électrique avez-vous ?',
    options: [
      {
        value: 'mono',
        label: 'Monophasé standard',
        description: 'Installation électrique classique (3,7 à 7,4 kW)'
      },
      {
        value: 'mono-reinforced',
        label: 'Monophasé renforcé',
        description: 'Installation avec ligne dédiée (jusqu\'à 7,4 kW)'
      },
      {
        value: 'tri',
        label: 'Triphasé',
        description: 'Installation triphasée (jusqu\'à 22 kW)'
      }
    ]
  },
  {
    id: 'budget',
    question: 'Quel est votre budget pour la borne et son installation ?',
    options: [
      {
        value: 'basic',
        label: 'Budget serré',
        description: '800-1200€ installation comprise'
      },
      {
        value: 'mid',
        label: 'Budget moyen',
        description: '1200-2000€ installation comprise'
      },
      {
        value: 'premium',
        label: '2000€ et plus',
        description: 'Recherche des meilleures fonctionnalités'
      }
    ]
  }
];