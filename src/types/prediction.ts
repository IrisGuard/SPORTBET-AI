
export type Prediction = {
  id: string;
  sport: string;
  competition: string;
  match_date: string;
  team_a: string;
  team_b: string;
  prediction: string;
  confidence: number;
  explanation: string;
  price: number;
  is_free: boolean;
  match_id?: string;
  league?: string;
};

export type PredictionFilter = {
  sport?: string;
  date?: string;
  minConfidence?: number;
  search?: string;
  league?: string;
};

// Export the minimum confidence threshold
export const MIN_CONFIDENCE_THRESHOLD = 85;
