const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// This is a simplified ledger. In a production system, you'd use a dedicated library
// or more robust transaction management.
class Ledger {
  static async record(userId, type, amount, currency, externalId = null, metadata = {}) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Get the current balance (a more complex system would have a separate balances table)
      const lastTx = await client.query(
        'SELECT balance_after FROM transactions WHERE user_id = $1 AND currency = $2 ORDER BY created_at DESC LIMIT 1',
        [userId, currency]
      );
      const balance_before = lastTx.rows[0] ? parseFloat(lastTx.rows[0].balance_after) : 0;
      const balance_after = balance_before + parseFloat(amount);

      if (balance_after < 0) {
        throw new Error('Insufficient funds.');
      }

      const result = await client.query(
        `INSERT INTO transactions 
         (user_id, type, amount, currency, balance_before, balance_after, external_id, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [userId, type, amount, currency, balance_before, balance_after, externalId, metadata]
      );
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Ledger transaction failed:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async getBalance(userId, currency) {
    const result = await pool.query(
      'SELECT balance_after FROM transactions WHERE user_id = $1 AND currency = $2 ORDER BY created_at DESC LIMIT 1',
      [userId, currency]
    );
    return result.rows[0] ? parseFloat(result.rows[0].balance_after) : 0;
  }
}

module.exports = Ledger;
