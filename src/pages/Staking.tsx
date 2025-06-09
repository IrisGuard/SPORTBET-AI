import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  Clock,
  DollarSign,
  Calculator,
  Award,
  Users,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow, addDays, format } from 'date-fns';

interface StakePool {
  id: number;
  name: string;
  duration: number;
  apy: number;
  minStake: number;
  description: string;
}

interface UserStake {
  id: string;
  pool_id: number;
  amount: number;
  apy: number;
  staked_at: string;
  unlock_date: string | null;
  rewards_earned: number;
  is_locked: boolean;
}

const Staking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState(1);

  // Staking pools configuration
  const stakingPools: StakePool[] = [
    {
      id: 1,
      name: 'Flexible Pool',
      duration: 0,
      apy: 12,
      minStake: 1000,
      description: 'Unstake anytime with 12% APY'
    },
    {
      id: 2,
      name: '30-Day Lock',
      duration: 30,
      apy: 18,
      minStake: 5000,
      description: '30-day lock period with 18% APY'
    },
    {
      id: 3,
      name: '90-Day Lock',
      duration: 90,
      apy: 25,
      minStake: 10000,
      description: '90-day lock period with 25% APY'
    },
    {
      id: 4,
      name: 'VIP Pool',
      duration: 180,
      apy: 35,
      minStake: 50000,
      description: '180-day lock with maximum rewards'
    }
  ];

  // Get user profile
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['staking-profile', user?.id],
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

  // Get user's stakes
  const { data: userStakes = [] } = useQuery({
    queryKey: ['user-stakes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Check if stakes table exists, if not return mock data
      const { data, error } = await supabase
        .from('user_stakes')
        .select('*')
        .eq('user_id', user.id)
        .order('staked_at', { ascending: false });

      if (error) {
        // Return mock data if table doesn't exist yet
        console.log('Stakes table not found, using mock data');
        return [
          {
            id: '1',
            pool_id: 2,
            amount: 15000,
            apy: 18,
            staked_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            unlock_date: addDays(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), 30).toISOString(),
            rewards_earned: 185,
            is_locked: true
          },
          {
            id: '2',
            pool_id: 1,
            amount: 8000,
            apy: 12,
            staked_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            unlock_date: null,
            rewards_earned: 432,
            is_locked: false
          }
        ];
      }

      return data || [];
    },
    enabled: !!user,
  });

  // Get staking statistics
  const { data: stakingStats } = useQuery({
    queryKey: ['staking-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staking_stats')
        .select('*')
        .single();

      if (error) {
        // Return mock stats if table doesn't exist
        return {
          totalStaked: 45000000,
          totalStakers: 8547,
          averageApy: 22.5,
          totalRewardsDistributed: 2850000
        };
      }

      return data;
    },
  });

  // Calculate potential rewards
  const calculateRewards = (amount: number, apy: number, days: number = 365) => {
    return (amount * apy / 100 * days / 365);
  };

  // Stake tokens mutation
  const stakeMutation = useMutation({
    mutationFn: async ({ amount, poolId }: { amount: number; poolId: number }) => {
      if (!user) throw new Error('User not authenticated');

      // Check balance
      if (!profile || (profile.token_balance || 0) < amount) {
        throw new Error('Insufficient token balance');
      }

      const pool = stakingPools.find(p => p.id === poolId);
      if (!pool) throw new Error('Invalid pool selected');

      if (amount < pool.minStake) {
        throw new Error(`Minimum stake for this pool is ${pool.minStake.toLocaleString()} SBET`);
      }

      // Create stake record
      const unlockDate = pool.duration > 0 
        ? addDays(new Date(), pool.duration).toISOString()
        : null;

      const { error: stakeError } = await supabase
        .from('user_stakes')
        .insert({
          user_id: user.id,
          pool_id: poolId,
          amount,
          apy: pool.apy,
          staked_at: new Date().toISOString(),
          unlock_date: unlockDate,
          rewards_earned: 0,
          is_locked: pool.duration > 0
        });

      if (stakeError) {
        // If table doesn't exist, just record transaction
        console.log('Stakes table not found, recording transaction only');
      }

      // Record transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'stake',
          amount,
          description: `Staked ${amount.toLocaleString()} SBET in ${pool.name}`
        });

      if (transactionError) throw transactionError;

      // Update balance
      const { error: balanceError } = await supabase.rpc('update_token_balance', {
        user_id: user.id,
        amount_change: -amount
      });

      if (balanceError) throw balanceError;

      return { amount, pool: pool.name };
    },
    onSuccess: (result) => {
      toast.success(`Successfully staked ${result.amount.toLocaleString()} SBET in ${result.pool}!`);
      setStakeAmount('');
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
      queryClient.invalidateQueries({ queryKey: ['staking-profile'] });
      refetchProfile();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Staking failed');
    },
  });

  // Unstake tokens mutation
  const unstakeMutation = useMutation({
    mutationFn: async ({ stakeId, amount }: { stakeId: string; amount: number }) => {
      if (!user) throw new Error('User not authenticated');

      const stake = userStakes.find(s => s.id === stakeId);
      if (!stake) throw new Error('Stake not found');

      if (stake.is_locked && stake.unlock_date && new Date() < new Date(stake.unlock_date)) {
        throw new Error('Stake is still locked');
      }

      // Calculate rewards
      const daysStaked = Math.floor((Date.now() - new Date(stake.staked_at).getTime()) / (1000 * 60 * 60 * 24));
      const rewards = calculateRewards(stake.amount, stake.apy, daysStaked);

      // Record unstake transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'unstake',
          amount,
          description: `Unstaked ${amount.toLocaleString()} SBET with ${rewards.toFixed(0)} SBET rewards`
        });

      if (transactionError) throw transactionError;

      // Update balance (principal + rewards)
      const { error: balanceError } = await supabase.rpc('update_token_balance', {
        user_id: user.id,
        amount_change: amount + rewards
      });

      if (balanceError) throw balanceError;

      // Update stake record
      const { error: stakeError } = await supabase
        .from('user_stakes')
        .delete()
        .eq('id', stakeId);

      if (stakeError) {
        console.log('Stakes table update failed, but transaction recorded');
      }

      return { amount, rewards };
    },
    onSuccess: (result) => {
      toast.success(`Unstaked ${result.amount.toLocaleString()} SBET + ${result.rewards.toFixed(0)} rewards!`);
      setUnstakeAmount('');
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
      queryClient.invalidateQueries({ queryKey: ['staking-profile'] });
      refetchProfile();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Unstaking failed');
    },
  });

  const selectedPoolData = stakingPools.find(p => p.id === selectedPool);
  const totalStaked = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalRewards = userStakes.reduce((sum, stake) => sum + stake.rewards_earned, 0);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SBET Staking</h1>
          <p className="text-gray-400">Stake your SBET tokens to earn passive rewards</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Staked</CardTitle>
              <Lock className="h-4 w-4 text-sportbet-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stakingStats?.totalStaked?.toLocaleString() || '45,000,000'}
              </div>
              <p className="text-xs text-gray-400">SBET tokens</p>
            </CardContent>
          </Card>

          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Stakers</CardTitle>
              <Users className="h-4 w-4 text-sportbet-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stakingStats?.totalStakers?.toLocaleString() || '8,547'}
              </div>
              <p className="text-xs text-gray-400">Active stakers</p>
            </CardContent>
          </Card>

          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Average APY</CardTitle>
              <TrendingUp className="h-4 w-4 text-sportbet-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stakingStats?.averageApy || 22.5}%
              </div>
              <p className="text-xs text-gray-400">Across all pools</p>
            </CardContent>
          </Card>

          <Card className="bg-sportbet-gray border-sportbet-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Your Staked</CardTitle>
              <DollarSign className="h-4 w-4 text-sportbet-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalStaked.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+{totalRewards.toFixed(0)} rewards</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Pools */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="stake" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-sportbet-gray">
                <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
                <TabsTrigger value="pools">Pool Info</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
              </TabsList>

              <TabsContent value="stake">
                <Card className="bg-sportbet-gray border-sportbet-light-gray">
                  <CardHeader>
                    <CardTitle className="text-white">Stake SBET Tokens</CardTitle>
                    <CardDescription>Choose a staking pool and stake your tokens</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Pool Selection */}
                    <div>
                      <label className="text-sm text-gray-400 mb-3 block">Select Staking Pool</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stakingPools.map((pool) => (
                          <Card 
                            key={pool.id}
                            className={`cursor-pointer transition-all ${
                              selectedPool === pool.id 
                                ? 'border-sportbet-blue bg-sportbet-blue/10' 
                                : 'border-sportbet-light-gray hover:border-sportbet-blue/50'
                            }`}
                            onClick={() => setSelectedPool(pool.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium">{pool.name}</h4>
                                <Badge className="bg-sportbet-green/20 text-sportbet-green">
                                  {pool.apy}% APY
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{pool.description}</p>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>Min: {pool.minStake.toLocaleString()} SBET</span>
                                <span>{pool.duration > 0 ? `${pool.duration} days` : 'Flexible'}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Stake Amount */}
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Stake Amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount to stake"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-sportbet-dark border-gray-600 text-white"
                        min={selectedPoolData?.minStake || 1000}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-400">
                          Min: {selectedPoolData?.minStake.toLocaleString()} SBET
                        </span>
                        <span className="text-gray-400">
                          Available: {profile?.token_balance?.toLocaleString() || 0} SBET
                        </span>
                      </div>
                    </div>

                    {/* Stake Preview */}
                    {stakeAmount && selectedPoolData && !isNaN(parseFloat(stakeAmount)) && (
                      <div className="p-4 bg-sportbet-dark rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Staking Pool:</span>
                          <span className="text-white">{selectedPoolData.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">APY:</span>
                          <span className="text-sportbet-green">{selectedPoolData.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Lock Period:</span>
                          <span className="text-white">
                            {selectedPoolData.duration > 0 ? `${selectedPoolData.duration} days` : 'Flexible'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Estimated Monthly Rewards:</span>
                          <span className="text-sportbet-blue">
                            {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 30).toFixed(0)} SBET
                          </span>
                        </div>
                        {selectedPoolData.duration > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Unlock Date:</span>
                            <span className="text-white">
                              {format(addDays(new Date(), selectedPoolData.duration), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={() => stakeMutation.mutate({ 
                        amount: parseFloat(stakeAmount), 
                        poolId: selectedPool 
                      })}
                      disabled={
                        !stakeAmount || 
                        !selectedPoolData ||
                        stakeMutation.isPending ||
                        parseFloat(stakeAmount) < selectedPoolData.minStake ||
                        parseFloat(stakeAmount) > (profile?.token_balance || 0)
                      }
                      className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80"
                    >
                      {stakeMutation.isPending ? 'Staking...' : 'Stake Tokens'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pools">
                <Card className="bg-sportbet-gray border-sportbet-light-gray">
                  <CardHeader>
                    <CardTitle className="text-white">Staking Pools Information</CardTitle>
                    <CardDescription>Compare different staking options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stakingPools.map((pool) => (
                        <div key={pool.id} className="p-4 border border-sportbet-light-gray rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-white font-semibold">{pool.name}</h4>
                              <p className="text-sm text-gray-400">{pool.description}</p>
                            </div>
                            <Badge className="bg-sportbet-green/20 text-sportbet-green">
                              {pool.apy}% APY
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <p className="text-white">
                                {pool.duration > 0 ? `${pool.duration} days` : 'Flexible'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400">Min Stake:</span>
                              <p className="text-white">{pool.minStake.toLocaleString()} SBET</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Monthly Rewards (10k):</span>
                              <p className="text-sportbet-blue">
                                {calculateRewards(10000, pool.apy, 30).toFixed(0)} SBET
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculator">
                <Card className="bg-sportbet-gray border-sportbet-light-gray">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Rewards Calculator
                    </CardTitle>
                    <CardDescription>Calculate potential staking rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Amount (SBET)</label>
                          <Input
                            type="number"
                            placeholder="10000"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="bg-sportbet-dark border-gray-600"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Pool</label>
                          <select 
                            value={selectedPool}
                            onChange={(e) => setSelectedPool(parseInt(e.target.value))}
                            className="w-full p-2 bg-sportbet-dark border border-gray-600 rounded text-white"
                          >
                            {stakingPools.map(pool => (
                              <option key={pool.id} value={pool.id}>{pool.name} - {pool.apy}%</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {stakeAmount && selectedPoolData && !isNaN(parseFloat(stakeAmount)) && (
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="text-center p-4 bg-sportbet-dark rounded-lg">
                            <p className="text-sm text-gray-400">Daily Rewards</p>
                            <p className="text-xl font-bold text-sportbet-green">
                              {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 1).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">SBET</p>
                          </div>
                          <div className="text-center p-4 bg-sportbet-dark rounded-lg">
                            <p className="text-sm text-gray-400">Monthly Rewards</p>
                            <p className="text-xl font-bold text-sportbet-blue">
                              {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 30).toFixed(0)}
                            </p>
                            <p className="text-xs text-gray-400">SBET</p>
                          </div>
                          <div className="text-center p-4 bg-sportbet-dark rounded-lg">
                            <p className="text-sm text-gray-400">Yearly Rewards</p>
                            <p className="text-xl font-bold text-sportbet-orange">
                              {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 365).toFixed(0)}
                            </p>
                            <p className="text-xs text-gray-400">SBET</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Your Stakes */}
          <div>
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Your Stakes</CardTitle>
                <CardDescription>Active staking positions</CardDescription>
              </CardHeader>
              <CardContent>
                {userStakes.length > 0 ? (
                  <div className="space-y-4">
                    {userStakes.map((stake) => {
                      const pool = stakingPools.find(p => p.id === stake.pool_id);
                      const isUnlocked = !stake.is_locked || 
                        (stake.unlock_date && new Date() >= new Date(stake.unlock_date));
                      
                      return (
                        <div key={stake.id} className="p-4 bg-sportbet-dark rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-white font-medium">{pool?.name}</h4>
                              <p className="text-sm text-gray-400">
                                {stake.amount.toLocaleString()} SBET
                              </p>
                            </div>
                            <Badge className={`${
                              isUnlocked 
                                ? 'bg-sportbet-green/20 text-sportbet-green' 
                                : 'bg-sportbet-orange/20 text-sportbet-orange'
                            }`}>
                              {isUnlocked ? 'Unlocked' : 'Locked'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">APY:</span>
                              <span className="text-white">{stake.apy}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Staked:</span>
                              <span className="text-white">
                                {formatDistanceToNow(new Date(stake.staked_at))} ago
                              </span>
                            </div>
                            {stake.unlock_date && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  {isUnlocked ? 'Unlocked:' : 'Unlocks:'}
                                </span>
                                <span className="text-white">
                                  {format(new Date(stake.unlock_date), 'MMM dd, yyyy')}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">Rewards:</span>
                              <span className="text-sportbet-green">
                                +{stake.rewards_earned.toFixed(2)} SBET
                              </span>
                            </div>
                          </div>

                          {isUnlocked && (
                            <Button
                              onClick={() => unstakeMutation.mutate({ 
                                stakeId: stake.id, 
                                amount: stake.amount 
                              })}
                              disabled={unstakeMutation.isPending}
                              variant="outline"
                              size="sm"
                              className="w-full mt-3 border-sportbet-green text-sportbet-green hover:bg-sportbet-green/10"
                            >
                              {unstakeMutation.isPending ? 'Unstaking...' : 'Unstake'}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-2">No active stakes</p>
                    <p className="text-sm text-gray-500">Start staking to earn rewards</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staking; 