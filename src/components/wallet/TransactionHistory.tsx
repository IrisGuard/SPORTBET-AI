import { useEffect, useState } from 'react';
import { ExternalLink, History, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useSolanaWallet } from '@/context/SolanaWalletContext';
import { getTransactionHistory } from '@/services/solana';
import { getExplorerUrl } from '@/config/solana';

interface Transaction {
  signature: string;
  timestamp: Date;
  successful: boolean;
  blockTime?: number;
  err?: any;
}

const TransactionHistory = () => {
  const { connected, publicKey, network } = useSolanaWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
  
  const fetchTransactions = async () => {
    if (!publicKey) return;
    
    setLoadingTransactions(true);
    try {
      const txs = await getTransactionHistory(publicKey, network);
      setTransactions(txs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };
  
  useEffect(() => {
    if (connected && publicKey) {
      fetchTransactions();
    }
  }, [connected, publicKey, network]);

  return (
    <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
      <div className="p-6 border-b border-sportbet-light-gray flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History size={18} className="text-sportbet-blue" />
          <h3 className="text-lg font-medium text-white">Transaction History</h3>
        </div>
        
        {connected && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={fetchTransactions}
            disabled={loadingTransactions}
            className="text-sportbet-blue"
          >
            <RefreshCw size={16} className={`mr-2 ${loadingTransactions ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
      
      <div className="p-6">
        {connected ? (
          loadingTransactions ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-sportbet-light-gray/20 rounded-lg">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48 bg-sportbet-dark" />
                    <Skeleton className="h-3 w-32 bg-sportbet-dark" />
                  </div>
                  <Skeleton className="h-8 w-20 bg-sportbet-dark" />
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div 
                  key={tx.signature}
                  className="flex items-center justify-between p-4 border border-sportbet-light-gray/20 rounded-lg"
                >
                  <div>
                    <div className="flex items-center">
                      <span className="text-xs font-mono text-gray-400">
                        {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                      </span>
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => {
                          window.open(getExplorerUrl(network, 'tx', tx.signature), '_blank');
                        }}
                      >
                        <ExternalLink size={12} />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {tx.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className={`text-sm ${tx.successful ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.successful ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-sportbet-dark rounded-full flex items-center justify-center mb-4">
                <History size={24} className="text-gray-500" />
              </div>
              <p className="text-lg font-medium text-white mb-2">No transactions yet</p>
              <p className="text-sm text-gray-400 text-center mb-4">
                Your transaction history will appear here once you start using SBET tokens.
              </p>
            </div>
          )
        ) : (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-sportbet-dark rounded-full flex items-center justify-center mb-4">
              <History size={24} className="text-gray-500" />
            </div>
            <p className="text-lg font-medium text-white mb-2">Connect wallet to view transactions</p>
            <p className="text-sm text-gray-400 text-center mb-4">
              Connect your Solana wallet to view your transaction history.
            </p>
            <ConnectWallet />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
