
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useSolanaWallet } from '@/context/SolanaWalletContext';
import { SOLANA_NETWORKS } from '@/config/solana';
import { toast as sonnerToast } from 'sonner';

interface WithdrawTabProps {
  profile: any;
}

const WithdrawTab = ({ profile }: WithdrawTabProps) => {
  const { connected, walletAddress, network } = useSolanaWallet();
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);

  const handleWithdraw = async () => {
    if (!connected || !walletAddress) {
      sonnerToast.error("Please connect your wallet first");
      return;
    }

    if (!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
      sonnerToast.error("Please enter a valid withdrawal amount");
      return;
    }

    if (parseFloat(withdrawAmount) > (profile?.token_balance || 0)) {
      sonnerToast.error("Insufficient balance");
      return;
    }

    if (!destinationAddress) {
      sonnerToast.error("Please enter a destination address");
      return;
    }

    setWithdrawLoading(true);
    
    try {
      // This would call your actual withdrawal function
      // For now it's just a simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      sonnerToast.success(`Withdrawn ${withdrawAmount} SBET tokens successfully`);
      setWithdrawAmount('');
      setDestinationAddress('');
    } catch (error) {
      console.error("Withdrawal error:", error);
      sonnerToast.error("Failed to withdraw tokens");
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-white mb-4">Withdraw SBET Tokens</h3>
      <p className="text-sm text-gray-300 mb-6">
        Connect your Solana wallet to withdraw SBET tokens. Daily limit: 10,000 SBET.
      </p>
      
      <div className="mb-6">
        <ConnectWallet />
      </div>
      
      {connected ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount to Withdraw</label>
            <Input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max={profile?.token_balance?.toString() || "0"}
              className="bg-sportbet-dark border-sportbet-light-gray text-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Available: {profile?.token_balance || 0} SBET
            </p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Destination Address</label>
            <Input
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder="Enter Solana wallet address"
              className="bg-sportbet-dark border-sportbet-light-gray text-white"
            />
          </div>
          
          <Button 
            onClick={handleWithdraw}
            className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 text-white"
            disabled={
              !connected || 
              !withdrawAmount || 
              isNaN(parseFloat(withdrawAmount)) || 
              parseFloat(withdrawAmount) <= 0 ||
              parseFloat(withdrawAmount) > (profile?.token_balance || 0) ||
              !destinationAddress ||
              withdrawLoading
            }
          >
            {withdrawLoading ? "Processing..." : `Withdraw ${withdrawAmount || '0'} SBET`}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Withdrawals are processed on the {SOLANA_NETWORKS[network].name} network.
          </p>
        </div>
      ) : (
        <div className="p-4 bg-sportbet-dark rounded-lg border border-sportbet-light-gray mb-3">
          <div className="flex flex-col items-center text-center py-4 space-y-2">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
            <p className="text-sm text-gray-400">
              Connect your wallet to withdraw tokens
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawTab;
