import type { Answer } from './configuratorData';

interface Recommendation {
  title: string;
  description: string;
  features: string[];
}

export function calculateRecommendation(answers: Answer[]): Recommendation {
  const vehicleType = answers.find(a => a.questionId === 'vehicle')?.value || '';
  const usage = answers.find(a => a.questionId === 'usage')?.value || '';
  const power = answers.find(a => a.questionId === 'power')?.value || '';
  const budget = answers.find(a => a.questionId === 'budget')?.value || '';

  // Logique de recommandation basee sur les reponses
  if (budget === 'basic') {
    return {
      title: 'Borne de recharge basique 7,4 kW',
      description: 'Une solution economique mais fiable pour la recharge a domicile',
      features: [
        'Puissance de charge jusqu\'a 7,4 kW',
        'Installation simple sur circuit dedie',
        'Cable Type 2 integre',
        'Protection electrique integree'
      ]
    };
  }

  if (power === 'tri' && budget === 'premium') {
    return {
      title: 'Borne de recharge connectee 22 kW',
      description: 'Solution haut de gamme avec toutes les fonctionnalites avancees',
      features: [
        'Puissance de charge jusqu\'a 22 kW',
        'Connexion Wi-Fi et application mobile',
        'Programmation des plages horaires',
        'Suivi de consommation en temps reel',
        'Compatible avec tous les vehicules electriques',
        'Mise a jour a distance'
      ]
    };
  }

  if (usage === 'intensive' || vehicleType === 'large') {
    return {
      title: 'Borne de recharge intelligente 11 kW',
      description: 'Solution performante adaptee aux vehicules gourmands en energie',
      features: [
        'Puissance de charge jusqu\'a 11 kW',
        'Gestion dynamique de la charge',
        'Compatible heures creuses',
        'Suivi de consommation',
        'Protection contre les surtensions'
      ]
    };
  }

  // Recommandation par defaut
  return {
    title: 'Borne de recharge connectee 7,4 kW',
    description: 'Le meilleur compromis entre fonctionnalites et budget',
    features: [
      'Puissance de charge optimale de 7,4 kW',
      'Installation sur circuit dedie',
      'Connexion Bluetooth',
      'Programmation simple',
      'Compatible avec tous les vehicules'
    ]
  };
}