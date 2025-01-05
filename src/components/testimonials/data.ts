import type { Testimonial } from './types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: {
      name: 'Thomas Martin',
      role: 'Propriétaire Renault Zoe',
    },
    content: "Grâce aux conseils d'ElectroBorne, j'ai pu choisir et installer la borne parfaite pour ma Zoé. Le guide d'installation était très clair et j'ai apprécié les recommandations personnalisées.",
    rating: 5,
    date: '2024-01-15'
  },
  {
    id: '2',
    author: {
      name: 'Sophie Dubois',
      role: 'Propriétaire Tesla Model Y',
    },
    content: "Un blog vraiment complet qui m'a permis de comprendre tous les aspects de la recharge électrique. Les articles sont bien documentés et les explications sont accessibles même pour les novices.",
    rating: 5,
    date: '2024-01-10'
  },
  {
    id: '3',
    author: {
      name: 'Laurent Petit',
      role: 'Installateur électricien',
    },
    content: "En tant que professionnel, je recommande régulièrement ElectroBorne à mes clients. Les informations techniques sont précises et à jour, ce qui facilite grandement mon travail de conseil.",
    rating: 5,
    date: '2024-01-05'
  }
];