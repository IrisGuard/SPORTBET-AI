
import { Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSolanaWallet } from '@/context/SolanaWalletContext';
import { SOLANA_NETWORKS } from '@/config/solana';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SBETIcon from '@/components/icons/SBETIcon';

interface WalletBalanceProps {
  profile: any;
  loading: boolean;
}

const WalletBalance = ({ profile, loading }: WalletBalanceProps) => {
  const { network } = useSolanaWallet();
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!profile?.username) return 'U';
    return profile.username.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="p-6 border-b border-sportbet-light-gray">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {loading || !profile ? (
            <div className="w-10 h-10 bg-sportbet-blue rounded-full flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
          ) : (
            <Avatar className="w-10 h-10 border border-sportbet-light-gray/30">
              {profile.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username || 'User'} />
              ) : null}
              <AvatarFallback className="bg-sportbet-blue text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h2 className="text-xl font-semibold text-white">SBET Balance</h2>
            <p className="text-sm text-gray-400">Available tokens</p>
          </div>
        </div>
        <div className="text-right">
          {loading ? (
            <Skeleton className="h-8 w-28 bg-sportbet-dark" />
          ) : (
            <div>
              <p className="text-2xl font-bold text-white flex items-center justify-end">
                {profile?.token_balance || 0}
                <SBETIcon className="ml-2 text-sportbet-green" size={20} />
              </p>
              <p className="text-xs text-gray-400">
                Network: {SOLANA_NETWORKS[network].name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
