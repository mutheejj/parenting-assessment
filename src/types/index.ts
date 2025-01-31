export type ParentingStyle = 'authoritative' | 'authoritarian' | 'permissive' | 'neglectful';

export interface Question {
  id: number;
  text: string;
  category: ParentingStyle;
}

export interface Answer {
  questionId: number;
  score: number;
  category: ParentingStyle;
}

export interface AssessmentResult {
  predominantStyle: ParentingStyle;
  scores: {
    authoritative: number;
    authoritarian: number;
    permissive: number;
    neglectful: number;
  };
  blendedStyles: ParentingStyle[];
}

export interface ParentingStyleInfo {
  title: string;
  name: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

export interface AssessmentState {
  currentQuestionIndex: number;
  answers: Answer[];
  result: AssessmentResult | null;
}
