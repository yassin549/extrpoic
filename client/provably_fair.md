# Provably Fair Verification

Our game uses a provably fair system to generate round outcomes. This means that the result of every round is determined by a combination of a public server seed and a private client seed, and can be independently verified by anyone.

## How It Works

1.  **Server Seed Hash:** Before a round begins, the server generates a secret `server_seed`. It then hashes this seed using SHA256 (`server_seed_hash = H(server_seed)`) and shows you this hash.

2.  **Client Seed:** Your browser provides a `client_seed`. You can change this at any time in your profile settings.

3.  **Round Outcome:** The outcome of the round (the crash multiplier) is determined by combining the `server_seed` and `client_seed`. We use an HMAC-SHA256 function to create a deterministic result from these inputs.

4.  **Verification:** After the round is over, we reveal the `server_seed`. You can then use the provided script to recalculate the outcome and verify that it matches the actual round result. If it matches, you can be certain the game was fair and not manipulated.

## Verification Script

You can use the following JavaScript snippet to verify a round's outcome. You will need the `server_seed`, `client_seed`, and the `round_id`.

```javascript
// Requires a crypto library, e.g., 'crypto-js'
// npm install crypto-js

const CryptoJS = require('crypto-js');

function getMultiplier(serverSeed, clientSeed, roundId) {
  const combinedSeed = `${serverSeed}:${clientSeed}:${roundId}`;
  
  // 1. Hash the combined seed
  const hash = CryptoJS.HmacSHA256(combinedSeed, serverSeed);
  const hashHex = hash.toString(CryptoJS.enc.Hex);

  // 2. Take the first 8 characters (4 bytes) of the hash
  const subHash = hashHex.substring(0, 8);
  const intValue = parseInt(subHash, 16);

  // 3. Calculate the multiplier
  // This formula ensures a distribution with more low multipliers and fewer high ones.
  const e = Math.pow(2, 32);
  const multiplier = Math.floor((100 * e - intValue) / (e - intValue)) / 100;

  return Math.max(1.00, multiplier);
}

// --- Example Verification ---
const serverSeed = 'REVEALED_SERVER_SEED_FROM_ROUND_HISTORY';
const clientSeed = 'YOUR_CLIENT_SEED_AT_TIME_OF_BET';
const roundId = 'ROUND_ID_FROM_HISTORY';

const calculatedMultiplier = getMultiplier(serverSeed, clientSeed, roundId);

console.log(`Calculated Multiplier: ${calculatedMultiplier.toFixed(2)}x`);
```
