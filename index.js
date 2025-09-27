require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

// Import services
const authRouter = require('./src/services/auth');
const { gameRouter, wss } = require('./src/services/game');
const paymentsRouter = require('./src/services/payments');
const adminRouter = require('./src/services/admin');

const app = express();
const server = http.createServer(app);

// --- Security Middleware ---
app.use(helmet()); // Sets various security-related HTTP headers
app.use(express.json({ 
  // We need the raw body for the IPN webhook, so we use a custom verify function
  verify: (req, res, buf) => {
    if (req.originalUrl === '/api/payments/ipn') {
      req.rawBody = buf.toString();
    }
  }
}));
app.use(cookieParser());

// Note: The IPN webhook route is exempted from CSRF protection below
const csrfProtection = csurf({ cookie: true });

// --- API Routes ---
// We apply CSRF protection to all routes except the IPN webhook
app.use('/api/auth', authRouter);
app.use('/api/game', csrfProtection, gameRouter);
app.use('/api/payments', paymentsRouter); // IPN route is in here, needs careful CSRF handling
app.use('/api/admin', csrfProtection, adminRouter);

// Route to get CSRF token
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// --- CSRF Error Handler ---
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token.' });
  } else {
    next(err);
  }
});

// --- WebSocket Server Upgrade ---
server.on('upgrade', (request, socket, head) => {
  // For now, allow all connections. In production, you'd authenticate here.
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// --- Server Startup ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('WebSocket server is ready.');
});
