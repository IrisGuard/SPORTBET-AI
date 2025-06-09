
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LeaderboardUser, LeaderboardTimeframe } from '@/types/leaderboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardTableProps {
  timeframe: LeaderboardTimeframe;
}

const LeaderboardTable = ({ timeframe }: LeaderboardTableProps) => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Προσομοίωση φόρτωσης δεδομένων
    setLoading(true);
    
    setTimeout(() => {
      // Προσομοιωμένα δεδομένα
      const mockUsers: LeaderboardUser[] = [
        {
          id: '1',
          username: 'PredictionKing',
          avatar_url: null,
          correct_predictions: 52,
          token_balance: 5280,
          tokens_earned: 7430,
          locked_tokens: 3500,
          rank: 1
        },
        {
          id: '2',
          username: 'SportsMaster',
          avatar_url: null,
          correct_predictions: 47,
          token_balance: 4350,
          tokens_earned: 6120,
          locked_tokens: 2850,
          rank: 2
        },
        {
          id: '3',
          username: 'FootballGuru',
          avatar_url: null,
          correct_predictions: 45,
          token_balance: 3980,
          tokens_earned: 5740,
          locked_tokens: 2600,
          rank: 3
        },
        {
          id: '4',
          username: 'BasketballWiz',
          avatar_url: null,
          correct_predictions: 42,
          token_balance: 3640,
          tokens_earned: 5320,
          locked_tokens: 2400,
          rank: 4
        },
        {
          id: '5',
          username: 'TennisExpert',
          avatar_url: null,
          correct_predictions: 39,
          token_balance: 3210,
          tokens_earned: 4870,
          locked_tokens: 2100,
          rank: 5
        },
        {
          id: '6',
          username: 'AnalysisNinja',
          avatar_url: null,
          correct_predictions: 36,
          token_balance: 2890,
          tokens_earned: 4320,
          locked_tokens: 1870,
          rank: 6
        },
        {
          id: '7',
          username: 'StatsQueen',
          avatar_url: null,
          correct_predictions: 33,
          token_balance: 2570,
          tokens_earned: 3960,
          locked_tokens: 1650,
          rank: 7
        },
        {
          id: '8',
          username: 'VolleyballFan',
          avatar_url: null,
          correct_predictions: 31,
          token_balance: 2340,
          tokens_earned: 3680,
          locked_tokens: 1520,
          rank: 8
        },
        {
          id: '9',
          username: 'SoccerSpecialist',
          avatar_url: null,
          correct_predictions: 28,
          token_balance: 2120,
          tokens_earned: 3410,
          locked_tokens: 1380,
          rank: 9
        },
        {
          id: '10',
          username: 'AIBeliver',
          avatar_url: null,
          correct_predictions: 26,
          token_balance: 1950,
          tokens_earned: 3180,
          locked_tokens: 1260,
          rank: 10
        }
      ];

      // Προσαρμογή δεδομένων ανάλογα με το χρονικό διάστημα
      if (timeframe === 'week') {
        mockUsers.forEach(user => {
          user.correct_predictions = Math.floor(user.correct_predictions / 10);
          user.token_balance = Math.floor(user.token_balance / 8);
          user.tokens_earned = Math.floor(user.tokens_earned / 8);
          user.locked_tokens = Math.floor(user.locked_tokens / 8);
        });
      } else if (timeframe === 'month') {
        mockUsers.forEach(user => {
          user.correct_predictions = Math.floor(user.correct_predictions / 3);
          user.token_balance = Math.floor(user.token_balance / 3);
          user.tokens_earned = Math.floor(user.tokens_earned / 3);
          user.locked_tokens = Math.floor(user.locked_tokens / 3);
        });
      }

      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  const renderRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="h-5 w-5 text-yellow-400" />;
    } else if (rank === 2) {
      return <Trophy className="h-5 w-5 text-gray-400" />;
    } else if (rank === 3) {
      return <Trophy className="h-5 w-5 text-amber-700" />;
    } else {
      return <span className="text-gray-400">{rank}</span>;
    }
  };

  const renderAvatarOrInitials = (user: LeaderboardUser) => {
    if (user.avatar_url) {
      return (
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 bg-sportbet-blue rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-medium">
          {user.username.substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-sportbet-gray border border-sportbet-light-gray rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-sportbet-light-gray">
              <TableHead className="text-gray-300 w-16 text-center">Rank</TableHead>
              <TableHead className="text-gray-300">User</TableHead>
              <TableHead className="text-gray-300 text-right">Correct Predictions</TableHead>
              <TableHead className="text-gray-300 text-right">Tokens Earned</TableHead>
              <TableHead className="text-gray-300 text-right">Locked Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10).fill(0).map((_, i) => (
                <TableRow key={i} className="border-b border-sportbet-light-gray">
                  <TableCell className="text-center"><Skeleton className="h-6 w-6 bg-sportbet-light-gray mx-auto" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full bg-sportbet-light-gray" />
                      <Skeleton className="h-5 w-32 bg-sportbet-light-gray" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-16 bg-sportbet-light-gray ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 bg-sportbet-light-gray ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 bg-sportbet-light-gray ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="border-b border-sportbet-light-gray hover:bg-sportbet-light-gray/10">
                  <TableCell className="text-center font-medium">
                    {renderRankIcon(user.rank)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {renderAvatarOrInitials(user)}
                      <span className="text-white">{user.username}</span>
                      {user.rank <= 3 && (
                        <span className="bg-sportbet-blue/20 text-sportbet-blue text-xs px-2 py-1 rounded-full">
                          Top {user.rank}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-right">{user.correct_predictions}</TableCell>
                  <TableCell className="text-white text-right">{user.tokens_earned.toLocaleString()} SBET</TableCell>
                  <TableCell className="text-white text-right">{user.locked_tokens.toLocaleString()} SBET</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
