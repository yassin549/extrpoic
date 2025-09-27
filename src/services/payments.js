const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const db = require('../db');

const paymentsRouter = express.Router();

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

// --- Invoice Creation ---
paymentsRouter.post('/invoice', async (req, res) => {
  const { amount, currency, userId } = req.body;
  if (!amount || !currency || !userId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const depositResult = await db.query(
      'INSERT INTO deposits (user_id, pay_amount, pay_currency) VALUES ($1, $2, $3) RETURNING id',
      [userId, amount, currency]
    );
    const internalDepositId = depositResult.rows[0].id;

    const response = await axios.post(`${NOWPAYMENTS_API_URL}/invoice`, {
      price_amount: amount,
      price_currency: currency,
      order_id: internalDepositId.toString(),
      ipn_callback_url: `${process.env.BASE_URL}/api/payments/ipn`,
    }, {
      headers: { 'x-api-key': NOWPAYMENTS_API_KEY }
    });

    await db.query('UPDATE deposits SET nowpayments_invoice_id = $1 WHERE id = $2', [response.data.id, internalDepositId]);

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Failed to create NOWPayments invoice:', error.response?.data);
    res.status(500).send('Failed to create invoice');
  }
});

// --- IPN Handler ---
const verifyIPN = (signature, rawBody) => {
  // ... (verification logic remains the same)
};

paymentsRouter.post('/ipn', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-nowpayments-sig'];
  const rawBody = req.body.toString();
  const ipnData = JSON.parse(rawBody);
  const isVerified = verifyIPN(signature, rawBody);

  await db.query('INSERT INTO ipn_logs (invoice_id, raw_ipn, verification_result) VALUES ($1, $2, $3)', 
    [ipnData.invoice_id, ipnData, isVerified ? 'verified' : 'failed']
  );

  if (!isVerified) {
    return res.status(401).send('Invalid signature.');
  }

  const { order_id, payment_status, payout_amount, payout_currency } = ipnData;
  const internalDepositId = parseInt(order_id, 10);

  if (payment_status === 'finished') {
    try {
      await db.query('BEGIN');
      const depositUpdate = await db.query(
        'UPDATE deposits SET payment_status = $1, payout_amount = $2, payout_currency = $3, updated_at = NOW() WHERE id = $4 AND payment_status != $1 RETURNING user_id',
        [payment_status, payout_amount, payout_currency, internalDepositId]
      );

      if (depositUpdate.rowCount > 0) {
        const { user_id } = depositUpdate.rows[0];
        const amountTnd = payout_amount; // Placeholder for conversion
        await db.query('UPDATE users SET balance_tnd = balance_tnd + $1 WHERE id = $2', [amountTnd, user_id]);
      }
      await db.query('COMMIT');
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error processing finished payment:', error);
      return res.sendStatus(500);
    }
  }

  res.status(200).send('IPN received.');
});

module.exports = paymentsRouter;
