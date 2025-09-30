const WebSocket = require('ws');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const db = require('../db');

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
  setTimeout(freezeRound, 10000); // 10 seconds for betting
}

async function freezeRound() {
  const clientSeed = 'default-client-seed'; // In a real app, this would be collected from players
  const crashMultiplier = calculateCrashMultiplier(currentRound.serverSeed, clientSeed, 1);
  await db.query('UPDATE game_rounds SET status = $1, crash_multiplier = $2, client_seed = $3 WHERE id = $4', ['running', crashMultiplier, clientSeed, currentRound.id]);
  currentRound = { ...currentRound, status: 'running', crashMultiplier };
  runRound();
}

async function runRound() {
  let currentMultiplier = 1.00;
  const tick = () => {
    if (currentMultiplier >= currentRound.crashMultiplier) {
      endRound();
      return;
    }
    currentMultiplier = parseFloat((currentMultiplier * 1.005).toFixed(2));
    broadcast({ event: 'round.tick', data: { multiplier: currentMultiplier } });
    setTimeout(tick, 100);
  };
  tick();
}

async function endRound() {
  await db.query('UPDATE game_rounds SET status = $1 WHERE id = $2', ['crashed', currentRound.id]);
  currentRound.status = 'crashed';
  broadcast({ event: 'round.crash', data: { crashMultiplier: currentRound.crashMultiplier, serverSeed: currentRound.serverSeed } });
  setTimeout(startNewRound, 5000); // 5 seconds until next round
}

// --- WebSocket Message Handling ---
async function handlePlaceBet(ws, data) {
  if (currentRound.status !== 'open') {
    return ws.send(JSON.stringify({ event: 'error', message: 'Betting is closed.' }));
  }
  const { amount } = data;
  if (typeof amount !== 'number' || amount <= 0) {
    return ws.send(JSON.stringify({ event: 'error', message: 'Invalid bet amount.' }));
  }

  try {
    await db.query('BEGIN');
    const balanceResult = await db.query('SELECT balance_tnd FROM users WHERE id = $1', [ws.userId]);
    if (balanceResult.rows[0].balance_tnd < amount) {
      await db.query('ROLLBACK');
      return ws.send(JSON.stringify({ event: 'error', message: 'Insufficient balance.' }));
    }

    await db.query('UPDATE users SET balance_tnd = balance_tnd - $1 WHERE id = $2', [amount, ws.userId]);
    await db.query('INSERT INTO bets (user_id, round_id, amount_tnd) VALUES ($1, $2, $3)', [ws.userId, currentRound.id, amount]);
    await db.query('COMMIT');

    ws.send(JSON.stringify({ event: 'bet.placed', data: { amount } }));
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error placing bet:', error);
    ws.send(JSON.stringify({ event: 'error', message: 'An error occurred while placing your bet.' }));
  }
}

// --- WebSocket Server Setup ---
function attachWebSocketServer(server) {
  server.on('upgrade', (request, socket, head) => {
    // Authenticate the user via their cookie
    const cookies = cookie.parse(request.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        ws.userId = decoded.userId; // Attach userId to the WebSocket connection
        wss.emit('connection', ws, request);
      });
    });
  });

  wss.on('connection', (ws) => {
    console.log(`Client connected: user ${ws.userId}`);
    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'place.bet') {
          handlePlaceBet(ws, parsedMessage.data);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log(`Client disconnected: user ${ws.userId}`);
    });
  });
}

// Start the first round
startNewRound();

// We no longer need a separate gameRouter for REST
module.exports = { attachWebSocketServer };

