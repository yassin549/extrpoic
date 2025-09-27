const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class User {
  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT id, username, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = User;
