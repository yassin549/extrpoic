const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const authRouter = express.Router();

// --- Middleware to verify JWT ---
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Access Denied: No token provided');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

// --- Auth Routes ---

// [POST] /api/auth/register
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(409).send('Username already exists');
    }
    console.error('Registration error:', error);
    res.status(500).send('Error registering user');
  }
});

// [POST] /api/auth/login
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // Mitigates CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({ id: user.id, username: user.username, balance: user.balance_tnd });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
});

// [GET] /api/auth/me - Get current user profile
authRouter.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, balance_tnd FROM users WHERE id = $1', [req.user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
});

// [POST] /api/auth/logout
authRouter.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).send('Logged out');
});

module.exports = { authRouter, verifyToken };

