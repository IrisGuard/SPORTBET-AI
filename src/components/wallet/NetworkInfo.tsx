
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Wallet, RefreshCw } from 'lucide-react';
import { useSolanaWallet } from '@/context/SolanaWalletContext';
import { Button } from '@/components/ui/button';
import { validateApiEndpoints } from '@/context/apiKeys/endpointUtils';

const NetworkInfo = () => {
  const { network } = useSolanaWallet();
  const [apiStatus, setApiStatus] = useState({
    helius: {
      mainnet: true,
      transactions: true,
      websocket: true
    }
  });
  const [isChecking, setIsChecking] = useState(false);

  // Έλεγχος της κατάστασης των API endpoints κατά τη φόρτωση
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    setIsChecking(true);
    try {
      const status = await validateApiEndpoints();
      setApiStatus(status);
    } catch (error) {
      console.error('Error checking API status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="bg-sportbet-gray border border-sportbet-light-gray">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white">Network Status</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={checkApiStatus} 
            disabled={isChecking}
            className="h-7 w-7 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Solana Network</span>
            </div>
            <Badge variant={network === 'mainnet-beta' ? 'default' : 'outline'} className="capitalize">
              {network || 'Not Connected'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowUpDown className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Helius RPC</span>
            </div>
            <Badge variant={apiStatus.helius.mainnet ? 'success' : 'destructive'}>
              {apiStatus.helius.mainnet ? 'Online' : 'Offline'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowUpDown className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Helius API</span>
            </div>
            <Badge variant={apiStatus.helius.transactions ? 'success' : 'destructive'}>
              {apiStatus.helius.transactions ? 'Online' : 'Offline'}
            </Badge>
          </div>
          
          <div className="py-1 px-3 bg-sportbet-dark rounded text-xs text-gray-400 mt-4">
            Last checked: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkInfo;
