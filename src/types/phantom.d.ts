
interface PhantomProvider {
  isPhantom?: boolean;
  publicKey?: import('@solana/web3.js').PublicKey;
  isConnected?: boolean;
  signTransaction: (transaction: import('@solana/web3.js').Transaction) => Promise<import('@solana/web3.js').Transaction>;
  signAllTransactions: (transactions: import('@solana/web3.js').Transaction[]) => Promise<import('@solana/web3.js').Transaction[]>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  connect: () => Promise<{ publicKey: import('@solana/web3.js').PublicKey }>;
  disconnect: () => Promise<void>;
}

interface Window {
  phantom?: {
    solana?: PhantomProvider;
  };
  Buffer: typeof Buffer;
}
