const axios = require('axios');

async function createInvoice(userId, depositId, amount, currency) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const url = 'https://api.nowpayments.io/v1/invoice';

  const payload = {
    price_amount: amount,
    price_currency: currency,
    order_id: `${userId}:${depositId}`,
    metadata: {
      user_id: userId,
      deposit_id: depositId,
      mode: 'live'
    },
    success_url: 'https://yourdomain.com/success'
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'x-api-key': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

module.exports = { createInvoice };
