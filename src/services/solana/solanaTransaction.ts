
import { PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, DEFAULT_NETWORK, SBET_TOKEN } from '@/config/solana';
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { getConnection } from './solanaConnection';
import { WalletAdapter } from './types';
import { toast } from 'sonner';

/**
 * Withdraw tokens to external wallet
 */
export async function withdrawTokens(
  wallet: WalletAdapter,
  destinationAddress: string,
  amount: number,
  network = DEFAULT_NETWORK
): Promise<string | null> {
  if (!wallet.publicKey) return null;
  
  try {
    const conn = getConnection(network);
    const mintAddress = new PublicKey(
      network === 'mainnet-beta' ? SBET_TOKEN.mainnet.mint : SBET_TOKEN.devnet.mint
    );
    const decimals = network === 'mainnet-beta' ? SBET_TOKEN.mainnet.decimals : SBET_TOKEN.devnet.decimals;
    
    // Get source token account
    const sourceTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      wallet.publicKey,
      false,
      new PublicKey(TOKEN_PROGRAM_ID),
      new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    );
    
    // Get destination token account
    const destinationPubkey = new PublicKey(destinationAddress);
    const destinationTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      destinationPubkey,
      false,
      new PublicKey(TOKEN_PROGRAM_ID),
      new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    );
    
    // Create the token account if it doesn't exist
    const destinationAccountInfo = await conn.getAccountInfo(destinationTokenAccount);
    let transaction = new Transaction();
    
    if (!destinationAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          destinationTokenAccount, // associated token account address
          destinationPubkey, // owner
          mintAddress, // token mint
          new PublicKey(TOKEN_PROGRAM_ID),
          new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
        )
      );
    }
    
    // Add transfer instruction
    const amountInSmallestUnit = Math.floor(amount * 10 ** decimals);
    transaction.add(
      createTransferInstruction(
        sourceTokenAccount,
        destinationTokenAccount,
        wallet.publicKey,
        amountInSmallestUnit,
        [],
        new PublicKey(TOKEN_PROGRAM_ID)
      )
    );
    
    transaction.feePayer = wallet.publicKey;
    const blockhash = await conn.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;
    
    const signed = await wallet.signTransaction(transaction);
    const signature = await conn.sendRawTransaction(signed.serialize());
    await conn.confirmTransaction(signature);
    
    toast.success(`Withdrawn ${amount} SBET tokens`);
    return signature;
  } catch (error) {
    console.error('Error withdrawing tokens:', error);
    toast.error("Failed to withdraw tokens");
    return null;
  }
}
