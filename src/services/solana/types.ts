
import { PublicKey, Transaction } from '@solana/web3.js';

/**
 * Wallet adapter interface for interaction with wallet providers
 */
export type WalletAdapter = {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  connecting: boolean;
  connected: boolean;
};
