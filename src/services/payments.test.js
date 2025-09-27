const crypto = require('crypto');

// We extract the function to test it. In a real app, you might export it.
function verifyIPN(signature, rawBody, ipnSecret) {
  if (!signature || !rawBody || !ipnSecret) {
    return false;
  }
  try {
    const sortedBody = JSON.stringify(JSON.parse(rawBody), Object.keys(JSON.parse(rawBody)).sort());
    const hmac = crypto.createHmac('sha512', ipnSecret);
    hmac.update(Buffer.from(sortedBody, 'utf-8'));
    const expectedSignature = hmac.digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (error) {
    return false;
  }
}

describe('NOWPayments IPN Verification', () => {
  const ipnSecret = 'test-ipn-secret';
  const payload = {
    payment_id: 12345,
    payment_status: 'finished',
    price_amount: 100,
    price_currency: 'USD',
    order_id: 'user1_deposit1',
  };

  it('should return true for a valid signature', () => {
    const rawBody = JSON.stringify(payload);
    const sortedBody = JSON.stringify(payload, Object.keys(payload).sort());
    const signature = crypto.createHmac('sha512', ipnSecret).update(sortedBody).digest('hex');

    expect(verifyIPN(signature, rawBody, ipnSecret)).toBe(true);
  });

  it('should return false for an invalid signature', () => {
    const rawBody = JSON.stringify(payload);
    const invalidSignature = 'invalid-signature-string';

    expect(verifyIPN(invalidSignature, rawBody, ipnSecret)).toBe(false);
  });

  it('should return false if the payload is tampered with', () => {
    const tamperedPayload = { ...payload, price_amount: 999 };
    const rawBody = JSON.stringify(tamperedPayload);
    const sortedOriginalBody = JSON.stringify(payload, Object.keys(payload).sort());
    const originalSignature = crypto.createHmac('sha512', ipnSecret).update(sortedOriginalBody).digest('hex');

    expect(verifyIPN(originalSignature, rawBody, ipnSecret)).toBe(false);
  });
});
