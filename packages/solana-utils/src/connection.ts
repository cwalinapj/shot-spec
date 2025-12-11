import { Connection, Commitment } from '@solana/web3.js';

/**
 * Creates and returns a Solana Connection instance.
 * @param endpoint - Optional RPC endpoint URL. Defaults to SOLANA_RPC_URL env variable.
 * @param commitment - Optional commitment level for transactions. Defaults to 'confirmed'.
 * @returns A Connection instance configured with the specified endpoint and commitment.
 */
export function getConnection(
  endpoint?: string,
  commitment?: Commitment,
): Connection {
  const rpcUrl =
    endpoint || process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
  const commitmentLevel =
    commitment || (process.env.SOLANA_COMMITMENT as Commitment) || 'confirmed';

  return new Connection(rpcUrl, commitmentLevel);
}
