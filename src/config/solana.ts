
/**
 * Solana network configuration
 */

export type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet';

interface NetworkConfig {
  name: string;
  endpoint: string;
  explorerUrl: string;
}

export const SOLANA_NETWORKS: Record<SolanaNetwork, NetworkConfig> = {
  'mainnet-beta': {
    name: 'Mainnet Beta',
    endpoint: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com',
  },
  'testnet': {
    name: 'Testnet',
    endpoint: 'https://api.testnet.solana.com',
    explorerUrl: 'https://explorer.solana.com/?cluster=testnet',
  },
  'devnet': {
    name: 'Devnet',
    endpoint: 'https://api.devnet.solana.com',
    explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
  }
};

// Default network for development
export const DEFAULT_NETWORK: SolanaNetwork = 'devnet';

// SBET Token configuration
export const SBET_TOKEN = {
  devnet: {
    mint: 'SBETdev2Z5yCMvmW2zEBH8SxN3m3zXKZ9v9BziXpYCg', // This is a placeholder - replace with actual devnet token mint address
    decimals: 9,
  },
  mainnet: {
    mint: 'SBET1111111111111111111111111111111111111111', // This is a placeholder - replace with actual mainnet token mint address
    decimals: 9,
  }
};

// Program IDs
export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
export const ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
export const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';

// Explorer URL helper
export function getExplorerUrl(network: SolanaNetwork, type: 'tx' | 'address', signature: string): string {
  const baseUrl = SOLANA_NETWORKS[network].explorerUrl;
  return `${baseUrl}/${type}/${signature}`;
}
