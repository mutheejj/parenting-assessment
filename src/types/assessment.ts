export interface ParentingStyle {
  title: string;
  name: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

export interface AssessmentResult {
  predominantStyle: ParentingStyle;
  scores: Record<string, number>;
}
