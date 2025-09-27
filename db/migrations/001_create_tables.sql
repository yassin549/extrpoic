-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create deposits table
CREATE TABLE deposits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    chain VARCHAR(50),
    amount DECIMAL(18, 8),
    currency VARCHAR(10),
    invoice_id VARCHAR(255),
    txid VARCHAR(255),
    status VARCHAR(50),
    raw_ipn JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50),
    amount DECIMAL(18, 8),
    currency VARCHAR(10),
    balance_before DECIMAL(18, 8),
    balance_after DECIMAL(18, 8),
    external_id VARCHAR(255),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payout_requests table
CREATE TABLE payout_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    chain VARCHAR(50),
    amount DECIMAL(18, 8),
    to_address VARCHAR(255),
    fee DECIMAL(18, 8),
    status VARCHAR(50),
    admin_id INTEGER,
    admin_txid VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
