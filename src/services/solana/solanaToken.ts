
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, DEFAULT_NETWORK, SBET_TOKEN } from '@/config/solana';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { getConnection } from './solanaConnection';
import { WalletAdapter } from './types';
import { Transaction } from '@solana/web3.js';
import { createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { toast } from 'sonner';

/**
 * Get SBET token balance for a wallet
 */
export async function getTokenBalance(publicKey: PublicKey, network = DEFAULT_NETWORK): Promise<number> {
  try {
    const conn = getConnection(network);
    const mintAddress = new PublicKey(
      network === 'mainnet-beta' ? SBET_TOKEN.mainnet.mint : SBET_TOKEN.devnet.mint
    );
    
    const tokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      publicKey,
      false,
      new PublicKey(TOKEN_PROGRAM_ID),
      new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    );

    try {
      const balance = await conn.getTokenAccountBalance(tokenAccount);
      return Number(balance.value.uiAmount);
    } catch (error) {
      // Token account might not exist yet
      return 0;
    }
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}

/**
 * Ensure user has an Associated Token Account for SBET
 */
export async function createTokenAccountIfNeeded(
  wallet: WalletAdapter,
  network = DEFAULT_NETWORK
): Promise<boolean> {
  if (!wallet.publicKey) return false;
  
  try {
    const conn = getConnection(network);
    const mintAddress = new PublicKey(
      network === 'mainnet-beta' ? SBET_TOKEN.mainnet.mint : SBET_TOKEN.devnet.mint
    );
    
    const tokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      wallet.publicKey,
      false,
      new PublicKey(TOKEN_PROGRAM_ID),
      new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    );
    
    // Check if the token account exists
    const tokenAccountInfo = await conn.getAccountInfo(tokenAccount);
    
    if (!tokenAccountInfo) {
      // Create the token account
      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          tokenAccount, // associated token account address
          wallet.publicKey, // owner
          mintAddress, // token mint
          new PublicKey(TOKEN_PROGRAM_ID),
          new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
        )
      );
      
      transaction.feePayer = wallet.publicKey;
      const blockhash = await conn.getLatestBlockhash();
      transaction.recentBlockhash = blockhash.blockhash;
      
      const signed = await wallet.signTransaction(transaction);
      const txid = await conn.sendRawTransaction(signed.serialize());
      await conn.confirmTransaction(txid);
      
      toast.success("Created SBET token account");
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error creating token account:', error);
    toast.error("Failed to create token account");
    return false;
  }
}
