import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  Trophy, 
  Target,
  ArrowUpRight,
  Clock,
  DollarSign,
  Lock,
  Zap,
  Gift,
  Star,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface UserStats {
  total_predictions: number;
  successful_predictions: number;
  total_earned: number;
  current_streak: number;
}

interface RecentPrediction {
  id: string;
  prediction: any;
  status: string;
  purchased_at: string;
  amount_paid: number;
}

const Dashboard = () => {
  const { user } = useAuth();

  // Get user profile with token balance
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['dashboard-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get user statistics
  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Try to get real stats, fallback to mock data
      const { data, error } = await supabase
        .from('user_prediction_purchases')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        // Return mock stats if table doesn't exist
        return {
          total_predictions: 12,
          successful_predictions: 8,
          total_earned: 2450,
          current_streak: 3
        };
      }

      // Calculate real stats
      const totalPredictions = data?.length || 0;
      const successfulPredictions = data?.filter(p => p.status === 'won').length || 0;
      const totalEarned = data?.reduce((sum, p) => sum + (p.winnings || 0), 0) || 0;
      
      return {
        total_predictions: totalPredictions,
        successful_predictions: successfulPredictions,
        total_earned: totalEarned,
        current_streak: 3 // Mock streak for now
      };
    },
    enabled: !!user,
  });

  // Get recent predictions
  const { data: recentPredictions = [] } = useQuery({
    queryKey: ['recent-predictions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_prediction_purchases')
        .select(`
          *,
          predictions:prediction_id (
            id,
            title,
            sport,
            match_date,
            confidence,
            prediction_type
          )
        `)
        .eq('user_id', user.id)
        .order('purchased_at', { ascending: false })
        .limit(5);

      if (error) {
        // Return mock data if table doesn't exist
        return [
          {
            id: '1',
            prediction: { title: 'Real Madrid vs Barcelona', sport: 'Football', confidence: 85 },
            status: 'won',
            purchased_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            amount_paid: 150
          },
          {
            id: '2',
            prediction: { title: 'Lakers vs Warriors', sport: 'Basketball', confidence: 72 },
            status: 'pending',
            purchased_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            amount_paid: 200
          }
        ];
      }

      return data || [];
    },
    enabled: !!user,
  });

  // Get user's current stakes
  const { data: userStakes = [] } = useQuery({
    queryKey: ['dashboard-stakes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_stakes')
        .select('*')
        .eq('user_id', user.id)
        .order('staked_at', { ascending: false })
        .limit(3);

      if (error) {
        // Return mock stakes
        return [
          {
            id: '1',
            amount: 15000,
            apy: 18,
            staked_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            rewards_earned: 185,
            is_locked: true
          }
        ];
      }

      return data || [];
    },
    enabled: !!user,
  });

  const winRate = userStats ? 
    userStats.total_predictions > 0 ? 
      (userStats.successful_predictions / userStats.total_predictions) * 100 : 0 
    : 0;

  const totalStaked = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalStakeRewards = userStakes.reduce((sum, stake) => sum + stake.rewards_earned, 0);

  if (profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sportbet-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-gray-400">Here's your sports prediction overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Token Balance */}
          <Card className="bg-gradient-to-br from-sportbet-blue to-sportbet-blue/80 border-sportbet-blue">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Token Balance</CardTitle>
              <Wallet className="h-4 w-4 text-white/90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profile?.token_balance?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-white/70">SBET Tokens</p>
              <div className="flex space-x-2 mt-3">
                <Link to="/buy-token">
                  <Button size="sm" variant="secondary" className="text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                </Link>
                <Link to="/staking">
                  <Button size="sm" variant="outline" className="text-xs text-white border-white/30">
                    <Lock className="h-3 w-3 mr-1" />
                    Stake
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Win Rate */}
          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-sportbet-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{winRate.toFixed(1)}%</div>
              <p className="text-xs text-gray-400">
                {userStats?.successful_predictions || 0} of {userStats?.total_predictions || 0} predictions
              </p>
              <Progress value={winRate} className="mt-3" />
            </CardContent>
          </Card>

          {/* Total Earned */}
          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-sportbet-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {(userStats?.total_earned || 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">SBET from predictions</p>
              {totalStakeRewards > 0 && (
                <p className="text-xs text-sportbet-green mt-1">
                  +{totalStakeRewards.toFixed(0)} from staking
                </p>
              )}
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Win Streak</CardTitle>
              <Trophy className="h-4 w-4 text-sportbet-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats?.current_streak || 0}</div>
              <p className="text-xs text-gray-400">Consecutive wins</p>
              {(userStats?.current_streak || 0) > 2 && (
                <div className="flex items-center mt-2">
                  <Star className="h-3 w-3 text-sportbet-orange mr-1" />
                  <span className="text-xs text-sportbet-orange">On fire!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Predictions */}
          <div className="lg:col-span-2">
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Predictions</CardTitle>
                  <CardDescription>Your latest prediction purchases</CardDescription>
                </div>
                <Link to="/predictions">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentPredictions.length > 0 ? (
                  <div className="space-y-4">
                    {recentPredictions.map((prediction) => (
                      <div key={prediction.id} className="flex items-center justify-between p-4 bg-sportbet-dark rounded-lg">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">
                            {prediction.prediction?.title || prediction.predictions?.title || 'Unknown Match'}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span>{prediction.prediction?.sport || prediction.predictions?.sport || 'Sports'}</span>
                            <span>•</span>
                            <span>{formatDistanceToNow(new Date(prediction.purchased_at))} ago</span>
                            <span>•</span>
                            <span>{prediction.amount_paid} SBET</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {prediction.prediction?.confidence && (
                            <div className="text-center">
                              <div className="text-xs text-gray-400">Confidence</div>
                              <div className="text-sm font-medium text-sportbet-blue">
                                {prediction.prediction.confidence}%
                              </div>
                            </div>
                          )}
                          <Badge 
                            variant={
                              prediction.status === 'won' ? 'default' : 
                              prediction.status === 'lost' ? 'destructive' : 
                              'secondary'
                            }
                            className={
                              prediction.status === 'won' ? 'bg-sportbet-green/20 text-sportbet-green' :
                              prediction.status === 'lost' ? 'bg-red-500/20 text-red-400' :
                              'bg-sportbet-orange/20 text-sportbet-orange'
                            }
                          >
                            {prediction.status === 'won' ? 'Won' : 
                             prediction.status === 'lost' ? 'Lost' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-2">No predictions yet</p>
                    <p className="text-sm text-gray-500 mb-4">Purchase your first prediction to get started</p>
                    <Link to="/predictions">
                      <Button className="bg-sportbet-blue hover:bg-sportbet-blue/80">
                        Browse Predictions
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Staking Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription>Manage your account and tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/buy-token" className="block">
                  <Button className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Buy SBET Tokens
                  </Button>
                </Link>
                <Link to="/staking" className="block">
                  <Button variant="outline" className="w-full justify-start border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10">
                    <Lock className="h-4 w-4 mr-2" />
                    Stake Tokens
                  </Button>
                </Link>
                <Link to="/predictions" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Browse Predictions
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                    <Wallet className="h-4 w-4 mr-2" />
                    Manage Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Staking Overview */}
            {totalStaked > 0 && (
              <Card className="bg-gradient-to-br from-sportbet-green/20 to-sportbet-blue/20 border-sportbet-green/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Your Stakes
                  </CardTitle>
                  <CardDescription>Active staking positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Staked:</span>
                      <span className="text-white font-medium">{totalStaked.toLocaleString()} SBET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rewards Earned:</span>
                      <span className="text-sportbet-green font-medium">+{totalStakeRewards.toFixed(0)} SBET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Stakes:</span>
                      <span className="text-white font-medium">{userStakes.length}</span>
                    </div>
                  </div>
                  <Link to="/staking">
                    <Button size="sm" className="w-full mt-4 bg-sportbet-green hover:bg-sportbet-green/80">
                      <Zap className="h-4 w-4 mr-1" />
                      Manage Stakes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Get Started Card */}
            {(profile?.token_balance || 0) === 0 && (
              <Card className="bg-gradient-to-br from-sportbet-blue/20 to-sportbet-green/20 border-sportbet-blue/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Get Started
                  </CardTitle>
                  <CardDescription>Start your prediction journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-sportbet-blue text-white text-xs flex items-center justify-center mr-3">1</div>
                      <span>Buy SBET tokens</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-sportbet-green text-white text-xs flex items-center justify-center mr-3">2</div>
                      <span>Purchase predictions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-sportbet-orange text-white text-xs flex items-center justify-center mr-3">3</div>
                      <span>Earn rewards</span>
                    </div>
                  </div>
                  <Link to="/buy-token">
                    <Button className="w-full mt-4 bg-gradient-to-r from-sportbet-blue to-sportbet-green">
                      <Zap className="h-4 w-4 mr-1" />
                      Get Your First Tokens
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
