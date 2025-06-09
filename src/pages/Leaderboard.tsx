
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import LeaderboardFilters from '@/components/leaderboard/LeaderboardFilters';
import LeaderboardStats from '@/components/leaderboard/LeaderboardStats';
import { LeaderboardTimeframe } from '@/types/leaderboard';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('all');

  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Leaderboard</h1>
        </div>
        
        <div className="mb-8 p-4 bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
          <h2 className="text-xl font-semibold text-white mb-2">Top Predictors</h2>
          <p className="text-gray-300">
            View the top users on SportBet AI based on their prediction accuracy and tokens earned. 
            Only high-confidence predictions (85%+) count towards rankings.
          </p>
        </div>
        
        <LeaderboardFilters timeframe={timeframe} setTimeframe={setTimeframe} />
        <LeaderboardStats timeframe={timeframe} />
        <LeaderboardTable timeframe={timeframe} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
