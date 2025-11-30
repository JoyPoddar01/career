export enum Dimension {
  Curiosity = "Curiosity",
  Analytical = "Analytical",
  Creativity = "Creativity",
  Social = "Social",
  Practical = "Practical",
  Leadership = "Leadership",
  RiskTolerance = "RiskTolerance",
  DetailOriented = "DetailOriented",
  Empathy = "Empathy",
  Persistence = "Persistence",
  Communication = "Communication",
  Numerical = "Numerical",
  Visual = "Visual",
  Teaching = "Teaching",
  Autonomy = "Autonomy"
}

export type Language = 'bn' | 'en';

export interface Question {
  id: number;
  text_bn: string;
  text_en: string;
  dimension: Dimension;
  weight?: number;
}

export interface Answer {
  questionId: number;
  value: number; // 1-5
}

export interface CareerRule {
  id: string;
  title_en: string;
  title_bn: string;
  requiredDimensions: Dimension[]; // High impact dimensions
  secondaryDimensions?: Dimension[]; // Supportive dimensions
  description_bn: string;
  description_en: string;
  nextSteps_bn: string[];
  nextSteps_en: string[];
}

export interface CareerResult {
  ruleId: string;
  title: string;
  matchPercentage: number;
  rationale: string;
  nextSteps: string[];
  dimensionScores: Record<string, number>;
}

export interface QuizState {
  answers: Record<number, number>;
  currentQuestionIndex: number;
  isComplete: boolean;
  history: CareerResult[];
}
