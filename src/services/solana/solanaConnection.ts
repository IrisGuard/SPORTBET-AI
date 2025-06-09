
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { DEFAULT_NETWORK, SOLANA_NETWORKS } from '@/config/solana';

// Singleton connection instance
let connection: Connection | null = null;

/**
 * Initialize or get existing Solana connection
 */
export function getConnection(network = DEFAULT_NETWORK): Connection {
  if (!connection) {
    connection = new Connection(SOLANA_NETWORKS[network].endpoint, 'confirmed');
  }
  return connection;
}

/**
 * Get SOL balance for a wallet
 */
export async function getSolBalance(publicKey: PublicKey): Promise<number> {
  try {
    const conn = getConnection();
    const balance = await conn.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
}

/**
 * Add helper function to convert string to PublicKey
 */
export function stringToPublicKey(address: string): PublicKey {
  try {
    return new PublicKey(address);
  } catch (error) {
    throw new Error(`Invalid public key: ${address}`);
  }
}

/**
 * Get transaction history for a token account
 */
export async function getTransactionHistory(publicKey: PublicKey, network = DEFAULT_NETWORK, limit = 10) {
  if (!publicKey) return [];
  
  try {
    const conn = getConnection(network);
    const signatures = await conn.getSignaturesForAddress(publicKey, { limit });
    
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await conn.getTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0,
        });
        
        return {
          signature: sig.signature,
          timestamp: sig.blockTime ? new Date(sig.blockTime * 1000) : new Date(),
          successful: tx?.meta?.err === null,
          ...sig,
        };
      })
    );
    
    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}
