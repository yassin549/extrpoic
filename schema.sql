-- Aviator Casino Database Schema

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    balance_tnd NUMERIC(15, 2) DEFAULT 0.00 NOT NULL, -- Main balance in TND
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deposits Table (tracks payment invoices)
CREATE TABLE deposits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    nowpayments_invoice_id VARCHAR(255) UNIQUE,
    payment_status VARCHAR(50) DEFAULT 'waiting',
    pay_amount NUMERIC(20, 8),
    pay_currency VARCHAR(10),
    payout_amount NUMERIC(20, 8),
    payout_currency VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals Table
CREATE TABLE withdrawals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount_tnd NUMERIC(15, 2) NOT NULL,
    chain VARCHAR(50) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, settled, rejected
    admin_txid VARCHAR(255), -- The transaction ID from the admin's manual payout
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Game Rounds Table
CREATE TABLE game_rounds (
    id SERIAL PRIMARY KEY,
    server_seed VARCHAR(64) NOT NULL,
    server_seed_hash VARCHAR(64) NOT NULL,
    client_seed VARCHAR(255), -- Can be from the first player
    nonce INTEGER DEFAULT 1,
    crash_multiplier NUMERIC(10, 2),
    status VARCHAR(50) DEFAULT 'open', -- open, running, crashed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bets Table
CREATE TABLE bets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    round_id INTEGER REFERENCES game_rounds(id),
    amount_tnd NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'placed', -- placed, cashed_out, lost
    cashout_multiplier NUMERIC(10, 2),
    payout_tnd NUMERIC(15, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- IPN Logs for debugging
CREATE TABLE ipn_logs (
    id SERIAL PRIMARY KEY,
    invoice_id VARCHAR(255),
    raw_ipn JSONB,
    verification_result VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
