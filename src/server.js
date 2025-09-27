if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

// Import services
const authRouter = require('./services/auth');
const { gameRouter, attachWebSocketServer } = require('./services/game');
const paymentsRouter = require('./services/payments');
const adminRouter = require('./services/admin');

const app = express();
const server = http.createServer(app);

// --- Middleware Setup ---
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// In a production app, you would configure CORS properly
// For example: app.use(cors({ origin: 'https://your-frontend-domain.com' }));

// CSRF protection setup
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// --- API Routes ---
app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/admin', adminRouter);

// --- Serve Frontend ---
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // For any request that doesn't match an API route, send the React app's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// --- WebSocket Server ---
attachWebSocketServer(server);

// --- Server Startup ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
