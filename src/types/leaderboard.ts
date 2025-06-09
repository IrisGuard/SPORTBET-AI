
export interface LeaderboardUser {
  id: string;
  username: string;
  avatar_url: string | null;
  correct_predictions: number;
  token_balance: number;
  tokens_earned: number;
  locked_tokens: number;
  rank: number;
}

export type LeaderboardTimeframe = 'all' | 'week' | 'month';
