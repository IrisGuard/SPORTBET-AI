
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useProfile } from '@/hooks/useProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSolanaWallet } from '@/context/SolanaWalletContext';

// Import wallet components
import WalletBalance from '@/components/wallet/WalletBalance';
import BuyTokensTab from '@/components/wallet/BuyTokensTab';
import WithdrawTab from '@/components/wallet/WithdrawTab';
import StakeTab from '@/components/wallet/StakeTab';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import LockedRewards from '@/components/wallet/LockedRewards';
import QuickLinks from '@/components/wallet/QuickLinks';
import NetworkInfo from '@/components/wallet/NetworkInfo';

export default function Wallet() {
  const { profile, loading } = useProfile();
  const { connected, publicKey, network } = useSolanaWallet();
  
  // Fetch transactions when wallet is connected
  useEffect(() => {
    // The transaction fetching is now handled in the TransactionHistory component
  }, [connected, publicKey, network]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Wallet</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray mb-6">
              <WalletBalance profile={profile} loading={loading} />
              
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid grid-cols-3 bg-sportbet-dark mx-6 mt-6">
                  <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buy">
                  <BuyTokensTab profile={profile} />
                </TabsContent>
                
                <TabsContent value="withdraw">
                  <WithdrawTab profile={profile} />
                </TabsContent>
                
                <TabsContent value="stake">
                  <StakeTab />
                </TabsContent>
              </Tabs>
            </div>
            
            <TransactionHistory />
          </div>
          
          <div className="space-y-6">
            <LockedRewards />
            <QuickLinks />
            <NetworkInfo />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
