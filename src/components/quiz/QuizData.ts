export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Quelle est la puissance typique d'une borne de recharge domestique ?",
    options: ["3.7 kW", "7.4 kW", "22 kW", "50 kW"],
    correctAnswer: 1,
    explanation: "La puissance standard d'une borne domestique est de 7.4 kW en monophasé."
  },
  {
    id: 2,
    question: "Quel type de connecteur est le plus répandu en Europe ?",
    options: ["CHAdeMO", "Type 2", "CCS", "Type 1"],
    correctAnswer: 1,
    explanation: "Le Type 2 (Mennekes) est le standard européen pour la recharge en courant alternatif."
  },
  {
    id: 3,
    question: "En moyenne, combien de temps faut-il pour recharger à 80% sur une borne rapide ?",
    options: ["5-10 minutes", "20-40 minutes", "1-2 heures", "4-6 heures"],
    correctAnswer: 1,
    explanation: "Sur une borne rapide, la recharge à 80% prend généralement entre 20 et 40 minutes."
  },
  {
    id: 4,
    question: "Quelle est la durée de vie moyenne d'une borne de recharge ?",
    options: ["2-3 ans", "5-7 ans", "8-10 ans", "15-20 ans"],
    correctAnswer: 2,
    explanation: "Une borne de recharge bien entretenue peut durer entre 8 et 10 ans."
  },
  {
    id: 5,
    question: "Quel est le coût moyen d'installation d'une borne domestique ?",
    options: ["300-500€", "800-1500€", "2000-3000€", "5000€+"],
    correctAnswer: 1,
    explanation: "L'installation d'une borne domestique coûte généralement entre 800 et 1500€."
  }
];