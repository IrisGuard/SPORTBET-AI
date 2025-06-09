
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { WalletAdapter } from '@/services/solana/types';
import { PublicKey } from '@solana/web3.js';
import { toast } from 'sonner';
import { DEFAULT_NETWORK, SolanaNetwork, SOLANA_NETWORKS } from '@/config/solana';

interface SolanaWalletContextType {
  wallet: WalletAdapter | null;
  connecting: boolean;
  connected: boolean;
  publicKey: PublicKey | null;
  walletAddress: string;
  balance: {
    sol: number;
    sbet: number;
  };
  network: SolanaNetwork;
  setNetwork: (network: SolanaNetwork) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const SolanaWalletContext = createContext<SolanaWalletContextType | undefined>(undefined);

export const useSolanaWallet = () => {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error('useSolanaWallet must be used within a SolanaWalletProvider');
  }
  return context;
};

interface SolanaWalletProviderProps {
  children: ReactNode;
}

export const SolanaWalletProvider = ({ children }: SolanaWalletProviderProps) => {
  const [wallet, setWallet] = useState<WalletAdapter | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [network, setNetwork] = useState<SolanaNetwork>(DEFAULT_NETWORK);
  const [balance, setBalance] = useState({ sol: 0, sbet: 0 });

  // Initialize wallet when available in window
  useEffect(() => {
    const checkForPhantom = async () => {
      try {
        // Check if Phantom wallet is available
        if (window.phantom?.solana) {
          const phantom = window.phantom.solana;
          
          setWallet({
            publicKey: phantom.publicKey || null,
            signTransaction: phantom.signTransaction.bind(phantom),
            signAllTransactions: phantom.signAllTransactions.bind(phantom),
            connect: async () => {
              try {
                setConnecting(true);
                await phantom.connect();
                setPublicKey(phantom.publicKey || null);
                setConnected(true);
                
                // Refresh balance after connecting
                await refreshBalance();
                
                toast.success("Wallet connected");
              } catch (error) {
                console.error("Connection error:", error);
                toast.error("Failed to connect wallet");
              } finally {
                setConnecting(false);
              }
            },
            disconnect: async () => {
              try {
                await phantom.disconnect();
                setPublicKey(null);
                setConnected(false);
                setBalance({ sol: 0, sbet: 0 });
                toast.success("Wallet disconnected");
              } catch (error) {
                console.error("Disconnect error:", error);
                toast.error("Failed to disconnect wallet");
              }
            },
            connecting: false,
            connected: phantom.isConnected || false,
          });
          
          // Set initial connected state
          setConnected(phantom.isConnected || false);
          if (phantom.isConnected && phantom.publicKey) {
            setPublicKey(phantom.publicKey);
          }
        }
      } catch (error) {
        console.error("Wallet initialization error:", error);
      }
    };
    
    checkForPhantom();
    
    // Listen for account changes
    const handleAccountChange = () => {
      window.location.reload();
    };
    
    window.addEventListener('wallet-change', handleAccountChange);
    
    return () => {
      window.removeEventListener('wallet-change', handleAccountChange);
    };
  }, []);

  const refreshBalance = async () => {
    if (!publicKey) return;
    
    try {
      // These would be your actual SOL and SBET token balance fetching functions
      // For now this is a placeholder
      const sol = 0; // Replace with actual SOL balance fetch
      const sbet = 0; // Replace with actual SBET token balance fetch
      
      setBalance({ sol, sbet });
    } catch (error) {
      console.error("Error refreshing balances:", error);
    }
  };

  const connect = async () => {
    if (!wallet) {
      toast.error("No wallet adapter found. Please install Phantom wallet.");
      return;
    }
    
    if (!connected) {
      await wallet.connect();
    }
  };

  const disconnect = async () => {
    if (wallet && connected) {
      await wallet.disconnect();
    }
  };

  const value = {
    wallet,
    connecting,
    connected,
    publicKey,
    walletAddress: publicKey?.toString() || '',
    balance,
    network,
    setNetwork,
    connect,
    disconnect,
    refreshBalance,
  };

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
};
