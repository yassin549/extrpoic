const express = require('express');
const { Pool } = require('pg');

const adminRouter = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Middleware to check for admin privileges (to be implemented)
const isAdmin = (req, res, next) => {
  // For now, allow all. In production, you'd verify a JWT or session.
  next();
};

adminRouter.use(isAdmin);

// --- Deposits ---
adminRouter.get('/deposits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM deposits ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deposits.' });
  }
});

// --- Payouts ---
adminRouter.get('/payouts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payout_requests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payout requests.' });
  }
});

adminRouter.post('/payouts/:id/approve', async (req, res) => {
  const { id } = req.params;
  const { admin_txid } = req.body;
  // TODO: Add admin_id from session
  try {
    await pool.query(
      "UPDATE payout_requests SET status = 'settled', admin_txid = $1 WHERE id = $2",
      [admin_txid, id]
    );
    // TODO: Create the corresponding ledger entry for the withdrawal
    res.status(200).json({ message: 'Payout approved.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve payout.' });
  }
});

// --- IPN Logs (Assuming raw_ipn is stored in the deposits table) ---
adminRouter.get('/ipn-logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, invoice_id, raw_ipn, created_at FROM deposits WHERE raw_ipn IS NOT NULL ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch IPN logs.' });
  }
});

module.exports = adminRouter;
