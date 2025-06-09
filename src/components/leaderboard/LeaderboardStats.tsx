
import { Card, CardContent } from '@/components/ui/card';
import { LeaderboardTimeframe } from '@/types/leaderboard';
import { Award, Check, Star, Zap } from 'lucide-react';

interface LeaderboardStatsProps {
  timeframe: LeaderboardTimeframe;
}

const LeaderboardStats = ({ timeframe }: LeaderboardStatsProps) => {
  // Στατιστικά ανάλογα με το χρονικό διάστημα (προσομοίωση)
  const stats = {
    all: {
      predictions: 1256,
      accuracy: 87,
      tokens: 158950,
      users: 723
    },
    month: {
      predictions: 312,
      accuracy: 89,
      tokens: 42380,
      users: 156
    },
    week: {
      predictions: 84,
      accuracy: 91,
      tokens: 10760,
      users: 48
    }
  };

  const currentStats = stats[timeframe];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-sportbet-gray border-sportbet-light-gray">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-sportbet-blue/20 p-3 rounded-full">
            <Check className="h-6 w-6 text-sportbet-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Predictions</p>
            <h3 className="text-2xl font-bold text-white">{currentStats.predictions.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-sportbet-gray border-sportbet-light-gray">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-sportbet-green/20 p-3 rounded-full">
            <Star className="h-6 w-6 text-sportbet-green" />
          </div>
          <div>
            <p className="text-sm text-gray-400">AI Accuracy</p>
            <h3 className="text-2xl font-bold text-white">{currentStats.accuracy}%</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-sportbet-gray border-sportbet-light-gray">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-full">
            <Zap className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">SBET Tokens Earned</p>
            <h3 className="text-2xl font-bold text-white">{currentStats.tokens.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-sportbet-gray border-sportbet-light-gray">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <Award className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Users</p>
            <h3 className="text-2xl font-bold text-white">{currentStats.users.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardStats;
