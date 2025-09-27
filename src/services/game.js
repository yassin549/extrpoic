const express = require('express');
const WebSocket = require('ws');
const crypto = require('crypto');
const db = require('../db');

const gameRouter = express.Router();
const wss = new WebSocket.Server({ noServer: true });

// --- Provably Fair Utilities ---
function generateServerSeed() { return crypto.randomBytes(32).toString('hex'); }
function sha256(seed) { return crypto.createHash('sha256').update(seed).digest('hex'); }
function calculateCrashMultiplier(serverSeed, clientSeed, nonce) {
  const hmac = crypto.createHmac('sha256', serverSeed);
  hmac.update(`${clientSeed}-${nonce}`);
  const hash = hmac.digest('hex');
  const subHash = hash.substring(0, 8);
  const intVal = parseInt(subHash, 16);
  const multiplier = Math.max(1, (Math.pow(2, 32) / (intVal + 1)) * 0.99);
  return Math.floor(multiplier * 100) / 100;
}

// --- Game State ---
let currentRound = {};

// --- WebSocket Broadcasting ---
function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// --- Game Lifecycle ---
async function startNewRound() {
  const serverSeed = generateServerSeed();
  const serverSeedHash = sha256(serverSeed);
  const roundResult = await db.query('INSERT INTO game_rounds (server_seed, server_seed_hash, status) VALUES ($1, $2, $3) RETURNING id', [serverSeed, serverSeedHash, 'open']);
  currentRound = { id: roundResult.rows[0].id, serverSeed, serverSeedHash, status: 'open' };
  broadcast({ event: 'round.open', data: { roundId: currentRound.id, serverSeedHash } });
  setTimeout(freezeRound, 5000);
}

async function freezeRound() {
  const clientSeed = 'default-client-seed';
  const crashMultiplier = calculateCrashMultiplier(currentRound.serverSeed, clientSeed, 1);
  await db.query('UPDATE game_rounds SET status = $1, crash_multiplier = $2, client_seed = $3 WHERE id = $4', ['freeze', crashMultiplier, clientSeed, currentRound.id]);
  currentRound = { ...currentRound, status: 'freeze', crashMultiplier };
  setTimeout(runRound, 1000);
}

async function runRound() {
  await db.query('UPDATE game_rounds SET status = $1 WHERE id = $2', ['running', currentRound.id]);
  currentRound.status = 'running';
  let currentMultiplier = 1.00;
  const tick = () => {
    if (currentMultiplier >= currentRound.crashMultiplier) {
      endRound();
      return;
    }
    currentMultiplier += 0.01;
    broadcast({ event: 'round.tick', data: { multiplier: parseFloat(currentMultiplier.toFixed(2)) } });
    setTimeout(tick, 100);
  };
  tick();
}

async function endRound() {
  await db.query('UPDATE game_rounds SET status = $1 WHERE id = $2', ['crashed', currentRound.id]);
  currentRound.status = 'crashed';
  broadcast({ event: 'round.crash', data: { crashMultiplier: currentRound.crashMultiplier } });
  setTimeout(startNewRound, 4000);
}

// --- REST API Endpoints ---
gameRouter.post('/bet', async (req, res) => {
  const { userId, amount } = req.body;
  if (currentRound.status !== 'open') return res.status(400).send('Betting is closed.');
  try {
    await db.query('BEGIN');
    await db.query('UPDATE users SET balance_tnd = balance_tnd - $1 WHERE id = $2', [amount, userId]);
    const betResult = await db.query('INSERT INTO bets (user_id, round_id, amount_tnd) VALUES ($1, $2, $3) RETURNING id', [userId, currentRound.id, amount]);
    await db.query('COMMIT');
    res.status(201).json({ betId: betResult.rows[0].id, status: 'placed' });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).send('Error placing bet.');
  }
});

gameRouter.post('/cashout', async (req, res) => {
  const { userId, betId, amount, currentMultiplier } = req.body;
  if (currentRound.status !== 'running') return res.status(400).send('Cannot cash out now.');
  const payout = amount * currentMultiplier;
  try {
    await db.query('BEGIN');
    const betUpdate = await db.query('UPDATE bets SET status = $1, cashout_multiplier = $2, payout_tnd = $3 WHERE id = $4 AND user_id = $5 AND status = \'placed\' RETURNING id', ['cashed_out', currentMultiplier, payout, betId, userId]);
    if (betUpdate.rowCount === 0) return res.status(400).send('Bet already settled or does not exist.');
    await db.query('UPDATE users SET balance_tnd = balance_tnd + $1 WHERE id = $2', [payout, userId]);
    await db.query('COMMIT');
    res.json({ success: true, payout });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).send('Error cashing out.');
  }
});

// --- WebSocket Server Attachment ---
function attachWebSocketServer(server) {
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
}

// Start the first round
startNewRound();

module.exports = { gameRouter, attachWebSocketServer };
