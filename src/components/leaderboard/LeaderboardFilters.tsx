
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaderboardTimeframe } from '@/types/leaderboard';

interface LeaderboardFiltersProps {
  timeframe: LeaderboardTimeframe;
  setTimeframe: (timeframe: LeaderboardTimeframe) => void;
}

const LeaderboardFilters = ({ timeframe, setTimeframe }: LeaderboardFiltersProps) => {
  return (
    <div className="mb-6">
      <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as LeaderboardTimeframe)}>
        <TabsList className="bg-sportbet-gray">
          <TabsTrigger value="all">All Time</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LeaderboardFilters;
