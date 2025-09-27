const crypto = require('crypto');

// We need to extract the function to test it. In a real app, you might export it.
function calculateCrashMultiplier(serverSeed, clientSeed, nonce) {
  const hmac = crypto.createHmac('sha256', serverSeed);
  hmac.update(`${clientSeed}-${nonce}`);
  const hash = hmac.digest('hex');
  const subHash = hash.substring(0, 8);
  const intVal = parseInt(subHash, 16);
  const multiplier = Math.max(1, (Math.pow(2, 32) / (intVal + 1)) * 0.99);
  return Math.floor(multiplier * 100) / 100;
}

describe('Game Engine Determinism', () => {
  it('should produce the same crash multiplier for the same seeds and nonce', () => {
    const serverSeed = 'test-server-seed-123';
    const clientSeed = 'test-client-seed-456';
    const nonce = 1;

    const multiplier1 = calculateCrashMultiplier(serverSeed, clientSeed, nonce);
    const multiplier2 = calculateCrashMultiplier(serverSeed, clientSeed, nonce);

    expect(multiplier1).toBe(multiplier2);
    expect(multiplier1).toBeGreaterThanOrEqual(1.00);
  });

  it('should produce a different multiplier for a different server seed', () => {
    const serverSeed1 = 'server-seed-v1';
    const serverSeed2 = 'server-seed-v2';
    const clientSeed = 'client-seed';
    const nonce = 1;

    const multiplier1 = calculateCrashMultiplier(serverSeed1, clientSeed, nonce);
    const multiplier2 = calculateCrashMultiplier(serverSeed2, clientSeed, nonce);

    expect(multiplier1).not.toBe(multiplier2);
  });
});
