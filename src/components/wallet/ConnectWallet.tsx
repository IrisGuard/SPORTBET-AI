import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSolanaWallet } from '@/context/SolanaWalletContext';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ArrowUpRight, Copy, ExternalLink, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SOLANA_NETWORKS } from '@/config/solana';

export function ConnectWallet() {
  const { connected, walletAddress, connect, disconnect, network } = useSolanaWallet();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      });
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const openExplorer = () => {
    if (walletAddress) {
      const url = `${SOLANA_NETWORKS[network].explorerUrl}/address/${walletAddress}`;
      window.open(url, '_blank');
    }
  };

  // Check if Phantom is installed
  const isPhantomInstalled = window.phantom?.solana !== undefined;

  if (!isPhantomInstalled) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white"
            variant="default"
          >
            Connect Wallet
            <ArrowUpRight size={16} className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Not Found</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <p className="text-center mb-6">
              No compatible wallet detected. Please install a Solana wallet to continue.
            </p>
            <Button 
              onClick={() => window.open('https://phantom.app/', '_blank')} 
              className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white"
            >
              Install Phantom Wallet
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (connected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
          >
            {formatAddress(walletAddress)}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connected Wallet</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="bg-sportbet-dark rounded-lg p-4 w-full mb-6">
              <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
              <div className="flex items-center justify-between bg-sportbet-gray p-2 rounded">
                <div className="text-white font-mono text-sm truncate max-w-[200px]">
                  {walletAddress}
                </div>
                <div className="flex">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={openExplorer}
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Button 
                variant="outline" 
                onClick={openExplorer}
                className="border-sportbet-light-gray text-sportbet-text"
              >
                View on Explorer
                <ExternalLink size={16} className="ml-2" />
              </Button>
              <Button 
                onClick={disconnect}
                variant="destructive"
              >
                Disconnect Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button 
      onClick={connect} 
      className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white"
    >
      Connect Wallet
      <ArrowUpRight size={16} className="ml-2" />
    </Button>
  );
}
