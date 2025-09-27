/// <reference types="node" />
import crypto from 'crypto';

// This function must be a client-side reimplementation of the backend's logic
// to allow users to verify the fairness of any game round.
export function verifyRound(serverSeed: string, clientSeed: string, nonce: number): number {
  const hmac = crypto.createHmac('sha256', serverSeed);
  hmac.update(`${clientSeed}-${nonce}`);
  const hash = hmac.digest('hex');

  const subHash = hash.substring(0, 8);
  const intVal = parseInt(subHash, 16);

  const multiplier = Math.max(1, (Math.pow(2, 32) / (intVal + 1)) * 0.99);

  return Math.floor(multiplier * 100) / 100;
}
