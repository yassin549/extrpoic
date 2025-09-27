const WebSocket = require('ws');
const crypto = require('crypto');

const wss = new WebSocket.Server({ port: 8080 });

// Utility to generate server seed and hash
function generateServerSeed() {
  const serverSeed = crypto.randomBytes(32).toString('hex');
  const serverSeedHash = crypto.createHash('sha256').update(serverSeed).digest('hex');
  return { serverSeed, serverSeedHash };
}

// Mock game state
let gameState = {
  roundId: 1,
  serverSeed: '',
  serverSeedHash: '',
  status: 'open',
  timeToFreeze: 10, // seconds until bets freeze
};

// Initialize game state
function initGame() {
  const { serverSeed, serverSeedHash } = generateServerSeed();
  gameState.serverSeed = serverSeed;
  gameState.serverSeedHash = serverSeedHash;
  gameState.status = 'open';
  gameState.roundId += 1;
  console.log(`New round started: ${gameState.roundId}`);
}

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send initial game state
  ws.send(JSON.stringify({
    event: 'round.open',
    data: {
      roundId: gameState.roundId,
      serverSeedHash: gameState.serverSeedHash,
      timeToFreeze: gameState.timeToFreeze,
      status: gameState.status,
    },
  }));

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Handle different game events here
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start a new game round every 30 seconds
setInterval(initGame, 30000);

console.log('WebSocket server running on ws://localhost:8080');
