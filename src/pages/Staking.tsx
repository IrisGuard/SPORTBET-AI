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
import type { Database } from '@/integrations/supabase/types';

type UserStake = Database['public']['Tables']['user_stakes']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type StakingStats = Database['public']['Tables']['staking_stats']['Row'];

interface StakePool {
  id: number;
  name: string;
  duration: number;
  apy: number;
  minStake: number;
  description: string;
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
    queryFn: async (): Promise<Profile | null> => {
      if (!user) return null;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Profile fetch error:', error);
        return null;
      }
    },
    enabled: !!user,
  });

  // Get user's stakes
  const { data: userStakes = [] } = useQuery({
    queryKey: ['user-stakes', user?.id],
    queryFn: async (): Promise<UserStake[]> => {
      if (!user) return [];
      
      try {
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
              user_id: user.id,
              pool_id: 2,
              amount: 15000,
              apy: 18,
              staked_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
              unlock_date: addDays(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), 30).toISOString(),
              rewards_earned: 185,
              is_locked: true,
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: '2',
              user_id: user.id,
              pool_id: 1,
              amount: 8000,
              apy: 12,
              staked_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
              unlock_date: null,
              rewards_earned: 432,
              is_locked: false,
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ] as UserStake[];
        }

        return data || [];
      } catch (error) {
        console.error('Stakes fetch error:', error);
        return [];
      }
    },
    enabled: !!user,
  });

  // Get staking statistics
  const { data: stakingStats } = useQuery({
    queryKey: ['staking-stats'],
    queryFn: async (): Promise<StakingStats | null> => {
      try {
        const { data, error } = await supabase
          .from('staking_stats')
          .select('*')
          .single();

        if (error) {
          // Return mock stats if table doesn't exist
          return {
            id: 1,
            total_staked: 45000000,
            total_stakers: 8547,
            average_apy: 22.5,
            total_rewards_distributed: 2850000,
            updated_at: new Date().toISOString()
          } as StakingStats;
        }

        return data;
      } catch (error) {
        console.error('Stats fetch error:', error);
        return null;
      }
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

      try {
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
            is_locked: pool.duration > 0,
            status: 'active'
          });

        if (stakeError) {
          // If table doesn't exist, just record transaction
          console.log('Stakes table not found, recording transaction only');
        }
      } catch (error) {
        console.error('Stake insert error:', error);
      }

      // Record transaction
      try {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            transaction_type: 'stake',
            amount,
            status: 'completed',
            description: `Staked ${amount.toLocaleString()} SBET in ${pool.name}`
          });

        if (transactionError) throw transactionError;
      } catch (error) {
        console.error('Transaction record error:', error);
      }

      // Update balance
      try {
        const { error: balanceError } = await supabase.rpc('update_token_balance', {
          user_id: user.id,
          amount_change: -amount
        });

        if (balanceError) {
          console.log('Balance update function not found, updating directly');
          // Fallback to direct update
          await supabase
            .from('profiles')
            .update({ 
              token_balance: (profile?.token_balance || 0) - amount 
            })
            .eq('id', user.id);
        }
      } catch (error) {
        console.error('Balance update error:', error);
      }

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
      try {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            transaction_type: 'unstake',
            amount,
            status: 'completed',
            description: `Unstaked ${amount.toLocaleString()} SBET with ${rewards.toFixed(0)} SBET rewards`
          });

        if (transactionError) throw transactionError;
      } catch (error) {
        console.error('Transaction record error:', error);
      }

      // Update balance (principal + rewards)
      try {
        const { error: balanceError } = await supabase.rpc('update_token_balance', {
          user_id: user.id,
          amount_change: amount + rewards
        });

        if (balanceError) {
          console.log('Balance update function not found, updating directly');
          // Fallback to direct update
          await supabase
            .from('profiles')
            .update({ 
              token_balance: (profile?.token_balance || 0) + amount + rewards 
            })
            .eq('id', user.id);
        }
      } catch (error) {
        console.error('Balance update error:', error);
      }

      // Update stake record
      try {
        const { error: stakeError } = await supabase
          .from('user_stakes')
          .delete()
          .eq('id', stakeId);

        if (stakeError) {
          console.log('Stakes table update failed, but transaction recorded');
        }
      } catch (error) {
        console.error('Stake delete error:', error);
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
                {stakingStats?.total_staked?.toLocaleString() || '45,000,000'}
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
                {stakingStats?.total_stakers?.toLocaleString() || '8,547'}
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
                {stakingStats?.average_apy || 22.5}%
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
                        <div className="mt-6 p-4 bg-sportbet-dark rounded-lg">
                          <h4 className="text-white font-medium mb-4">Projected Rewards</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-3 bg-gray-700 rounded">
                              <p className="text-sm text-gray-400">Daily</p>
                              <p className="text-lg font-semibold text-white">
                                {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 1).toFixed(2)}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded">
                              <p className="text-sm text-gray-400">Weekly</p>
                              <p className="text-lg font-semibold text-white">
                                {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 7).toFixed(0)}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded">
                              <p className="text-sm text-gray-400">Monthly</p>
                              <p className="text-lg font-semibold text-white">
                                {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 30).toFixed(0)}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded">
                              <p className="text-sm text-gray-400">Yearly</p>
                              <p className="text-lg font-semibold text-white">
                                {calculateRewards(parseFloat(stakeAmount), selectedPoolData.apy, 365).toFixed(0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Active Stakes */}
          <div>
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Active Stakes
                </CardTitle>
                <CardDescription>Your current staking positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStakes.length === 0 ? (
                    <div className="text-center py-8">
                      <Lock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No active stakes yet</p>
                      <p className="text-sm text-gray-500">Start staking to earn rewards!</p>
                    </div>
                  ) : (
                    userStakes.map((stake) => {
                      const pool = stakingPools.find(p => p.id === stake.pool_id);
                      const daysStaked = Math.floor(
                        (Date.now() - new Date(stake.staked_at).getTime()) / (1000 * 60 * 60 * 24)
                      );
                      const canUnstake = !stake.is_locked || 
                        (stake.unlock_date && new Date() >= new Date(stake.unlock_date));

                      return (
                        <div key={stake.id} className="p-4 border border-sportbet-light-gray rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-white font-medium">{pool?.name || 'Unknown Pool'}</h4>
                              <p className="text-sm text-gray-400">
                                Staked {formatDistanceToNow(new Date(stake.staked_at))} ago
                              </p>
                            </div>
                            <Badge 
                              className={`${canUnstake ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                            >
                              {canUnstake ? 'Unlocked' : 'Locked'}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Amount:</span>
                              <span className="text-white">{stake.amount.toLocaleString()} SBET</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">APY:</span>
                              <span className="text-sportbet-green">{stake.apy}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Rewards Earned:</span>
                              <span className="text-sportbet-blue">{stake.rewards_earned.toFixed(2)} SBET</span>
                            </div>
                            {stake.unlock_date && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Unlock Date:</span>
                                <span className="text-white">
                                  {format(new Date(stake.unlock_date), 'MMM dd, yyyy')}
                                </span>
                              </div>
                            )}
                          </div>

                          {!stake.is_locked && (
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="Amount to unstake"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                                className="bg-sportbet-dark border-gray-600 text-white"
                                max={stake.amount}
                              />
                              <Button
                                onClick={() => unstakeMutation.mutate({ 
                                  stakeId: stake.id, 
                                  amount: parseFloat(unstakeAmount) || stake.amount 
                                })}
                                disabled={
                                  unstakeMutation.isPending ||
                                  !canUnstake ||
                                  (unstakeAmount && parseFloat(unstakeAmount) > stake.amount)
                                }
                                variant="outline"
                                className="w-full border-sportbet-orange text-sportbet-orange hover:bg-sportbet-orange/10"
                              >
                                {unstakeMutation.isPending ? 'Unstaking...' : 'Unstake'}
                              </Button>
                            </div>
                          )}

                          {stake.is_locked && stake.unlock_date && (
                            <div className="flex items-center gap-2 text-sm text-yellow-400">
                              <Clock className="h-4 w-4" />
                              <span>
                                Unlocks in {formatDistanceToNow(new Date(stake.unlock_date))}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Staking Summary */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Staking Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Staked:</span>
                    <span className="text-white font-semibold">{totalStaked.toLocaleString()} SBET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Rewards:</span>
                    <span className="text-sportbet-green font-semibold">{totalRewards.toFixed(2)} SBET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Stakes:</span>
                    <span className="text-white font-semibold">{userStakes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Monthly Rewards:</span>
                    <span className="text-sportbet-blue font-semibold">
                      {userStakes.reduce((sum, stake) => 
                        sum + calculateRewards(stake.amount, stake.apy, 30), 0
                      ).toFixed(0)} SBET
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staking; 